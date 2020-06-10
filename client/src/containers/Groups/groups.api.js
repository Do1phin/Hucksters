import { call, getMembersGroupFromVk, getMembersInfoFromVk } from "../../components/admin/_api-vk";
import { APICreateMembersToDB, APIUpdateMembersInDB } from "../Members/members.api";
import { CheckerSetStepNumberAction } from "../../redux/actions/check.actions";
import { store } from "../../redux/store";

// Создаём группу в базе
const APICreateGroupInDB = (groupObj) => {
    const {id, name, size, photo_200} = groupObj;
    const body = {
        group_id: +id,
        name,
        size,
        photo: photo_200
    };

    try {
        return fetch('/vk/groups/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then((response) => {
            return response.json();
        }).catch((err) => console.error(err));
    } catch (e) {
        throw new Error(e);
    }
};

// Получаем список групп из базы
const APIReadGroupListFromDB = (params) => {
    try {
        return fetch('/vk/groups', {
            method: 'POST'
        }).then((response) => {
            return response.json();
        }).catch((err) => console.error(err));
    } catch (e) {
        throw new Error(e);
    }
};

// Обновляем информацию о базе
const APIUpdateGroupInfoInDB = (groupObject) => new Promise((resolve, reject) => {
    try {
        return fetch('/vk/groups/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(groupObject)
        }).then((response) => {
            resolve(response.json());
        }).catch((err) => reject(err));
    } catch (e) {
        reject(e);
    }
});

// Удаляем группу из базы
const APIDeleteGroupFromDB = (group_id) => {

    try {
        fetch('/vk/groups/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({group_id})
        }).then((response) => {
            return response.json();
        }).catch((err) => console.log(err));
    } catch (e) {
        throw new Error(e);
    }
};

export {
    APICreateGroupInDB,
    APIReadGroupListFromDB,
    APIUpdateGroupInfoInDB,
    APIDeleteGroupFromDB,
};
