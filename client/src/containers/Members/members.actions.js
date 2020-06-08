// Redux constants
import {
    MEMBERS_FILL,
    MEMBERS_FILL_MORE,
    MEMBERS_START_FETCHING,
    MEMBERS_STOP_FETCHING,
    MEMBERS_SET_FETCHING_ERROR
} from './members.constants';
// Redux actions
import {
    ListSettingsSetFetchedPartItemsAction,
    ListSettingsSetItemsToSkipAction, ListSettingsSetTotalItemsAction,
    ListSettingsSetTotalLoadedItemsAction
} from "../../redux/actions/listSettings.actions";
// API
import { APIReadManyMembersForIdsFromDB, APIReadMembersFromDB } from './members.api';

export const MembersFillAsyncAction = () => {
    return async (dispatch, getState) => {
        const state = getState();

        const variables = {
            info: 'list',
            search_text: state.search.search_text,
            skip: state.list_settings.skip,
            limit: state.list_settings.limit,
            status: state.list_settings.member_status,
            country: state.list_settings.member_country,
            flagTotalMembers: true,
        };

        dispatch({ type: MEMBERS_START_FETCHING });
        APIReadMembersFromDB(variables)
            .then(data => {

                dispatch({ type: MEMBERS_STOP_FETCHING });

                if (data) {
                    const items = data.members;
                    dispatch(ListSettingsSetFetchedPartItemsAction(items.length));
                    dispatch(ListSettingsSetTotalItemsAction(data.totalMembers));

                    if (state.list_settings.load_more) {
                        dispatch({
                            type: MEMBERS_FILL_MORE,
                            payload: items
                        });
                        dispatch(ListSettingsSetTotalLoadedItemsAction(
                            state.list_settings.total_loaded_items + items.length
                        ));
                    } else {
                        dispatch(ListSettingsSetItemsToSkipAction(0));
                        dispatch({
                            type: MEMBERS_FILL,
                            payload: items
                        });
                        dispatch(ListSettingsSetTotalLoadedItemsAction(items.length));
                    }
                } else {
                    dispatch({
                        type: MEMBERS_SET_FETCHING_ERROR,
                        payload: 'ERROR'
                    })
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

        dispatch({ type: MEMBERS_START_FETCHING });
        await APIReadManyMembersForIdsFromDB(member_ids)
            .then(data => {

                dispatch({ type: MEMBERS_STOP_FETCHING });

                if (data.length) {
                    const items = data;
                    dispatch({
                        type: MEMBERS_FILL,
                        payload: items
                    });
                } else {
                    dispatch({
                        type: MEMBERS_SET_FETCHING_ERROR,
                        error: true,
                        payload: 'ERROR'
                    })
                }
            })
    }
};
