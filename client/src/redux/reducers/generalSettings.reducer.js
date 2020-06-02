// Redux constants
import { types } from '../actions/actionTypes';

const initialState = {
    loading: false,
    fetching: false
};

const generalSettingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case types.FETCHING:
            return {
                ...state,
                fetching: action.payload
            };
        default:
            return state;
    }
};

export default generalSettingsReducer;
