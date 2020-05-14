import {GROUP_ADD, GROUP_LIST} from './actionTypes';

import {getGroupListFromDB} from "../../components/group/_api-group";

// синхронно
export function groupAdd(group_id) {
    return {
        type: GROUP_ADD,
        payload: group_id
    }
}

// асинхронно через redux-thunk (используя dispatch)
export function asyncGroupAdd() {
    return function (dispatch) {
        setTimeout(() => {
            dispatch(groupAdd())
        }, 3000)
    }
}

export function groupsList() {
    return {
        type: GROUP_LIST
    }
}

export const asyncGroupsList = () => {
    return (dispatch, getState) => {
        // const state = getState();

        getGroupListFromDB()
            .then(response => {
                if (!response) return console.error('Groups not loaded');
                dispatch({ type: GROUP_LIST, payload: response})
            });
    }
};
