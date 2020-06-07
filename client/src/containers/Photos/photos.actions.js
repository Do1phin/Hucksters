// Redux constants
import {PHOTOS_START_FETCHING, PHOTOS_STOP_FETCHING, PHOTOS_FILL, PHOTOS_FILL_MORE} from '../Photos/photos.constants';
// Redux actions
import {setPartItems, setTotalLoadedItems} from '../../redux/actions/listSettings.actions';
// API
import {getPhotosFromDB} from './photos.api';

export const PhotosStartFetchingAction = () => {
    return {
        type: PHOTOS_START_FETCHING
    };
};

export const PhotosStopFetchingAction = () => {
    return {
        type: PHOTOS_STOP_FETCHING
    };
};

export const PhotosFillAsyncAction = (photos) => {
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
                            type: PHOTOS_FILL_MORE,
                            payload: items
                        });
                        dispatch(setTotalLoadedItems(state.list_settings.total_loaded_items + items.length));
                    } else {
                        dispatch({
                            type: PHOTOS_FILL,
                            payload: items
                        });
                        dispatch(setTotalLoadedItems(items.length));

                    }
                }
            });
    };
};
