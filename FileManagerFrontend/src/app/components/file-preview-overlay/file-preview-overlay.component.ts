import { Component, OnInit, EventEmitter } from '@angular/core';
import { Inject, HostListener } from '@angular/core';
import { AnimationEvent } from '@angular/animations';

import { FilePreviewOverlayRef } from './file-preview-overlay-ref';
import { FILE_PREVIEW_DIALOG_DATA } from './file-preview-overlay.tokens';
import { fade, slideContent } from '../../animations';

const ESCAPE = 27;

@Component({
    selector: 'fm-file-preview-overlay',
    templateUrl: 'file-preview-overlay.component.html',
    styleUrls: ['./file-preview-overlay.component.scss'],
    animations: [fade, slideContent]
})

export class FilePreviewOverlayComponent implements OnInit {

    loading = false;
    animationState: 'void' | 'enter' | 'leave' = 'enter';
    animationStateChanged = new EventEmitter<AnimationEvent>();

    @HostListener('document:keydown', ['$event'])
    private handleKeydown(event: KeyboardEvent) {
        if (event.keyCode === ESCAPE) {
            this.dialogRef.close();
        }
    }

    constructor(
        public dialogRef: FilePreviewOverlayRef,
        @Inject(FILE_PREVIEW_DIALOG_DATA) public image: any
    ) { }

    ngOnInit() { }

    onLoad(event: Event) {
        this.loading = false;
    }

    onAnimationStart(event: AnimationEvent) {
        this.animationStateChanged.emit(event);
    }

    onAnimationDone(event: AnimationEvent) {
        this.animationStateChanged.emit(event);
    }

    startExitAnimation() {
        this.animationState = 'leave';
    }
}