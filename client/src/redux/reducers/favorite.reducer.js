import { types } from '../actions/actionTypes';

const initialState = {
    user_id: '',
    favorite_members: [],
    favorite_albums: [],
    favorite_photos: []
};

const favoriteReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FAVORITES_FILL:
            return {
                ...state,
                user_id: action.payload.user_id,
                favorite_members: [...action.payload.favorite_members],
                favorite_albums: [...action.payload.favorite_albums],
                favorite_photos: [...action.payload.favorite_photos],
            };
        case types.FILL_MEMBER:
            return {
                ...state,
                favorite_members: [...state, action.payload],
            };
        case types.FILL_ALBUM:
            return {
                ...state,
                favorite_albums: [...state, action.payload],
            };
        case types.FILL_PHOTO:
            return {
                ...state,
                favorite_photos: [...state, action.payload],
            };
        default:
            return state;
    }
};

export {
    favoriteReducer
};
