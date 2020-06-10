// Redux constants
import { GROUP_UPDATE_INFO, GROUP_ADD, GROUPS_FILL, GROUP_DELETE } from './groups.constants';
// Redux actions
import {CheckerSetStatusStringAction} from '../../redux/actions/check.actions';
// Redux-saga effects
import {put} from 'redux-saga/effects';
// API
import {
    APICreateGroupInDB,
    APIDeleteGroupFromDB,
    APIGetAllMembers,
    APIReadGroupListFromDB,
    APIUpdateGroupInfoInDB
} from './groups.api';
// VK API
import {getGroupInfoFromVk, getGroupSizeFromVk} from '../../components/admin/_api-vk';

// синхронно
export function GroupAddAction(group_id) {
    return {
        type: GROUP_ADD,
        payload: group_id
    };
}

// асинхронно через redux-thunk (используя dispatch)
export const GroupAddAsyncAction = (group_id) => {
    return (dispatch, getState) => {

        Promise.resolve(group_id)
            .then(() => {
                let pos = group_id.indexOf('://');
                if (pos !== -1) {
                    return group_id.substr(pos + 10);
                }
                return group_id;
            }).then(getGroupInfoFromVk)
            .then(getGroupSizeFromVk)
            .then(response => {


            })
            .then(APICreateGroupInDB)
            .then(response => {
                if (!response) return console.error('Group not added');
                dispatch({type: GROUP_ADD, payload: response});
            });
    };
};

export function GroupsFillAction() {
    return {
        type: GROUPS_FILL
    };
}

export const GroupsFillAsyncAction = () => {
    return (dispatch, getState) => {
        // const state = getState();
        APIReadGroupListFromDB()
            .then(response => {
                if (!response) return console.error('GroupsContainer not loaded');
                dispatch({type: GROUPS_FILL, payload: response});
            });
    };
};

export const GroupDeleteAction = (group_id) => {
    return {
        type: GROUP_DELETE,
        payload: group_id
    };
};

export function* GroupDeleteAsyncSagaAction(group_id) {
    yield APIDeleteGroupFromDB(group_id);
    yield put({type: GROUP_DELETE, payload: group_id});
}

export const GroupDeleteAsyncAction = (group_id) => {
    return (dispatch, getState) => {
        APIDeleteGroupFromDB(group_id);
        dispatch({type: GROUP_DELETE, payload: group_id});
    };
};

export const GroupInfoUpdateAsyncAction = (group_id) => {
    return (dispatch, getState) => {
        Promise.resolve(group_id)
            .then(getGroupInfoFromVk)
            .then(getGroupSizeFromVk)
            .then(APIUpdateGroupInfoInDB)
            .then(APIReadGroupListFromDB)
            .then(response => {
                if (!response) return console.error('Update group info failed');
                dispatch({type: GROUP_UPDATE_INFO, payload: response});
            });
    };
};
