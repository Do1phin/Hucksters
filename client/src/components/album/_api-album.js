const getAlbumsFromDB = (params) => {

    const {title, skip, limit, sort, page, user_id} = params;

    const body = {
        user_id,
        title,
        skip,
        limit,
        sort,
        page
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

export {
    getAlbumsFromDB,
}
