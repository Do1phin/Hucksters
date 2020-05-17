import {
    CHECK_THING,
    CHECK_STEP,
    CHECK_STATUS
} from '../actions/actionTypes';

const initialState = {
    thing: '',
    step: 0,
    status: ''
};

const checkReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHECK_THING:
            return {
                ...state,
                thing: action.payload
            };
        case CHECK_STEP:
            return {
                ...state,
                step: action.payload
            };
        case CHECK_STATUS:
            return {
                ...state,
                status: action.payload
            };
        default:
            return state
    }
};

export default checkReducer;
