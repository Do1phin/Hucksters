const list = (params) => {

    let url = '/sellers/albums/photos';

    const body = {
        text: params.text,
        page: 1,
        limit: 100
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
