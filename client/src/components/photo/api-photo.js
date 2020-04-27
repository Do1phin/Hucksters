const list = (params) => {
    console.log('params ', params)
    const {text, skip, limit, sort} = params;
    const body = {
        text,
        skip,
        limit,
        sort
    };

    try {
        return fetch('/sellers/albums/photos', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(body)
        }).then((response) => {
            return response.json()
        }).catch((err) => console.error(err))
    } catch (e) {
        throw new Error(e)
    }
};

const getPhotosFromDb = () => new Promise((resolve, reject) => {
    const body = [];
    try {
        return fetch('/sellers/albums/photos_for_check', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(body)
            }).then((response) => {
                resolve(response.json())
        }).catch((err) => reject(err))
    } catch (e) {

    }
});

const addPhotosToDb = (photoArray) => new Promise((resolve, reject) => {
    console.log('photoObj ', photoArray)
    photoArray.map((item) => {

        try {
            fetch('/photos/add', {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(item)
            }).then((response) => {
                resolve(response.json())
            }).catch((err) => reject(err))

        } catch (e) {
            reject(e)
        }
    })
});


export {
    list,
    addPhotosToDb,
    getPhotosFromDb
}
