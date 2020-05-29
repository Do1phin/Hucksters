import {FETCH_PHOTOS_ASYNC, FILL_PHOTOS, FILL_PHOTOS_MORE} from '../Photos/photos.constants';
import {getPhotosFromDB} from './photos.api';
import {setPartItems, setTotalItems} from '../../redux/actions/list.actions';

export const getPhotos = () => {
    return {
        type: FETCH_PHOTOS_ASYNC
    };
};

export const setPhotosToStore = (photos) => {
    return async (dispatch, getState) => {
        const state = getState();

        let variables = {
            text: state.list.search_text,
            skip: state.list.skip,
            limit: state.list.limit,
            sort: state.list.sort
        };

        await getPhotosFromDB(variables)
            .then(data => {

                if (data) {
                    const items = data.photos;
                    dispatch(setPartItems(items.length));


                    if (state.list.loadMore) {
                        // setPhotos([...photos, ...items]);
                        dispatch({
                            type: FILL_PHOTOS_MORE,
                            payload: items
                        });
                        dispatch(setTotalItems(getState().list.total_items + items.length));
                    } else {
                        // setPhotos(items);
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
