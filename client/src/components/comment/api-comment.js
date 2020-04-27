const addCommentsToDb = (params) => new Promise((resolve, reject) => {
    console.log('prams ', params)
    const body = [];
    try {
        fetch('/vk/comment/add', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(body)
        }).then((response) => {
            console.log('rrrr ', response);
            resolve(response)
        }).catch((err) => reject(err))
    } catch (e) {
        reject(e)
    }
});

export {
    addCommentsToDb,
}
