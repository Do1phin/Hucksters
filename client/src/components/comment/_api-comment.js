const checkCommentsBeforeAdd = (commentsArray) => new Promise((resolve, reject) => {
    const photoId = +commentsArray.slice(-1);
    let arr = [], arr2 = [];
    const keys = ['продан', 'больше нет', 'sold', 'цена'];

    commentsArray.map((item) => {
        keys.map((element) => {
            console.log('element item includes ', item, element, item.text.toLowerCase().includes(element.toLowerCase()));
            if (item.text.toLowerCase().includes(element.toLowerCase())) {
                arr.push(item);
            } else {
                if (!arr2.includes(item) && item.attachments.length > 0) {
                    item['photoId'] = photoId;
                    arr2.push(item);
                }
            }
        });
        if (!arr.length) {
            resolve(arr2);
        }
    });
    resolve('ok!')
});

const addCommentsToDb = (commentArray) => new Promise((resolve, reject) => {
    console.log('addCommentsToDb ', commentArray);

    commentArray.map((item) => {
        try {
            fetch('/vk/comment/add', {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(item)
            }).then((response) => {
                console.log('rrrr ', response);
                resolve(response)
            }).catch((err) => reject(err))
        } catch (e) {
            reject(e)
        }
    });
    resolve(commentArray)
});

export {
    addCommentsToDb,
    checkCommentsBeforeAdd,
}