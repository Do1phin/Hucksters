// Получаем список групп из базы
const getGroupListFromDB = (params) => {
    try {
        return fetch('/vk/group/list', {
            method: "GET"
        }).then((response) => {
            return response.json()
        }).catch((err) => console.error(err));
    } catch (e) {
        throw new Error(e);
    }
};

// Создаём группу в базе
const createGroupInDB = (params) => {
    const {id, name, size, photo_50} = params;
    const body = {
        groupId: +id,
        name,
        size,
        photo: photo_50
    };

    try {
        return fetch('/vk/group/add', {
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
        return fetch('/vk/group/update', {
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
const delGroupFromDB = (groupId) => {
    try {
        fetch('/vk/group/remove', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({groupId: groupId})
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
