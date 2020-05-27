import { types } from '../actions/actionTypes';

const initialState = {
    thing: '',
    step: 0,
    status: ''
};

const checkReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CHECK_THING:
            return {
                ...state,
                thing: action.payload
            };
        case types.CHECK_STEP:
            return {
                ...state,
                step: action.payload
            };
        case types.CHECK_STATUS:
            return {
                ...state,
                status: action.payload
            };
        default:
            return state
    }
};

export default checkReducer;
