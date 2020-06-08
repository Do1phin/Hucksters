const APIReadPhotosFromDB = (params) => {
    const {text, skip, limit, sort, flagTotalPhotos} = params;
    let body = {
        text,
        skip,
        limit: limit || 100000,
        sort,
        flagTotalPhotos
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

const APICreatePhotosToDb = (photoArray) => new Promise((resolve, reject) => {

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

const APIUpdateCounterForAddedPhotos = (props) => new Promise((resolve, reject) => {
    console.log('props ', props);
});

const APIUpdateFavoritePhotosCount = (props) => new Promise((resolve, reject) => {
    const body = props;
    try {
        fetch('/photos/additional_photos/operation', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        }).then((response) => {
            const data = response.json();
            resolve(data);
        }).catch((err) => reject(err));
    } catch (e) {
        reject(e);
    }
});


const APIReadFavoritePhotos = (props) => new Promise((resolve, reject) => {

    let membersIds = props.map(item => +item.photo_id);
    console.log('arrrr ', membersIds);

    try {
        fetch('/api/favorite', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(membersIds)
        }).then((response) => {
            const data = response.json();
            console.log('response ', data);
            resolve(data);
        }).catch((err) => reject(err));
    } catch (e) {
        reject(e);
    }
});

export {
    APICreatePhotosToDb,
    APIReadPhotosFromDB,
    APIUpdateCounterForAddedPhotos,
    APIReadFavoritePhotos,
    APIUpdateFavoritePhotosCount,
};
