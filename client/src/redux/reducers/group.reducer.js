import {
    GROUP_ADD,
    GROUP_LIST,
    GROUP_UPDATE_INFO,
    GROUP_DELETE,
    GROUP_MEMBERS_GET
} from "../actions/actionTypes";

const initialState = {
    group_id: '',
    groups: [],
};

const groupReducer = (state = initialState, action) => {
    switch (action.type) {
        case GROUP_ADD:
            return {
                ...state,
                groups: [...state.groups, action.payload]
            };
        case GROUP_DELETE:
            return {
                ...state,
                groups: [...state.groups]
                    .filter(item => item.group_id !== action.payload)
            };
        case GROUP_UPDATE_INFO:
            return {
                ...state,
                groups: [...action.payload]
                    // .filter(item => item.group_id !== action.payload.group_id)
                    // .push(action.payload)
            };
        case GROUP_LIST:
            return {
                ...state,
                groups: [...state.groups, ...action.payload]
            };
        case GROUP_MEMBERS_GET:
            return {
                ...state,
                status: action
            };
        default:
            return state
    }
};

export default groupReducer;
