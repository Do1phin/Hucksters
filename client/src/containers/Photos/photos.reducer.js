import { FILL_PHOTOS, FETCH_PHOTOS_ASYNC, FILL_PHOTOS_MORE } from './photos.constants';

const initialState = {
    photos: [],
    photos_number: 0,
};

const photoReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PHOTOS_ASYNC:
            return {
                ...state,
                photos: action.payload
            };
        case FILL_PHOTOS:
            return {
                ...state,
                photos: action.payload
            };
        case FILL_PHOTOS_MORE:
            return {
                ...state,
                photos: [...state.photos, ...action.payload]
            };
        default:
            return state
    }
};

export default photoReducer;
