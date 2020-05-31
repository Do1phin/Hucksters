// Core
import {all, call} from 'redux-saga/effects';
// Watchers
import {watchGroups} from './saga/watchers';

export function* rootSaga() {
    yield console.log('rootSaga');
    yield all([call(watchGroups)]);
}
