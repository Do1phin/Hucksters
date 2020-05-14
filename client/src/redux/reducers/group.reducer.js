import {GROUP_ADD, GROUP_LIST} from "../actions/actionTypes";

const initialState = {
    group_id: '',
    groups: []
};

function groupReducer(state = initialState, action) {
    switch (action.type) {
        case GROUP_ADD:
            return {
                ...state,
                group_id: action.payload
            };
        case GROUP_LIST:
            return {
                ...state,
                groups: [...state.groups, ...action.payload]
            };
        default:
            return state
    }
}

export default groupReducer;
