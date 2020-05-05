// Получаем продавцов из базы
const getMembersFromDB = (params) => new Promise((resolve, reject) =>{

    console.log('getMembersFromDB ', params);
    const {first_name, skip, limit, status, user_id} = params;

    let body = {
        first_name,
        skip,
        limit,
        status,
        user_id
    };

    try {
        return fetch('/sellers', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then((response) => {
            resolve(response.json())
        }).catch((err) => reject(err));
    } catch (e) {
        reject(e)
    }
});

// Получаем количество продавцов в базе
const getMembersSizesFromDB = (params) => new Promise((resolve, reject) => {
    try {
        return fetch('//')
            .then((response) => {
                console.log("response ", response)
                resolve(response)
            }).catch((err) => {
                console.error('err ', err)
                reject(err)
            })

    } catch (e) {
        reject(e)
    }
    console.log('getMembersSizesFromDB', params)
    resolve({all_sellers: 10000, banned: 100, deleted: 50, closed: 20, seller: 300})
});

// Добавляем продавцов в базу
const createMembersToDB = (membersArray) => new Promise((resolve, reject) => {
    const body = {source: membersArray};
    console.log('createMembersToDB ', membersArray);
    try {
        fetch('./sellers/create', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        }).then((response) => {
            resolve(membersArray);
        }).catch((err) => reject(err))

    } catch (e) {
        reject(e);
    }
});

// Обновляем информацию в аккаунте (только общая инфа)
const updateMembersInDB = (membersWithInfoArray) => new Promise((resolve, reject) => {
    console.log('updateMembersInDB ', membersWithInfoArray);

    membersWithInfoArray.map((item) => {
        try {
            fetch('./sellers/update', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(item)
            }).then((response) => {
                resolve(response.json())
            }).catch((err) => reject(err));
        } catch (e) {
            reject(e)
        }
        return null
    });
});

export {
    getMembersFromDB,
    getMembersSizesFromDB,
    createMembersToDB,
    updateMembersInDB
}
