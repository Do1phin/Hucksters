const APICreateAlbumsToDB = (albumsArray) => new Promise((resolve, reject) => {
    console.log('createAlbumsToDB ', albumsArray);

    albumsArray.map((item) => {
        try {
            return fetch('/albums/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            }).then((response) => {
                return response.json();
            }).then((data) =>{
                resolve(data);
            }).catch((err) => console.error(err));
        } catch (e) {
            reject(e);
        }
        return null;
    });
});

// Получаем альбомы пользователей из базы
const APIReadAlbumsFromDB = (props) => {

    let {search_text, skip, limit, sort, info, owner_id, flagTotalAlbums} = props;
    let params;

    let body = {
        owner_id,
        title: search_text,
        skip,
        limit,
        sort,
        info,
        flagTotalAlbums,
        sortParams: {'updated': sort || -1}
    };

    if (info === 'list') {
        params = search_text ? {title: new RegExp(search_text, 'i')}: {} // регулярка выполняется, а это не надо
    } else if (info === 'seller') {
        params = {owner_id: owner_id};
    } else if (info === 'check_one') {
        params = {owner_id: owner_id};
    } else if (info === 'check_all') {
        params = {};
    }

    body['params'] = params;

    try {
        return fetch('/members/albums', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then((response) => {
            return response.json();
        }).then((data) => {
            return data;
        }).catch((err) => console.error(err));
    } catch (e) {
        throw new Error(e);
    }
};

export {
    APICreateAlbumsToDB,
    APIReadAlbumsFromDB,
};
