import { Action } from '@ngrx/store';
import { Moment } from 'moment';
import { UserFile } from '@fm-models';

export enum FileActionTypes {
    UploadFile = '[File] Upload File',
    UploadFileSuccess = '[File] Upload File Success',
    UploadFileError = '[File] Upload File Error',

    DeleteFile = '[File] Delete File',
    DeleteFileSuccess = '[File] Delete File Success',
    DeleteFileError = '[File] Delete File Error'
}

export class UploadFile implements Action {
    readonly type = FileActionTypes.UploadFile;

    constructor(public payload: File) { }
}

export class UploadFileSuccess implements Action {
    readonly type = FileActionTypes.UploadFileSuccess;

    constructor(public payload: UserFile) { }
}

export class UploadFileError implements Action {
    readonly type = FileActionTypes.UploadFileError;

    constructor(public payload: any) { }
}

// Delete File Actions
export class DeleteFile implements Action {
    readonly type = FileActionTypes.DeleteFile;

    constructor(public payload: { fileName: string }) { }
}

export class DeleteFileSuccess implements Action {
    readonly type = FileActionTypes.DeleteFileSuccess;

    constructor(public payload: UserFile) { }
}

export class DeleteFileError implements Action {
    readonly type = FileActionTypes.DeleteFileError;

    constructor(public payload: any) { }
}

export type FileActionsUnion =
    UploadFile
    | UploadFileSuccess
    | UploadFileError
    | DeleteFile
    | DeleteFileSuccess
    | DeleteFileError;
