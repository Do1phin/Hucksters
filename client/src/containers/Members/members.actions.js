// Redux constants
import {MEMBERS_FILL, MEMBERS_FILL_MORE} from './members.constants';
// Redux actions
import {setPartItems, setTotalLoadedItems} from "../../redux/actions/listSettings.actions";
// API
import {getManyMembersForIdsFromDB, getMembersFromDB} from './members.api';

export const MembersFillAsyncAction = () => {
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
                            type: MEMBERS_FILL_MORE,
                            payload: items
                        });
                    } else {
                        dispatch({
                            type: MEMBERS_FILL,
                            payload: items
                        });
                        dispatch(setTotalLoadedItems(items.length));
                    }
                }
            });
    }
};

export const SomeMembersFillAsyncAction = () => {
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
                        type: MEMBERS_FILL,
                        payload: items
                    });
                }
            })
    }
};
