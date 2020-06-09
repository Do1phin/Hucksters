import {
    ALBUMS_FILL,
    ALBUMS_FILL_MORE,
    ALBUMS_START_FETCHING,
    ALBUMS_STOP_FETCHING,
    ALBUMS_SET_FETCHING_ERROR,
} from './albums.constants';

const initialState = {
    albums: [],
    album_id: null,
    albums_fetching: null,
    albums_fetching_error: null
};

const albumReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALBUMS_START_FETCHING:
            return {
                ...state,
                albums_fetching: true
            };
        case ALBUMS_STOP_FETCHING:
            return {
                ...state,
                albums_fetching: false
            };
        case ALBUMS_FILL:
            return {
                ...state,
                albums: action.payload
            };
        case ALBUMS_FILL_MORE:
            return {
                ...state,
                albums: [...state.albums, ...action.payload]
            };
        case ALBUMS_SET_FETCHING_ERROR:
            return {
                ...state,
                error: true,
                albums_fetching_error: action.payload
            };
        default:
            return state
    }
};

export {
    albumReducer
};
