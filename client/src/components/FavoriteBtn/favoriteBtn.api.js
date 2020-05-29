const createFavoritePhotoInDB = async (props) => {
    console.log('createFavoritePhotoInDB ' , props)
    const body = {};
    try {
        await fetch('', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(body)
        }).then((response) => {
            if (response.ok) {
                const data = response.json();
                return data;
            }
        }).catch((err) => console.error(err));
    } catch (e) {

    }
};

const readFavoritesFromDB = async (body) => {
    body = {};
    try {
        await fetch('/api/favorite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(response => {
            if (response.ok) {
                const data = response.json();
                return data;
            }
        });
    } catch (e) {
        throw new Error(e);
    }
};

const updateFavoritesFromDB = async (body) => {
    console.log('updateFavoritesFromDB' , body)
    try {
        await fetch('/api/favorite/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(response => {
            return response;
        });

    } catch (e) {
        throw new Error(e);
    }
};

const deleteFavoriteFromDB = async (body) => {
    try {
        await fetch('/api/favorite/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then((response) => {
            return response;
        }).catch((err) => console.error(err));
    } catch (e) {
        throw new Error(e);
    }
};

export {
    createFavoritePhotoInDB,
    readFavoritesFromDB,
    updateFavoritesFromDB,
    deleteFavoriteFromDB,
};
