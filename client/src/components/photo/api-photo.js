const list = (params) => {

    let url = '/sellers/albums/photos';

    const {text, skip, limit} = params;

    const body = {
        text: text,
        skip: skip,
        limit: limit
    };

    try {
        return fetch(url, {

                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(body)
            })
            .then((res) => {
                return res.json()
            })
            .catch((error) => {
                console.log('Error -> ', error);
            })
    } catch (e) {
        throw new Error(e)
    }
};

export {
    list
}
