const readFavoritesFromDB = (body) => {
    try {
        fetch('/api/favorite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(response => {
            if (response.ok) {
                const data = response.json();
                return data
            }
        })
    } catch (e) {
        console.log('eeee ', e)
        throw new Error(e);
    }
};

const updateFavoritesFromDB = (body) => {
    try {
        fetch('/api/favorite/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(response => {
            return response
        })

    } catch (e) {
        throw new Error(e)
    }
};

const deleteFavoriteFromDB = (body) => {
    try {
        fetch('/api/favorite/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then((response) => {
            return response;
        }).catch((err) => console.error(err))
    } catch (e) {
        throw new Error(e)
    }
};

export {
    readFavoritesFromDB,
    updateFavoritesFromDB,
    deleteFavoriteFromDB
}
