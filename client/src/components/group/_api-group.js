// Получаем список групп из базы
import {call, getMembersGroupFromVk, getMembersInfoFromVk} from "../admin/_api-vk";
import {createMembersToDB, updateMembersInDB} from "../../containers/Members/members.api";
import {setCheckStepNumber} from "../../redux/actions/check.actions";
import store from "../../redux/store";

const getGroupListFromDB = (params) => {
    try {
        return fetch('/vk/groups', {
            method: "POST"
        }).then((response) => {
            return response.json()
        }).catch((err) => console.error(err));
    } catch (e) {
        throw new Error(e);
    }
};

// Создаём группу в базе
const createGroupInDB = (groupObj) => {
    const {id, name, size, photo_200} = groupObj;
    const body = {
        group_id: +id,
        name,
        size,
        photo: photo_200
    };

    try {
        return fetch('/vk/groups/create', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then((response) => {
            return response.json()
        }).catch((err) => console.error(err))
    } catch (e) {
        throw new Error(e);
    }
};

// Обновляем информацию о базе
const updateGroupInfoInDB = (groupObject) => new Promise((resolve, reject) => {
    try {
        return fetch('/vk/groups/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(groupObject)
        }).then((response) => {
            resolve(response.json())
        }).catch((err) => reject(err))
    } catch (e) {
        reject(e)
    }
});

// Удаляем группу из базы
const delGroupFromDB = (group_id) => {
    try {
        fetch('/vk/groups/delete', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({group_id})
        }).then((response) => {
            return response.json()
        }).catch((err) => console.log(err))
    } catch (e) {
        throw new Error(e)
    }
};

const getAllMembers = async (group_id) => {

    try {
        const members = await call('groups.getMembers', {group_id: group_id, v: 5.9});
        const membersSize = await members.response.count;
        let count = 0;

        await (function f() {
            console.info(`Step ${count} from ${Math.ceil(membersSize / 1000)}`);
            if (count < Math.ceil(membersSize / 1000)) {
                store.dispatch(setCheckStepNumber(count));
                const obj = {group_id: group_id, count};

                Promise.resolve(obj)
                    .then(getMembersGroupFromVk)
                    .then((response) => {
                        return response // массив пользователей группы
                    }).then(createMembersToDB)
                    .then((response) => {
                        console.log('response ', response.length)
                        return response // массив пользователей группы
                    }).then(getMembersInfoFromVk)
                    .then((response) => {
                        response.map((item) => {
                            item['info'] = 'full'
                        });
                        return response // массив пользователей группы с информацией
                    }).then(updateMembersInDB)
                    .catch((err) => console.error(err));

                count++;
                setTimeout(f, 100000);
            } else {
                console.log('All members added');
            }
        }());

    } catch (e) {
        throw new Error(e)
    }
};

export {
    getGroupListFromDB,
    createGroupInDB,
    updateGroupInfoInDB,
    delGroupFromDB,
    getAllMembers
};
