import {CheckerSetStatusStringAction} from "../../redux/actions/check.actions";
import {APIGetAllMembers} from './checkGroup.api';

export const GroupMembersGetAsyncAction = (group_id) => {
    return async (dispatch) => {
        dispatch(CheckerSetStatusStringAction('Получение пользователей из группы: '));

        await APIGetAllMembers(group_id)
            .then(response => {
                if (!response) return console.error('Get group Members failed');
                // dispatch({type: GROUP_MEMBERS_GET, payload: response});
            });
    };
};
