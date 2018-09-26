import { ActionReducerMap, ActionReducer, MetaReducer, createSelector, createFeatureSelector } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { storeLogger } from 'ngrx-store-logger';
import { environment } from '../../../environments/environment';

import * as fromFileList from './file-list.reducer';

/**
 * App state
 */
export interface State {
    fileList: fromFileList.State;
}

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const reducers: ActionReducerMap<State> = {
    fileList: fromFileList.reducer
};

export function logger(reducer: ActionReducer<State>): any {
    return storeLogger({
        collapsed: true
    })(reducer);
}

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<State>[] = !environment.production
    ? [logger, storeFreeze]
    : [];


// feature selectors
export const selectFileListState = createFeatureSelector<fromFileList.State>('fileList');