// Redux constants
import {ALBUMS_FILL, ALBUMS_FILL_MORE} from './albums.constants';
// Redux actions
import {setPartItems, setTotalLoadedItems} from "../../redux/actions/listSettings.actions";
// API
import {getAlbumsFromDB} from './albums.api';

export const AlbumsFillAsyncAction = (albums) => {
    return async (dispatch, getState) => {

        // interface getAlbumsReqVariables {
        //     info: string,
        //     search_text: string,
        //     skip: number,
        //     limit: number,
        //     sort: number
        // }

        const state = getState();

        const variables = {
            info: 'list',
            search_text: state.search.search_text,
            skip: state.list_settings.skip,
            limit: state.list_settings.limit,
            sort: state.list_settings.sort,
        };

        getAlbumsFromDB(variables)
            .then(data => {

                if (data) {
                    const items = data;
                    dispatch(setPartItems(items.length));

                    if (state.list_settings.load_more) {
                        dispatch({
                            type: ALBUMS_FILL_MORE,
                            payload: items
                        });
                        dispatch(setTotalLoadedItems(state.list_settings.total_loaded_items + items.length));
                    } else {
                        dispatch({
                            type: ALBUMS_FILL,
                            payload: items
                        });
                        dispatch(setTotalLoadedItems(items.length));
                    }
                }
            })
    };
};
