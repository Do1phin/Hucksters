// Redux constants
import {
    ALBUMS_FILL,
    ALBUMS_FILL_MORE,
    ALBUMS_START_FETCHING,
    ALBUMS_STOP_FETCHING,
    ALBUMS_SET_FETCHING_ERROR
} from './albums.constants';
// Redux actions
import {
    ListSettingsSetFetchedPartItemsAction,
    ListSettingsSetItemsToSkipAction, ListSettingsSetTotalItemsAction,
    ListSettingsSetTotalLoadedItemsAction
} from "../../redux/actions/listSettings.actions";
// API
import {APIReadAlbumsFromDB} from './albums.api';

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
            flagTotalAlbums: true
        };

        dispatch({ type: ALBUMS_START_FETCHING });
        APIReadAlbumsFromDB(variables)
            .then(data => {

                dispatch({ type: ALBUMS_STOP_FETCHING });

                if (data) {
                    const items = data.albums;
                    dispatch(ListSettingsSetFetchedPartItemsAction(items.length));
                    dispatch(ListSettingsSetTotalItemsAction(data.totalAlbums));

                    if (state.list_settings.load_more) {
                        dispatch({
                            type: ALBUMS_FILL_MORE,
                            payload: items
                        });
                        dispatch(ListSettingsSetTotalLoadedItemsAction(
                            state.list_settings.total_loaded_items + items.length
                        ));
                    } else {
                        dispatch(ListSettingsSetItemsToSkipAction(0));
                        dispatch({
                            type: ALBUMS_FILL,
                            payload: items
                        });
                        dispatch(ListSettingsSetTotalLoadedItemsAction(items.length));
                    }
                } else {
                    dispatch({
                        type: ALBUMS_SET_FETCHING_ERROR,
                        error: true,
                        payload: 'ERROR'
                    })
                }
            })
    };
};
