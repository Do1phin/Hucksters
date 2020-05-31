// Constants
import {FILL_MEMBERS, FILL_MEMBERS_MORE} from './members.constants';
// API
import {getMembersFromDB} from './members.api';
import {setPartItems, setTotalItems} from "../../redux/actions/listSettings.actions";

export const setMembersToStore = () => {
    return async (dispatch, getState) => {
        const state = getState();

        const variables = {
            info: 'list',
            search_text: state.search.search_text,
            skip: state.list_settings.skip,
            limit: state.list_settings.limit,
            status: state.list_settings.member_status,
            country: state.list_settings.member_country
        };

        getMembersFromDB(variables)
            .then(data => {

                if (data) {
                    const items = data;
                    dispatch(setPartItems(items.length));

                    if (state.list_settings.load_more) {
                        dispatch({
                            type: FILL_MEMBERS_MORE,
                            payload: items
                        });
                    } else {
                        dispatch({
                            type: FILL_MEMBERS,
                            payload: items
                        });
                        dispatch(setTotalItems(items.length));
                    }
                }
            });

    }
};
