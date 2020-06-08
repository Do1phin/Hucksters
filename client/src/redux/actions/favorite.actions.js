import {types} from '../actions/actionTypes';
import {createFavoritePhotoInDB, readFavoritesFromDB} from "../../components/FavoriteBtn/favoriteBtn.api";

export const FavoritesGetAsyncAction = () => {
    return async (dispatch) => {

        readFavoritesFromDB()
            .then(response => {
                if (!response) return console.error('Get favorites failed');
                dispatch({type: types.FAVORITES_FILL, payload: response[0]});
            });
    }
};

export const FavoritesPhotoAddAsyncAction = () => {
    return async (dispatch) => {

        createFavoritePhotoInDB()
            .then(response => {
                if (!response) return console.error('Add favorite photo failed');
                dispatch({type: types.FAVORITES_PHOTOS_FILL, payload: response});
            });
    }
};

export const setFavoritePhoto = () => {

};
