import {
    GROUP_ADD,
    GROUP_DELETE,
    GROUP_LIST,
    GROUP_MEMBERS_GET,
    GROUP_UPDATE_INFO
} from './actionTypes';

import {
    createGroupInDB,
    delGroupFromDB,
    getGroupListFromDB,
    updateGroupInfoInDB,
    getAllMembers
} from "../../components/group/_api-group";
import {getGroupInfoFromVk, getGroupSizeFromVk} from "../../components/admin/_api-vk";
import {setCheckStatusString} from "./check.actions";

// синхронно
export function addGroup(group_id) {
    return {
        type: GROUP_ADD,
        payload: group_id
    }
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
                return group_id
            }).then(getGroupInfoFromVk)
            .then(getGroupSizeFromVk)
            .then(response => {


            })
            .then(createGroupInDB)
            .then(response => {
                if (!response) return console.error('Group not added');
                dispatch({type: GROUP_ADD, payload: response})
            })
    }
};

export function listGroups() {
    return {
        type: GROUP_LIST
    }
}

export const asyncListGroups = () => {
    return (dispatch, getState) => {
        // const state = getState();
        getGroupListFromDB()
            .then(response => {
                if (!response) return console.error('Groups not loaded');
                dispatch({type: GROUP_LIST, payload: response})
            });
    }
};

export const asyncDeleteGroup = (group_id) => {
    return (dispatch, getState) => {
        delGroupFromDB(group_id);
        dispatch({type: GROUP_DELETE, payload: group_id})
    }
};

export const asyncUpdateGroupInfo = (group_id) => {
    return (dispatch, getState) => {
        Promise.resolve(group_id)
            .then(getGroupInfoFromVk)
            .then(getGroupSizeFromVk)
            .then(updateGroupInfoInDB)
            .then(getGroupListFromDB)
            .then(response => {
                if (!response) return console.error('Update group info failed');
                dispatch({type: GROUP_UPDATE_INFO, payload: response})
            })
    }
};

export const asyncGetGroupMembers = (group_id) => {
    return (dispatch) => {
        dispatch(setCheckStatusString('Получение пользователей из группы: '));

        getAllMembers(group_id)
            .then(response => {
                if (!response) return console.error('Get group Members failed');
                dispatch({type: GROUP_MEMBERS_GET, payload: response})
            })
    }
};
