// Core
import { put, apply } from 'redux-saga/effects';

// Instruments
import { api } from '../../../components/group/_api-group';
import { createGroup as createGroupAC } from '../../actions/actionTypes';

export function* deleteGroup(action) {
    yield console.log('delete good ', action);
}
