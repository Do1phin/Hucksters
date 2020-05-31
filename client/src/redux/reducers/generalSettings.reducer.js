// Constants
import { types } from '../actions/actionTypes';

const initialState = {
    loading: true,
    fetching: true
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
