import { Action } from '@ngrx/store';
import { Moment } from 'moment';
import { UserFile, FileListQuery } from '@fm-models';

export enum FileListActionTypes {
    LoadFileList = '[File] Load File List',
    LoadFileListSuccess = '[File] Load File List Success',
    LoadFileListError = '[File] Load File List Error',

    FileListFilterChanged = '[FileList] File List Filter Changed',

    OpenImagePreview = '[FileList] Open Image Preview',
    CloseImagePreview = '[FileList] Close Image Preview',

    OpenDocumentPreview = '[FileList] Open Document Preview',
    CloseDocumentPreview = '[FileList] Close Document Preview'
}

// Load Files
export class LoadFileList implements Action {
    readonly type = FileListActionTypes.LoadFileList;
}

export class LoadFileListSuccess implements Action {
    readonly type = FileListActionTypes.LoadFileListSuccess;

    constructor(public payload: UserFile[]) { }
}

export class LoadFileListError implements Action {
    readonly type = FileListActionTypes.LoadFileListError;

    constructor(public payload: any) { }
}

// Filter changed
export class FileListFilterChanged implements Action {
    readonly type = FileListActionTypes.FileListFilterChanged;

    constructor(public payload: Partial<FileListQuery>) { }
}


// Image Preview
export class OpenImagePreview implements Action {
    readonly type = FileListActionTypes.OpenImagePreview;

    constructor(public payload: { fileName: string }) { }
}

export class CloseImagePreview implements Action {
    readonly type = FileListActionTypes.CloseImagePreview;
}

// Document Preview
export class OpenDocumentPreview implements Action {
    readonly type = FileListActionTypes.OpenDocumentPreview;

    constructor(public payload: { fileName: string }) { }
}

export class CloseDocumentPreview implements Action {
    readonly type = FileListActionTypes.CloseDocumentPreview;
}

export type FileListActionsUnion =
    LoadFileList
    | LoadFileListSuccess
    | LoadFileListError
    | FileListFilterChanged

    | OpenImagePreview
    | CloseImagePreview

    | OpenDocumentPreview
    | CloseDocumentPreview;
