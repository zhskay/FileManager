import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { MatSnackBar } from '@angular/material';

import { UserFile } from '@fm-models';
import { FileService } from '@fm-services';

import * as FileActions from '../actions/file.actions';
import { FileActionTypes, FileListActionTypes } from '../actions';

import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';

@Injectable()
export class FileListNotificationEffects {

    // File uploaded successfully
    @Effect({dispatch: false})
    fileUploaded$: Observable<Action> = this.actions$.pipe(
        ofType<FileActions.UploadFileSuccess>(FileActionTypes.UploadFileSuccess),
        tap(action => this.snackBar.open('Файл загружен', 'OK'))
    );

    // File upload error
    @Effect({dispatch: false})
    fileUploadError$: Observable<Action> = this.actions$.pipe(
        ofType<FileActions.UploadFileError>(FileActionTypes.UploadFileError),
        map(action => {
            if (typeof action.payload === 'string') {
                this.snackBar.open(action.payload);
            } else {
                this.snackBar.open('Произошла ошибка во время загрузки файла');
            }

            return action;
        })
    );

    // File deleted successfully
    @Effect({dispatch: false})
    fileDeleted$: Observable<Action> = this.actions$.pipe(
        ofType<FileActions.DeleteFileSuccess>(FileActionTypes.DeleteFileSuccess),
        tap(action => this.snackBar.open('Файл удален', 'OK'))
    );

    // File upload error
    @Effect({dispatch: false})
    fileDeleteError$: Observable<Action> = this.actions$.pipe(
        ofType<FileActions.DeleteFileError>(FileActionTypes.DeleteFileError),
        tap(action => this.snackBar.open('Произошла ошибка во время удаления файла'))
    );

    constructor(
        private actions$: Actions,
        private snackBar: MatSnackBar
    ) { }
}
