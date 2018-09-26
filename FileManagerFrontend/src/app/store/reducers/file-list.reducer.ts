import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { FileActionTypes, FileActionsUnion, UploadFileSuccess } from '../actions/file.actions';
import { FileListActionTypes, FileListActionsUnion } from '../actions/file-list.actions';
import { UserFile, FileListQuery } from '@fm-models';

export interface State extends EntityState<UserFile> {
    query: FileListQuery;
    loading: boolean;
    error: any;
}

export const adapter: EntityAdapter<UserFile> = createEntityAdapter<UserFile>({
    selectId: (model: UserFile) => model.name,
    sortComparer: false
});

export const initialState: State = adapter.getInitialState({
    query: new FileListQuery({pageIndex: 0, pageSize: 10}),
    loading: false,
    error: undefined
});

export function reducer(state = initialState, action: FileActionsUnion | FileListActionsUnion): State {
    switch (action.type) {

        case FileListActionTypes.LoadFileList: {
            return {
                ...state,
                loading: true
            };
        }

        case FileListActionTypes.LoadFileListSuccess: {
            return adapter.addAll(action.payload, {
                ...state,
                loading: false
            });
        }

        case FileListActionTypes.LoadFileListError: {
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        }

        case FileListActionTypes.FileListFilterChanged: {
            return {
                ...state,
                query: {
                    ...state.query,
                    ...action.payload
                }
            };
        }

        case FileActionTypes.UploadFileSuccess: {
            return adapter.addOne(action.payload, state);
        }

        case FileActionTypes.DeleteFileSuccess: {
            return adapter.removeOne(action.payload.name, state);
        }

        default: {
            return state;
        }
    }
}

export const getQuery = (state: State) => state.query;
export const getError = (state: State) => state.error;
export const getLoading = (state: State) => state.loading;