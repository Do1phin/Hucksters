import { types } from '../actions/actionTypes';

const initialState = {
    thing: null,
    step: null,
    status: null
};

const checkerReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CHECKER_SET_CHECK_THING:
            return {
                ...state,
                thing: action.payload
            };
        case types.CHECKER_SET_CHECK_STEP:
            return {
                ...state,
                step: action.payload
            };
        case types.CHECKER_SET_CHECK_STATUS:
            return {
                ...state,
                status: action.payload
            };
        default:
            return state
    }
};

export {
    checkerReducer
};
