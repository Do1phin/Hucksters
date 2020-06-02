// Core
import { put, apply } from 'redux-saga/effects';

// Instruments
import { api } from '../../../containers/Groups/groups.api';
import { createGroup as createGroupAC } from '../../actions/actionTypes';

export function* deleteGroup(action) {
    yield console.log('delete good ', action);
}
