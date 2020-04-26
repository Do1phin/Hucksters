const list = (params) => {
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

export {
    list
}
