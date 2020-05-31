import { types } from './actionTypes'
import {getMembersFromDB, updateMembersInDB} from "../../containers/Members/members.api";
import {setCheckStepNumber} from "./check.actions";
import {getAlbumsFromVk} from "../../components/admin/_api-vk";
import {checkAlbumsNames} from "../../components/admin/_api-check";
import {createAlbumsToDB} from "../../containers/Albums/albums.api";
import {readCountersFromDB} from "../../components/admin/_api-counters";

export const setCheckMemberAllValue = (members) => {
    return {
        type: types.CHECK_MEMBERS_ALL,
        payload: members
    }
};

export const setCheckMembersWithInfoValue = (members) => {
    return {
        type: types.CHECK_MEMBERS_WITH_INFO,
        payload: members
    }
};

export const setCheckMembersClosedValue = (members) => {
    return {
        type: types.CHECK_MEMBERS_CLOSED,
        payload: members
    }
};

export const setCheckMembersSellerValue = (members) => {
    return {
        type: types.CHECK_MEMBERS_SELLER,
        payload: members
    }
};

export const setCheckMembersBannedValue = (members) => {
    return {
        type: types.CHECK_MEMBERS_BANNED,
        payload: members
    }
};

export const setCheckMembersDeletedValue = (members) => {
    return {
        type: types.CHECK_MEMBERS_DELETED,
        payload: members
    }
};

export const asyncGetMemberAlbums = (owner_id) => {
    return async (dispatch, getState) => {
        let state = getState();
        try {
            let source;
            await Promise.resolve([])
                .then(async response => { // Получение счётчиков из базы
                    const counters = await readCountersFromDB();
                    dispatch(setCheckMemberAllValue(counters.all_members));
                    dispatch(setCheckMembersWithInfoValue(counters.with_info));
                    dispatch(setCheckMembersClosedValue(counters.closed));
                    dispatch(setCheckMembersSellerValue(counters.seller));
                    dispatch(setCheckMembersBannedValue(counters.banned));
                    dispatch(setCheckMembersDeletedValue(counters.deleted));
                    return []
                }).then(getMembersFromDB) // Получение пользователей из базы
                .then((response) => {
                    console.log('re ', response)
                    source = response; // массив продавцов
                    return source
                });

            async function action(i) {
                dispatch(setCheckStepNumber(i));

                let obj = {
                    owner_id: source[i].owner_id,
                    info: 'check_one'
                };

                await Promise.resolve(obj)
                    .then(getAlbumsFromVk) // Получение альбомов из ВК
                    .then(checkAlbumsNames) // Проверка полученных альбомов на ключи
                    .then(createAlbumsToDB) // Добавление альбомов в базу
                    .then(() => {
                        let membersArray = [];
                        membersArray.push(obj);
                        return membersArray // массив где id и тело пользователя // Изменение информации о пользователе
                    }).then(updateMembersInDB)
                    .catch((err) => console.error(`* id ${source[i].owner_id}. `, err));
            }

            for (let i = 1; i < state.checker_members.all_members; i++) {
                setTimeout(action, i * 1000, i);
            }
        } catch (e) {
            console.error(e)
        }
    }
};
