import {
    PHOTOS_FILL,
    PHOTOS_FILL_MORE,
    PHOTOS_START_FETCHING,
    PHOTOS_STOP_FETCHING,
    PHOTOS_SET_FETCHING_ERROR
} from './photos.constants';

const initialState = {
    photos: [],
    photo_number: null,
    photos_fetching: null,
    photos_fetching_error: null
};

const photoReducer = (state = initialState, action) => {
    switch (action.type) {
        case PHOTOS_START_FETCHING:
            return {
                ...state,
                photos_fetching: true
            };
        case PHOTOS_STOP_FETCHING:
            return {
                ...state,
                photos_fetching: false
            };
        case PHOTOS_FILL:
            return {
                ...state,
                photos: action.payload
            };
        case PHOTOS_FILL_MORE:
            return {
                ...state,
                photos: [...state.photos, ...action.payload]
            };
        case PHOTOS_SET_FETCHING_ERROR:
            return {
                ...state,
                error: true,
                photos_fetching_error: action.payload
            };
        default:
            return state
    }
};

export {
    photoReducer
};
