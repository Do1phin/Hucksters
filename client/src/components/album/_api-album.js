const createAlbumsToDB = (albumsArray) => new Promise((resolve, reject) => {
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
                return response.json()
            }).then((data) =>{
                resolve(data)
            }).catch((err) => console.error(err))
        } catch (e) {
            reject(e)
        }
    })
});

// Получаем альбомы пользователей из базы
const getAlbumsFromDB = (props) => {

    let {title, skip, limit, sort, info, user_id} = props;
    let params;

    let body = {
        user_id,
        title,
        skip,
        limit,
        sort,
        info,
        sortParams: {"updated": sort || -1}
    };

    if (info === 'list') {
        params = !title ? {} : {title: new RegExp(title, 'i')}
    } else if (info === 'seller') {
        params = {user_id: user_id}
    } else if (info === 'check_one') {
        params = {user_id: user_id}
    } else if (info === 'check_all') {
        params = {}
    }

    body['params'] = params;

    try {
        return fetch('/sellers/albums', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then((response) => {
            return response.json()
        }).then((data) => {
            return data
        }).catch((err) => console.error(err));
    } catch (e) {
        throw new Error(e);
    }
};

// Проверка имени альбомов на ключевые слова
const checkAlbumsNames = (albumsArray) => new Promise((resolve, reject) => {

    let albumTitleKeys = ['дорого', 'скидк', 'в наличи', 'футболк', 'поло', 'ремни', 'галстук', 'одежда',
        'продаж', 'new', 'о б н о в а', 'обнова', 'o b n o v a', 'куртк', 'ветровк', 'пальто', 'плащ',
        'обувь', 'свитер', 'кардиган', 'худи', 'свитшот', 'олимпийк', 'рубашк', 'рубах', 'джинс', 'чинос', 'брюк',
        'пиджак', 'костюм', 'майк', 'аксессуар', 'женск', 'шорты', 'низ', 'верх', 'взуття', 'одяг', 'обновление',
        'в наявност', 'обновка', 'кепк', 'шапк', 'есть', 'в продаж', 'мужское', 'о б у в ь', 'а к с е с с у а р ы',
        'о б н о в л е н и е', 'наличи', 'C L O T H I N G', 'новые',
    ];

    console.log('checkAlbumsNames', albumsArray);

    let arr = [];

    albumsArray.map((item) => {
        albumTitleKeys.map((element) => {
            if (item.title.toLowerCase().includes(element.toLowerCase()) && !arr.includes(item)) {
                console.log(element, item);
                arr.push(item)
            }
            return null
        });
        return null
    });
    if (!arr.length) {
        reject('(array is empty');
    } else {
        resolve(arr); // массив отобранных альбомов
    }
});

export {
    createAlbumsToDB,
    getAlbumsFromDB,
    checkAlbumsNames,
}
