import { SortDirection } from '@angular/material';

export class FileListQuery {

    /** The zero-based page index of the displayed list of items */
    pageIndex: number;

    /* Number of items to display on a page */
    pageSize: number;

    activeSort: string;

    direction: SortDirection;

    constructor(init?: Partial<FileListQuery>) {
        Object.assign(this, init);
    }
}