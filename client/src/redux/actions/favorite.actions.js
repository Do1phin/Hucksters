import {types} from '../actions/actionTypes';
import {createFavoritePhotoInDB, readFavoritesFromDB} from "../../components/FavoriteBtn/favoriteBtn.api";

export const getFavoritesAsync = () => {
    return async (dispatch) => {

        readFavoritesFromDB()
            .then(response => {
                if (!response) return console.error('Get favorites failed');
                dispatch({type: types.FILL_FAVORITES, payload: response[0]});
            });
    }
};

export const addFavoritePhoto = () => {
    return async (dispatch) => {

        createFavoritePhotoInDB()
            .then(response => {
                if (!response) return console.error('Add favorite photo failed');
                dispatch({type: types.FILL_FAVORITE_PHOTOS, payload: response});
            });
    }
};

export const setFavoritePhoto = () => {

};
