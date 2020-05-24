const getPhotosFromDB = (params) => {
    const {text, skip, limit, sort} = params;
    let body = {
        text,
        skip,
        limit: limit || 100000,
        sort
    };

    try {
        return fetch('/members/albums/photos', {
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

const addPhotosToDb = (photoArray) => new Promise((resolve, reject) => {

    photoArray.map((item) => {

        try {
            fetch('/photos/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            }).then((response) => {
                resolve(response.json());
            }).catch((err) => reject(err));

        } catch (e) {
            reject(e);
        }
        return null;
    });
});

const updateAddPhotosCount = (props) => new Promise((resolve, reject) => {
    console.log('props ', props);
});

const getPhotosFavorites = (props) => new Promise((resolve, reject) => {

    let membersIds = props.map(item => +item.photo_id);
    console.log('arrrr ', membersIds);

    try {
        fetch('/api/favorite', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(membersIds)
        }).then((response) => {
            const data = response.json();
            console.log('response ' , data);
            resolve(data);
        }).catch((err) => reject(err));
    } catch (e) {
        reject(e);
    }
    // props.map(item => item.photo_id);

});

export {
    addPhotosToDb,
    getPhotosFromDB,
    updateAddPhotosCount,
    getPhotosFavorites
};
