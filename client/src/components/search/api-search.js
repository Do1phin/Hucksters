const list = ({searchStr}) => {
    console.log('props ', searchStr)
    try {
        return fetch(
            '/search', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((res) => {
                console.log('res ... ', res)
                return res.json()
            })
            .catch((error) => {
                console.log('Error -> ', error)
            })

    } catch (e) {
        throw new Error(e)
    }
};

export {
    list
}
