import { OverlayRef } from '@angular/cdk/overlay';
import { FilePreviewOverlayComponent } from './file-preview-overlay.component';
import { Subject, Observable } from 'rxjs';
import { filter, take, map } from 'rxjs/operators';

export class FilePreviewOverlayRef {

    componentInstance: FilePreviewOverlayComponent;

    private _beforeClose = new Subject<void>();
    private _afterClosed = new Subject<void>();

    constructor(private overlayRef: OverlayRef) { }

    close(): void {
        // Listen for animation 'start' events
        this.componentInstance.animationStateChanged.pipe(
            filter(event => event.phaseName === 'start'),
            take(1)
        ).subscribe(() => {
            this._beforeClose.next();
            this._beforeClose.complete();
            this.overlayRef.detachBackdrop();
        });

        // Listen for animation 'done' events
        this.componentInstance.animationStateChanged.pipe(
            filter(event => event.phaseName === 'done' && event.toState === 'leave'),
            take(1)
        ).subscribe(() => {
            this.overlayRef.dispose();
            this._afterClosed.next();
            this._afterClosed.complete();

            this.componentInstance = null;
        });

        // Start exit animation
        this.componentInstance.startExitAnimation();
    }

    afterClosed(): Observable<void> {
        return this._afterClosed.asObservable();
    }

    beforeClose(): Observable<void> {
        return this._beforeClose.asObservable();
    }
}
