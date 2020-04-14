const getGroupMembers = (params) => {
    try {
        return fetch(
            '/vk/getmembers', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then((res) => {
                console.log('api-vk.js - > res', res);
                return res.json()
            })
            .catch((error) => {
                console.log('Error -> ', error)
            })
    } catch (e) {
        throw new Error(e);
    }
};

export {
    getGroupMembers
}
