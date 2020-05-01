// Получаем список групп из базы
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

export {
    getGroupListFromDB,
    createGroupInDB,
    updateGroupInfoInDB,
    delGroupFromDB
};
