import {
    MEMBERS_FILL,
    MEMBERS_FILL_MORE,
    MEMBERS_START_FETCHING,
    MEMBERS_STOP_FETCHING,
    MEMBERS_SET_FETCHING_ERROR
} from './members.constants';

const initialState = {
    members: [],
    member_number: null,
    members_fetching: null,
    members_fetching_error: null
};

const memberReducer = (state = initialState, action) => {
    switch (action.type) {
        case MEMBERS_START_FETCHING:
            return {
                ...state,
                members_fetching: true
            };
        case MEMBERS_STOP_FETCHING:
            return {
                ...state,
                members_fetching: false
            };
        case MEMBERS_FILL:
            return {
                ...state,
                members: action.payload
            };
        case MEMBERS_FILL_MORE:
            return {
                ...state,
                members: [...state.members, ...action.payload]
            };
        case MEMBERS_SET_FETCHING_ERROR:
            return {
                ...state,
                error: true,
                members_fetching_error: action.payload
            };
        default:
            return state
    }
};

export {
    memberReducer
};
