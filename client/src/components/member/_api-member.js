// Получаем продавцов из базы
const getMembersFromDB = (params) => new Promise((resolve, reject) => {

    const {owner_id, search_text, skip, limit, status, country} = params;

    let body = {
        owner_id,
        search_text,
        skip,
        limit: limit,
        status,
        country
    };

    try {
        return fetch('/members', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then((response) => {
            const data = response.json();
            resolve(data)
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
const createMembersToDB = (membersArray) => new Promise(async (resolve, reject) => {
    // const dispatch = useDispatch();
    // dispatch(setCheckStatusString('- добавление мемберов в базу...'));
    console.log('createMembersToDB ', membersArray);

    let preparatoryMembersArray = [];

    await membersArray.filter((owner_id, index) => {
        console.log('i ', index, membersArray.length - 1)
        const body = {'owner_id': owner_id, '_updated.info': 'create'};

        try {
            fetch('/members/create', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            }).then((response) => {
                console.log('res ', response);
                // return owner_id;
                if (response.ok) {
                    return preparatoryMembersArray.push(owner_id)
                }

            }).catch((err) => {
                reject(err);
            });

        } catch (e) {
            reject(e);
        }


    });

    // const finish = (preparatoryMembersArray) => {
    //     if (index === membersArray.length -1) {
            if (preparatoryMembersArray.length) {
                console.log('if')
                resolve(preparatoryMembersArray)
            } else {
                console.log('else')
                reject('All members already exist')
            }
    //     }
    // }



    console.log('2', Array.isArray(preparatoryMembersArray))
    console.log('preparatoryMembersArray ', preparatoryMembersArray);
    console.log('preparatoryMembersArray typeof ', typeof preparatoryMembersArray);
    console.log('preparatoryMembersArray length ', preparatoryMembersArray['length'], preparatoryMembersArray);


});

const updateMembersInDB = (membersWithInfoArray) => new Promise((resolve, reject) => {
    // const dispatch = useDispatch();
    // dispatch(setCheckStatusString('- обновление информации мемберов в базе...'));
    console.log('updateMembersInDB ', membersWithInfoArray);

    membersWithInfoArray.map((item) => {
        try {
            fetch('/members/update', {
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
