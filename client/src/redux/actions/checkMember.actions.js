import { types } from './actionTypes'
import {APIReadMembersFromDB, APIUpdateMembersInDB} from "../../containers/Members/members.api";
import {CheckerSetStepNumberAction} from "./check.actions";
import {getAlbumsFromVk} from "../../components/admin/_api-vk";
import {checkAlbumsNames} from "../../components/admin/_api-check";
import {APICreateAlbumsToDB} from "../../containers/Albums/albums.api";
import {readCountersFromDB} from "../../components/Counters/counters.api";

export const CheckMembersAllAction = (members) => {
    return {
        type: types.CHECK_MEMBERS_ALL,
        payload: members
    }
};

export const CheckMembersWithInfoAction = (members) => {
    return {
        type: types.CHECK_MEMBERS_WITH_INFO,
        payload: members
    }
};

export const CheckMembersClosedAction = (members) => {
    return {
        type: types.CHECK_MEMBERS_CLOSED,
        payload: members
    }
};

export const CheckMembersSellerAction = (members) => {
    return {
        type: types.CHECK_MEMBERS_SELLER,
        payload: members
    }
};

export const CheckMembersBannedAction = (members) => {
    return {
        type: types.CHECK_MEMBERS_BANNED,
        payload: members
    }
};

export const CheckMembersDeletedAction = (members) => {
    return {
        type: types.CHECK_MEMBERS_DELETED,
        payload: members
    }
};

export const MemberAlbumsGetAsyncAction = (owner_id) => {
    return async (dispatch, getState) => {
        let state = getState();
        try {
            let source;
            await Promise.resolve([])
                .then(async response => { // Получение счётчиков из базы
                    const counters = await readCountersFromDB();
                    dispatch(CheckMembersAllAction(counters.all_members));
                    dispatch(CheckMembersWithInfoAction(counters.with_info));
                    dispatch(CheckMembersClosedAction(counters.closed));
                    dispatch(CheckMembersSellerAction(counters.seller));
                    dispatch(CheckMembersBannedAction(counters.banned));
                    dispatch(CheckMembersDeletedAction(counters.deleted));
                    return []
                }).then(APIReadMembersFromDB) // Получение пользователей из базы
                .then((response) => {
                    console.log('re ', response)
                    source = response; // массив продавцов
                    return source
                });

            async function action(i) {
                dispatch(CheckerSetStepNumberAction(i));

                let obj = {
                    owner_id: source[i].owner_id,
                    info: 'check_one'
                };

                await Promise.resolve(obj)
                    .then(getAlbumsFromVk) // Получение альбомов из ВК
                    .then(checkAlbumsNames) // Проверка полученных альбомов на ключи
                    .then(APICreateAlbumsToDB) // Добавление альбомов в базу
                    .then(() => {
                        let membersArray = [];
                        membersArray.push(obj);
                        return membersArray // массив где id и тело пользователя // Изменение информации о пользователе
                    }).then(APIUpdateMembersInDB)
                    .catch((err) => console.error(`* id ${source[i].owner_id}. `, err));
            }

            for (let i = 1; i < state.check_members.all_members; i++) {
                setTimeout(action, i * 1000, i);
            }
        } catch (e) {
            console.error(e)
        }
    }
};
