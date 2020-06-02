// Redux constants
import {FETCH_PHOTOS_ASYNC, FILL_PHOTOS, FILL_PHOTOS_MORE} from '../Photos/photos.constants';
// Redux actions
import {setPartItems, setTotalLoadedItems} from '../../redux/actions/listSettings.actions';
// API
import {getPhotosFromDB} from './photos.api';

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
            sort: state.list_settings.sort,
            flagTotalPhotos: true
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
                        dispatch(setTotalLoadedItems(state.list_settings.total_loaded_items + items.length));
                    } else {
                        dispatch({
                            type: FILL_PHOTOS,
                            payload: items
                        });
                        dispatch(setTotalLoadedItems(items.length));

                    }
                }
            });
    };
};
