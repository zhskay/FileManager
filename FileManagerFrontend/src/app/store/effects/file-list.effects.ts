import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { MatDialog, MatDialogRef } from '@angular/material';

import { UserFile } from '@fm-models';
import { FileService } from '@fm-services';
import { FilePreviewOverlayService } from '../../components/file-preview-overlay/file-preview-overlay.service';
import { FilePreviewOverlayRef } from '../../components/file-preview-overlay/file-preview-overlay-ref';
import { DocumentPreviewDialogComponent } from '../../components/document-preview-dialog/document-preview-dialog.component';

import * as FileActions from '../actions/file.actions';
import * as FileListActions from '../actions/file-list.actions';
import { FileActionTypes, FileListActionTypes } from '../actions';

import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';

const MAX_FILE_SIZE = 50;

@Injectable()
export class FileListEffects {

    // Load files
    @Effect()
    loadFiles$: Observable<Action> = this.actions$.pipe(
        ofType<FileListActions.LoadFileList>(FileListActionTypes.LoadFileList),
        switchMap(action => {
            return this.fileService.getFiles().pipe(
                map(files => new FileListActions.LoadFileListSuccess(files)),
                catchError(err => of(new FileListActions.LoadFileListError(err)))
            );
        })
    );

    // Upload files
    @Effect()
    uploadFile$: Observable<Action> = this.actions$.pipe(
        ofType<FileActions.UploadFile>(FileActionTypes.UploadFile),
        switchMap(action => {
            if (action.payload.size > MAX_FILE_SIZE * 1024 * 1024) {
                const error = `Превышен максимальный размер файла ${MAX_FILE_SIZE}Mb`;
                return of(new FileActions.UploadFileError(error));
            }

            return this.fileService.uploadFiles(action.payload).pipe(
                map(files => new FileActions.UploadFileSuccess(files[0])),
                catchError(err => of(new FileActions.UploadFileError(err)))
            );
        })
    );

    // Delete file
    @Effect()
    deleteFile$: Observable<Action> = this.actions$.pipe(
        ofType<FileActions.DeleteFile>(FileActionTypes.DeleteFile),
        switchMap(action => {
            return this.fileService.deleteFile(action.payload.fileName).pipe(
                map(deleted => new FileActions.DeleteFileSuccess(deleted)),
                catchError(err => of(new FileActions.DeleteFileError(err)))
            );
        })
    );

    // Open image preview
    @Effect({dispatch: false})
    openImagePreview$: Observable<Action> = this.actions$.pipe(
        ofType<FileListActions.OpenImagePreview>(FileListActionTypes.OpenImagePreview),
        map(action => {
            const path = this.fileService.getFilePath(action.payload.fileName);
            const image = { url: path, name: action.payload.fileName };

            this.imagePreviewOverlayRef = this.imagePreviewOverlayService.open({ image });

            return action;
        })
    );

    // Open document preview
    @Effect({dispatch: false})
    openDocumentPreview$: Observable<Action> = this.actions$.pipe(
        ofType<FileListActions.OpenDocumentPreview>(FileListActionTypes.OpenDocumentPreview),
        map(action => {
            const path = this.fileService.getFilePath(action.payload.fileName);
            const file = { url: path, name: action.payload.fileName };

            this.documentPreviewDialogRef = this.dialog.open(DocumentPreviewDialogComponent, {data: file});

            return action;
        })
    );

    imagePreviewOverlayRef: FilePreviewOverlayRef;
    documentPreviewDialogRef: MatDialogRef<DocumentPreviewDialogComponent, {url: string, name: string}>;

    constructor(
        private actions$: Actions,
        private fileService: FileService,
        private dialog: MatDialog,
        private imagePreviewOverlayService: FilePreviewOverlayService
    ) { }
}
