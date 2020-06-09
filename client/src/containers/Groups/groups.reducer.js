import {
    GROUP_ADD,
    GROUP_UPDATE_INFO,
    GROUP_DELETE,
    GROUPS_FILL,
    GROUPS_START_FETCHING,
    GROUPS_STOP_FETCHING,
    GROUPS_SET_FETCHING_ERROR
} from './groups.constants';

const initialState = {
    groups: [],
    group_id: '',
    groups_fetching: null,
    groups_fetching_error: null
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
        case GROUPS_START_FETCHING:
            return {
                ...state,
                groups_fetching: true
            };
        case GROUPS_STOP_FETCHING:
            return {
                ...state,
                groups_fetching: false
            };
        case GROUPS_FILL:
            return {
                ...state,
                groups: [...action.payload]
            };
        case GROUPS_SET_FETCHING_ERROR:
            return {
                ...state,
                error: true,
                groups_fetching_error: action.payload
            };
        // case GROUP_MEMBERS_GET:
        //     return {
        //         ...state,
        //         status: action
        //     };
        default:
            return state
    }
};

export {
    groupReducer
};
