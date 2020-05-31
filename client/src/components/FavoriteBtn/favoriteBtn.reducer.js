import {
    ADD_MEMBER_TO_FAVORITE,
    ADD_ALBUM_TO_FAVORITE,
    ADD_PHOTO_TO_FAVORITE,
    REMOVE_MEMBER_TO_FAVORITE,
    REMOVE_ALBUM_TO_FAVORITE,
    REMOVE_PHOTO_TO_FAVORITE,
    // FILL_FAVORITES
} from './favoriteBtn.constants';

const initialState = {
    user_id: '',
    favorite_members: [],
    favorite_albums: [],
    favorite_photos: []
};

const favoriteReducer = (state = initialState, action) => {
    console.log('favoriteReducer')
    switch (action.type) {
        // case FILL_FAVORITES:
        //     return {
        //         ...state,
        //         user_id: action.payload.user_id,
        //         favorite_members: [...action.payload.favorite_members],
        //         favorite_albums: [...action.payload.favorite_albums],
        //         favorite_photos: [...action.payload.favorite_photos],
        //     };
        case ADD_MEMBER_TO_FAVORITE:
            return {
                ...state,
                favorite_members: [...state, action.payload],
            };
        case ADD_ALBUM_TO_FAVORITE:
            return {
                ...state,
                favorite_albums: [...state, action.payload],
            };
        case ADD_PHOTO_TO_FAVORITE:
            return {
                ...state,
                favorite_photos: [...state, action.payload],
            };
        default:
            return state;
    }
};

export default favoriteReducer;
