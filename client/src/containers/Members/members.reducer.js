import { FILL_MEMBERS, FETCH_MEMBERS_ASYNC, FILL_MEMBERS_MORE } from './members.constants';

const initialState = {
    members: [],
    members_number: 0,
};

const memberReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MEMBERS_ASYNC:
            return {
                ...state,
                members: action.payload
            };
        case FILL_MEMBERS:
            return {
                ...state,
                members: action.payload
            };
        case FILL_MEMBERS_MORE:
            return {
                ...state,
                members: [...state.members, ...action.payload]
            };
        default:
            return state
    }
};

export default memberReducer;
