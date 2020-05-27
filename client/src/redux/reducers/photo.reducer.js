import {types} from '../actions/actionTypes';

const initialState = {
    photos: [],
    photos_number: 0,
};

const photoReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_PHOTOS_ASYNC:
            return {
                ...state,
                photos: action.payload
            };
        case types.FILL_PHOTOS:
            return {
                ...state,
                photos_number: action.payload
            };
        default:
            return state
    }
};

export default photoReducer;
