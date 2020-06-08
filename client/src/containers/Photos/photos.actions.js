// Redux constants
import {
    PHOTOS_START_FETCHING,
    PHOTOS_STOP_FETCHING,
    PHOTOS_FILL,
    PHOTOS_FILL_MORE,
    PHOTOS_SET_FETCHING_ERROR
} from '../Photos/photos.constants';
// Redux actions
import {
    ListSettingsSetFetchedPartItemsAction,
    ListSettingsSetItemsToSkipAction, ListSettingsSetTotalItemsAction,
    ListSettingsSetTotalLoadedItemsAction
} from '../../redux/actions/listSettings.actions';
// API
import { APIReadPhotosFromDB } from './photos.api';

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

        dispatch({ type: PHOTOS_START_FETCHING });
        await APIReadPhotosFromDB(variables)
            .then(data => {

                dispatch({ type: PHOTOS_STOP_FETCHING });

                if (data) {
                    const items = data.photos;
                    dispatch(ListSettingsSetFetchedPartItemsAction(items.length));
                    dispatch(ListSettingsSetTotalItemsAction(data.totalPhotos));

                    if (state.list_settings.load_more) {
                        dispatch({
                            type: PHOTOS_FILL_MORE,
                            payload: items
                        });
                        dispatch(ListSettingsSetTotalLoadedItemsAction(
                            state.list_settings.total_loaded_items + items.length
                        ));
                    } else {
                        dispatch(ListSettingsSetItemsToSkipAction(0));
                        dispatch({
                            type: PHOTOS_FILL,
                            payload: items
                        });
                        dispatch(ListSettingsSetTotalLoadedItemsAction(items.length));
                    }
                } else {
                    dispatch({
                        type: PHOTOS_SET_FETCHING_ERROR,
                        error: true,
                        payload: 'ERROR'
                    })
                }
            });
    };
};
