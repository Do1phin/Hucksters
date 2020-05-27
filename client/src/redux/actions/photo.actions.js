import { types } from './actionTypes';

export const getPhotos = () => {
    return {
        type: types.FETCH_PHOTOS_ASYNC
    };
};

export const setPhotosToStore = (photos) => {
    return {
        type: types.FILL_PHOTOS,
        payload: photos
    };
};
