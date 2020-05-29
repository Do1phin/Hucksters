import {types} from './actionTypes';
import {put} from 'redux-saga/effects';
import {
    createGroupInDB,
    delGroupFromDB,
    getAllMembers,
    getGroupListFromDB,
    updateGroupInfoInDB
} from '../../components/group/_api-group';
import {getGroupInfoFromVk, getGroupSizeFromVk} from '../../components/admin/_api-vk';
import {setCheckStatusString} from './check.actions';

// синхронно
export function addGroup(group_id) {
    return {
        type: types.GROUP_ADD,
        payload: group_id
    };
}

// асинхронно через redux-thunk (используя dispatch)
export const asyncAddGroup = (group_id) => {
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
            .then(createGroupInDB)
            .then(response => {
                if (!response) return console.error('Group not added');
                dispatch({type: types.GROUP_ADD, payload: response});
            });
    };
};

export function listGroups() {
    return {
        type: types.GROUP_LIST
    };
}

export const asyncListGroups = () => {
    return (dispatch, getState) => {
        // const state = getState();
        getGroupListFromDB()
            .then(response => {
                if (!response) return console.error('Groups not loaded');
                dispatch({type: types.GROUP_LIST, payload: response});
            });
    };
};

export const del = (group_id) => {
    return {
        type: types.GROUP_DELETE,
        payload: group_id
    };
};

export function* deleteGroup(group_id) {
    yield delGroupFromDB(group_id);
    yield put({type: types.GROUP_DELETE, payload: group_id});
}

// export const asyncDeleteGroup = (group_id) => {
//     return (dispatch, getState) => {
//         delGroupFromDB(group_id);
//         call(console.log, 'удаление группы');
//         dispatch({type: types.GROUP_DELETE, payload: group_id});
//     };
// };

export const asyncUpdateGroupInfo = (group_id) => {
    return (dispatch, getState) => {
        Promise.resolve(group_id)
            .then(getGroupInfoFromVk)
            .then(getGroupSizeFromVk)
            .then(updateGroupInfoInDB)
            .then(getGroupListFromDB)
            .then(response => {
                if (!response) return console.error('Update group info failed');
                dispatch({type: types.GROUP_UPDATE_INFO, payload: response});
            });
    };
};

export const asyncGetGroupMembers = (group_id) => {
    return (dispatch) => {
        dispatch(setCheckStatusString('Получение пользователей из группы: '));

        getAllMembers(group_id)
            .then(response => {
                if (!response) return console.error('Get group Members failed');
                dispatch({type: types.GROUP_MEMBERS_GET, payload: response});
            });
    };
};
