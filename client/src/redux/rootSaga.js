import {watchGroups} from './saga/watchers';
import {all, call} from 'redux-saga/effects';

export function* rootSaga() {
    yield console.log('rootSaga');
    yield all([call(watchGroups)]);
}
