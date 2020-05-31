import {FILL_ALBUMS, FETCH_ALBUMS_ASYNC, FILL_ALBUMS_MORE} from './albums.constants';

const initialState = {
    albums: [],
    albums_id: null
};

const albumReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALBUMS_ASYNC:
            return {
                ...state,
                albums: action.payload
            };
        case FILL_ALBUMS:
            return {
                ...state,
                albums: action.payload
            };
        case FILL_ALBUMS_MORE:
            return {
                ...state,
                albums: [...state.albums, ...action.payload]
            };
        default:
            return state
    }
};

export default albumReducer;
