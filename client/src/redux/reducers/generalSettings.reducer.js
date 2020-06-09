// Redux constants
import { types } from '../actions/actionTypes';

const initialState = {
    loading: false,
    fetching: false
};

const generalSettingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOADING_START:
            return {
                ...state,
                loading: true
            };
        case types.LOADING_STOP:
            return {
                ...state,
                loading: false
            };
        case types.FETCHING_START:
            return {
                ...state,
                fetching: true
            };
        case types.FETCHING_STOP:
            return {
                ...state,
                fetching: false
            };
        default:
            return state;
    }
};

export {
    generalSettingsReducer
};
