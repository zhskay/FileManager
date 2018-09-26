import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { PageEvent, Sort } from '@angular/material';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserFile, FileListQuery, FileType } from '@fm-models';
import * as fromStore from '../../store';

const DEFAULT_PAGE_SIZE_OPTIONS = [5, 10, 20];

@Component({
    selector: 'fm-file-list',
    templateUrl: 'file-list.component.html',
    styleUrls: ['./file-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileListComponent implements OnInit {

    public FileType = FileType;
    public displayedColumns: string[] = ['position', 'name', 'createdDate', 'lastModifiedDate', 'view', 'delete'];
    public pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS;

    public filesQuery$: Observable<FileListQuery>;
    public files$: Observable<UserFile[]>;
    public total$: Observable<number>;
    public loading$: Observable<boolean>;

    constructor(
        private store: Store<fromStore.State>
    ) {
        this.filesQuery$ = this.store.select(fromStore.getFileListQuery);
        this.files$ = this.store.select(fromStore.getFileListPage);
        this.total$ = this.store.select(fromStore.getTotalFiles);
        this.loading$ = this.store.select(fromStore.getFileListLoading);
    }

    ngOnInit() {
        this.store.dispatch(new fromStore.LoadFileList());
    }

    uploadFile(file: File) {
        this.store.dispatch(new fromStore.UploadFile(file));
    }

    openFile(fileName: string, fileType: FileType) {
        if (fileType === FileType.Image) {
            this.store.dispatch(new fromStore.OpenImagePreview({ fileName }));
        }

        if (fileType === FileType.Document) {
            this.store.dispatch(new fromStore.OpenDocumentPreview({ fileName }));
        }
    }

    deleteFile(fileName: string) {
        this.store.dispatch(new fromStore.DeleteFile({ fileName }));
    }

    pageChanged(page: PageEvent) {
        const action = new fromStore.FileListFilterChanged({
            pageIndex: page.pageIndex,
            pageSize: page.pageSize
        });

        this.store.dispatch(action);
    }

    sortChanged(sort: Sort) {
        const action = new fromStore.FileListFilterChanged({
            activeSort: sort.active,
            direction: sort.direction
        });

        this.store.dispatch(action);
    }
}