const list = (params) => {
    try {
        return fetch(
            '/sellers', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            .then((res) => {
                return res.json()
            })
            .catch((error) => {
                console.log('Error -> ', error)
            });
    } catch (e) {
        throw new Error(e)
    }
};


export {
    list
}
