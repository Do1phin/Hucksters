// const getCountersFromDB = (owner_id) => new Promise((resolve, reject) => {
//
//     console.info('getSizesMembers')
//     const body = {limit: 1000, skip: 0, first_name: ''};
//
//     try {
//         fetch('./members', {
//             method: 'POST',
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(body)
//         }).then((response) => response.json())
//             .then((data) => {
//                 console.log('data ', data)
//                 setMembersInfo({...data.itemSize});
//                 setMembers(data.sellers);
//                 resolve(data.sellers)
//             })
//     } catch (e) {
//         setCheckStatus('Ошибка получения пользователей!');
//         reject(e)
//     }
// });

// Создаём счётчики
const createCountersToDB = () => new Promise((resolve, reject) => {
    try {
        fetch('/vk/info/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            resolve(response);
        });
    } catch (e) {
        reject(e);
    }
});

// Считываем данные счётчиков
const readCountersFromDB = () => new Promise((resolve, reject) =>{

    try {
        fetch('/vk/info')
            .then((response) => {
                // const data = response
                resolve(response.json());
            }).then(data => console.info(data))
            .catch((err) => {
                reject(err);
            });
    } catch (e) {
        console.error(e);
    }
});

// Обновляем данные счётчиков
const updateCountersToDB = () => new Promise((resolve, reject) => {
    try {
        deleteCounterFromDB();
        createCountersToDB();
    } catch (e) {
        reject(e);
    }
});

// Удаляем сами счётчиков
const deleteCounterFromDB = () => new Promise((resolve, reject) => {
    try {
        fetch('/vk/info/delete')
            .then((response) => {
                // const data = response
                resolve(response.json());
            }).then(data => console.info(data))
            .catch((err) => {
                reject(err);
            });
    } catch (e) {
        reject(e);
    }
});

export {
    createCountersToDB,
    readCountersFromDB,
    updateCountersToDB,
    deleteCounterFromDB
};
