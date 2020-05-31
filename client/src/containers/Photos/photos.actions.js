// Constants
import {FETCH_PHOTOS_ASYNC, FILL_PHOTOS, FILL_PHOTOS_MORE} from '../Photos/photos.constants';
// API
import {getPhotosFromDB} from './photos.api';
// Actions
import {setPartItems, setTotalItems} from '../../redux/actions/listSettings.actions';

export const getPhotos = () => {
    return {
        type: FETCH_PHOTOS_ASYNC
    };
};

export const setPhotosToStore = (photos) => {
    return async (dispatch, getState) => {
        const state = getState();

        let variables = {
            text: state.search.search_text,
            skip: state.list_settings.skip,
            limit: state.list_settings.limit,
            sort: state.list_settings.sort
        };

        await getPhotosFromDB(variables)
            .then(data => {

                if (data) {
                    const items = data.photos;
                    dispatch(setPartItems(items.length));

                    if (state.list_settings.load_more) {
                        dispatch({
                            type: FILL_PHOTOS_MORE,
                            payload: items
                        });
                        dispatch(setTotalItems(state.list_settings.total_items + items.length));
                    } else {
                        dispatch({
                            type: FILL_PHOTOS,
                            payload: items
                        });
                        dispatch(setTotalItems(items.length));
                    }
                }
            });
    };
};
