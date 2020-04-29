const getAlbumsFromDB = (params) => {
    console.log('params ', params)
    const {title, skip, limit, sort} = params;

    const body = {
        title,
        skip,
        limit,
        sort
    };

    // const body = {
    //     title: '',
    //     skip: 0,
    //     limit: 0,
    //     sort: -1
    // };

    console.log('body  b ', body);
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

export {
    getAlbumsFromDB,
}
