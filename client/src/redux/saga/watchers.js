// Core
import { takeEvery, all, call } from 'redux-saga/effects';

// Types
import { types } from '../actions/actionTypes';

// Workers
// import { deleteGroup } from '../saga/workers';
// import { deleteGroup } from '../actions/group.actions';
import { deleteGroup } from '../saga/workers';

function* watchDeleteGroup() {
    yield takeEvery(types.GROUP_DELETE, deleteGroup);
}

export function* watchGroups() {
    yield all([call(watchDeleteGroup)]);
}
