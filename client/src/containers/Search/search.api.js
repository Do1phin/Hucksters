const list = ({q}) => {
    try {
        return fetch('/SearchContainer?q=' + q, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            return response.json();
        }).catch((err) => console.error(err));
    } catch (e) {
        throw new Error(e);
    }
};

export {
    list
};
