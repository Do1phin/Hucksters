// Redux constants
import {ADD_PHOTO_TO_FAVORITE, REMOVE_PHOTO_TO_FAVORITE} from './favoriteBtn.constants';
// Redux actions
import {types} from "../../redux/actions/actionTypes";
// API
import {createFavoritePhotoInDB, deleteFavoriteFromDB, updateFavoritesFromDB} from './favoriteBtn.api';
import {APIUpdateFavoritePhotosCount} from '../../containers/Photos/photos.api';

export const changeFavoritePhoto = (body) => {
    console.log('changeFavoritePhoto 1 ');
    return async (dispatch, getState) => {

        console.log('changeFavoritePhoto 2 ');

        if (!body.favorite) {
            console.log('1');

            await createFavoritePhotoInDB(body)
                .then(response => {
                    if (!response) return console.error('Add favorite photo failed');
                    dispatch({type: types.FAVORITES_PHOTOS_FILL, payload: response});
                });

            await updateFavoritesFromDB(body);
            await APIUpdateFavoritePhotosCount({...body, operation: 'inc'});

            dispatch({
                type: ADD_PHOTO_TO_FAVORITE,
                payload: body
            })

            // setFavorited(!favorited);
            // setFavoriteCount(1 + favoriteCount);

        } else {
            console.log('2');
            await deleteFavoriteFromDB(body)
                .then(response => {
                    if (!response) return console.error('Remove favorite photo failed');
                    dispatch({type: types.FAVORITES_PHOTOS_FILL, payload: response});
                });
            // await deleteFavoriteFromDB(body);
            await APIUpdateFavoritePhotosCount({...body, operation: 'dec'});

            dispatch({
                type: REMOVE_PHOTO_TO_FAVORITE,
                payload: body
            })

            // setFavorited(!favorited);
            // setFavoriteCount(favoriteCount - 1);
        }
    }
};

export const changeFavoritePhoto2 = (body) => {
    return async (dispatch, getState) => {
        try {
            console.log(111111111)
        } catch (e) {
            console.error(e)
        }
    }
};
