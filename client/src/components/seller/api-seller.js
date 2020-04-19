const list = (params) => {

    const url = '/sellers/';

    const {firstName, skip, limit} = params;

    const body = {
        firstName, skip, limit
    };

    try {
        return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then((res) => {
                return res.json()
            })
            .catch((error) => {
                console.log('Error -> ', error);
            });
    } catch (e) {
        throw new Error(e)
    }
};


export {
    list
}
