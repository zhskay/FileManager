import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { takeWhile } from 'rxjs/operators';

import { fade } from '../../animations';

@Component({
    selector: 'fm-document-preview-dialog',
    templateUrl: 'document-preview-dialog.component.html',
    styleUrls: ['./document-preview-dialog.component.scss'],
    animations: [fade]
})
export class DocumentPreviewDialogComponent implements OnInit, OnDestroy {

    public loading = false;
    public textContent: string;
    public error: string;

    private componentAlive = true;

    constructor(
        private httpClient: HttpClient,
        @Inject(MAT_DIALOG_DATA)
        public data: {url: string, name: string}
    ) { }

    ngOnInit() {
        this.loading = true;

        this.httpClient.get(this.data.url, {responseType: 'text'}).pipe(
            takeWhile(() => this.componentAlive)
        ).subscribe(text => {
            this.loading = false;
            this.textContent = text;
        }, err => this.handleError(err));
    }

    ngOnDestroy(): void {
        this.componentAlive = false;
    }

    handleError(error) {
        this.loading = false;
        this.error = 'Произошла ошибка во время получения файла';

        throw error;
        // console.log(error);
    }
}