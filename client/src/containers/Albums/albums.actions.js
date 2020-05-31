// Constants
import {FILL_ALBUMS, FILL_ALBUMS_MORE} from './albums.constants';
// API
import {getAlbumsFromDB} from './albums.api';
// Redux-actions
import {setPartItems, setTotalItems} from "../../redux/actions/listSettings.actions";


export const setAlbumsToStore = (albums) => {
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
                            type: FILL_ALBUMS_MORE,
                            payload: items
                        });
                        dispatch(setTotalItems(state.list_settings.total_items + items.length));
                    } else {
                        dispatch({
                            type: FILL_ALBUMS,
                            payload: items
                        });
                        dispatch(setTotalItems(items.length));
                    }
                }
            })
    };
};
