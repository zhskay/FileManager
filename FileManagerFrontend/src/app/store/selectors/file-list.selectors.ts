import { createSelector, createFeatureSelector } from '@ngrx/store';

import { UserFile, FileListQuery } from '@fm-models';

import * as fromFileList from '../reducers/file-list.reducer';
import * as fromRoot from '../reducers';

/**
 * Adapters created with @ngrx/entity generate
 * commonly used selector functions including
 * getting all ids in the record set, a dictionary
 * of the records by id, an array of records and
 * the total number of records. This reduces boilerplate
 * in selecting records from the entity state.
 */
export const {
    selectIds: getFileIds,
    selectEntities: getFileEntities,
    selectAll: getAllFiles,
    selectTotal: getTotalFiles,
} = fromFileList.adapter.getSelectors(fromRoot.selectFileListState);

export const getFileListQuery = createSelector(
    fromRoot.selectFileListState,
    fromFileList.getQuery
);

export const getFileListLoading = createSelector(
    fromRoot.selectFileListState,
    fromFileList.getLoading
);

export const getFileListError = createSelector(
    fromRoot.selectFileListState,
    fromFileList.getError
);

export const getFileListPage = createSelector(
    getFileListQuery,
    getAllFiles,
    (query: FileListQuery, files: UserFile[]) => {
        let collection = Array.from(files);

        if (query.activeSort && query.direction) {
            collection = collection.sort((a, b) => {
                const first = a[query.activeSort];
                const second = b[query.activeSort];

                if (typeof first === 'string') {
                    return first.localeCompare(second);
                }

                if (typeof first === 'number') {
                    return first - second;
                }

                if (typeof first.getMonth === 'function') {
                    return first - second;
                }
            });
            collection = query.direction === 'desc' ? collection.reverse() : collection;
        }

        collection = collection.map((x, i) => new UserFile({
            ...x,
            position: i + 1
        }));

        const from = query.pageIndex * query.pageSize;

        return collection.slice(from, from + query.pageSize);
    }
);