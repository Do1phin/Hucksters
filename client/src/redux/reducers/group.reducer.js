import { types } from '../actions/actionTypes';

const initialState = {
    groups: [],
    group_id: '',
};

const groupReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GROUP_ADD:
            return {
                ...state,
                groups: [...state.groups, action.payload]
            };
        case types.GROUP_DELETE:
            return {
                ...state,
                groups: [...state.groups]
                    .filter(item => item.group_id !== action.payload)
            };
        case types.GROUP_UPDATE_INFO:
            return {
                ...state,
                groups: [...action.payload]
                    // .filter(item => item.group_id !== action.payload.group_id)
                    // .push(action.payload)
            };
        case types.GROUP_LIST:
            return {
                ...state,
                groups: [...state.groups, ...action.payload]
            };
        case types.GROUP_MEMBERS_GET:
            return {
                ...state,
                status: action
            };
        default:
            return state
    }
};

export default groupReducer;
