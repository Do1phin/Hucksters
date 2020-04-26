const list = (params) => {
    const {firstName, skip, limit} = params;
    const body = {
        firstName,
        skip,
        limit
    };

    try {
        return fetch('/sellers/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then((response) => {
            return response.json()
        }).catch((err) => console.error(err));
    } catch (e) {
        throw new Error(e)
    }
};

// добавить аккаунты в базу данных * надо смотреть что здесь принимает
const createMembersToDB = (membersArray) => new Promise((resolve, reject) => {
    const body = {source: membersArray};
    console.info('2. Create members in DB [start]');
    try {
        fetch('./sellers/add', {
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
    console.info('2. Create members in DB [finish]');
});

// обновить в базе информацию аккаунта (только общая инфа)
const updateMembersInDB = (membersWithInfoArray) => new Promise((resolve, reject) => {
    console.info('4. Update members info in DB [start]');
    membersWithInfoArray.map((item) => {
        try {
            const body = item;
            fetch('./sellers/update', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            }).then((response) => {
                resolve(response.json())
            }).catch((err) => reject(err));
        } catch (e) {
            reject(e)
        }
        return null
    });
    console.info('4. Update members info in DB [finish]');
});

export {
    list,
    createMembersToDB,
    updateMembersInDB
}
