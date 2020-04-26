const list = (params) => {
    const {title, skip, limit, sort} = params;

    const body = {
        title,
        skip,
        limit,
        sort
    };

    try {
        return fetch('/sellers/albums', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then((response) => {
            return response.json()
        }).catch((err) => console.error(err));
    } catch (e) {
        throw new Error(e);
    }
};

const getAlbumsFromDB = () => new Promise((resolve, reject) => {
    const body = {
        title: '',
        skip: 0,
        limit: 0,
        sort: -1
    };

    return fetch('/sellers/albums_for_check', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }).then((response) => {
        resolve(response.json())
    }).catch((err) => reject(err))
});

export {
    list,
    getAlbumsFromDB
}
