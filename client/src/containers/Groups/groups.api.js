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

// Получаем список групп из базы
const APIReadGroupListFromDB = (params) => {
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
            resolve(response.json())
        }).catch((err) => reject(err))
    } catch (e) {
        reject(e)
    }
});

// Удаляем группу из базы
const APIDeleteGroupFromDB = (group_id) => {

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

const APIGetAllMembers = async (group_id) => {

    try {
        const members = await call('groups.getMembers', {group_id: group_id, v: 5.107});
        const membersSize = await members.response.count;
        let count = 0;

        await (function next() {
            console.info(`Step ${count} from ${Math.ceil(membersSize / 1000)}`);
            if (count < Math.ceil(membersSize / 1000)) {
                store.dispatch(CheckerSetStepNumberAction(count));
                const obj = {group_id: group_id, count};

                // const pretendent_members = Promise.resolve(getMembersGroupFromVk(obj));
                // console.log('pretendent_members ', pretendent_members);
                // const created_members = Promise.resolve(APICreateMembersToDB(pretendent_members));
                // console.log('created_members ', created_members);
                // const members_with_info = Promise.resolve(getMembersInfoFromVk(created_members));
                // console.log('members_with_info ', members_with_info);

                Promise.resolve(obj)
                    .then(getMembersGroupFromVk)
                    .then((response) => {
                        console.log('getMembersGroupFromVk 1 ', response)
                        return response // массив пользователей группы
                    }).then(APICreateMembersToDB)
                    .then((response) => {
                        console.log('APIGetAllMembers 2 ', response)
                        return response // массив пользователей группы
                    }).then(getMembersInfoFromVk)
                    .then((response) => {
                        response.map((item) => {
                            return item['info'] = 'full'
                        });
                        console.log('getMembersInfoFromVk 3 ', response)
                        return response // массив пользователей группы с информацией
                    }).then(APIUpdateMembersInDB)
                    .catch((err) => console.error(err));

                count++;
                setTimeout(next, 100000);
            } else {
                console.log('All members added');
            }
        }());

    } catch (e) {
        throw new Error(e)
    }
};

export {
    APICreateGroupInDB,
    APIReadGroupListFromDB,
    APIUpdateGroupInfoInDB,
    APIDeleteGroupFromDB,
    APIGetAllMembers
};
