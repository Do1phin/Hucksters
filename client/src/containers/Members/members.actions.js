// Redux constants
import {FILL_MEMBERS, FILL_MEMBERS_MORE} from './members.constants';
// Redux actions
import {setPartItems, setTotalLoadedItems} from "../../redux/actions/listSettings.actions";
// API
import {getManyMembersForIdsFromDB, getMembersFromDB} from './members.api';

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
                        dispatch(setTotalLoadedItems(items.length));
                    }
                }
            });
    }
};

export const setManyMembersToStore = () => {
    return async (dispatch, getState) => {
        const state = getState();

        const member_ids = await state.photos.photos.map(item => {
            return item.owner_id
        });
        // const member_ids = [937266, 769646, 241306];
        await getManyMembersForIdsFromDB(member_ids)
            .then(data => {
                if (data.length) {
                    const items = data;
                    dispatch({
                        type: FILL_MEMBERS,
                        payload: items
                    });
                }
            })
    }
};
