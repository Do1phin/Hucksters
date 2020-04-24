import React, {Fragment, useState} from "react";

const VkPage = () => {
    const [data, setData] = useState([]);
    const [users, setUsers] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [searchStr, setSearchStr] = useState('');
    const [groupId, setGroupId] = useState(115050558);
    const [userId, setUserId] = useState(314441151);
    const [albumId, setAlbumId] = useState(218737167);

    let source;

    let albumTitleKeys = ['дорого', 'скидк', 'в наличи', 'футболк', 'поло', 'ремни', 'галстук', 'одежда',
        'продаж', 'new', 'о б н о в а', 'обнова', 'o b n o v a', 'куртк', 'ветровк', 'пальто', 'плащ',
        'обувь', 'свитер', 'кардиган', 'худи', 'свитшот', 'олимпийк', 'рубашк', 'рубах', 'джинс', 'чинос', 'брюк',
        'пиджак', 'костюм', 'майк', 'аксессуар', 'женск', 'шорты', 'низ', 'верх', 'взуття', 'одяг', 'обновление',
        'в наявност', 'обновка', 'кепк', 'шапк', 'есть', 'в продаж', 'мужское', 'о б у в ь', 'а к с е с с у а р ы',
        'о б н о в л е н и е', 'наличи', 'C L O T H I N G', 'новые'
    ];

    // let authUrl = 'https://oauth.vk.com/authorize?client_id=6907721&display=popup&response_type=token&v=5.52';
    // let method, params;

    // собираем адрес для перехода
    const getUrl = (method, params) => {

        if (!method) {
            throw new Error('Method is empty')
        }
        let path = '';
        for (let [key, value] of Object.entries(params)) {
            path += key + '=' + value + '&'
        }

        const token = "9b44881498a7e7fbc3ef75cc44988be0500cb91768fe38623a44bdc217e7afb201425f8d5a37d8cdb0b7e";
        const url = 'https://api.vk.com/method/' + method + '?' + path
            + 'access_token=' + token;
        console.log('url - > ', url);
        return url
    };

    const testFunc = () => {

    };

    const getAllMembers = () => {
        let count = 0;
        (function f() {
            if (count > 0) {
                // document.querySelector(".save-user-button").click();
                // addUserToDB()
            }

            if (count < 2) {
                getMembers(count);
                // getUserInfo();
                count++;
                setTimeout(f, 3000);
            } else {
                console.log('Users loaded');
            }
        })();
    };

    // получаем пользователей группы
    const getMembers = async (offset) => {
        // на 24.04.2020
        // 115050558 - ЖИРНЫЙ УЛОВ - 113720
        // 25697392 - CASUAL UKRAINE - 186125


        const params = {
            group_id: 115050558,
            sort: 'id_asc',
            count: 300,
            offset: offset * 1000,
            v: 5.9
        };

        let response = await sendVkRequest('groups.getMembers', params);
        setUsers(response);
        return response;
    };

    // получаем данные пользователя
    source = data;
    const getUserInfo = async () => {
        source.items.length = 400;
        let ids = source.items.join();

        const params = {
            user_ids: ids,
            fields: 'id,first_name,last_name,nickname,maiden_name,deactivated,is_closed,connections,country,domain,photo_50,photo_100,photo_200,photo_200_orig,sex,verified',
            name_case: 'Nom',
            v: 5.89
        };
        const data = await sendVkRequest('users.get', params);
        return data
    };


    // получаем все альбомы пользователя
    const getUserAlbums = async () => {
        const params = {
            owner_id: userId,
            need_covers: 1,
            photo_sizes: 1,
            count: 1000,
            v: 5.30
        };
        const data = await sendVkRequest('photos.getAlbums', params);
        return data;
    };


    const checkSeller = async () => {
        data.items.map((item) => {
            albumTitleKeys.map((element) => {
                if (item.title.toLowerCase().includes(element.toLowerCase()) && !albums.includes(item)) {
                    console.log(element, item);
                    albums.push(item)
                }
                return null
            });
            return null
        });
        console.log('albums -> ', albums);
        return setAlbums(albums);
    };

    const getPicturesOneAlbum = async () => {
        const params = {
            owner_id: userId,
            album_id: albumId,
            rev: 0,
            extended: 1,
            photo_sizes: 1,
            count: 1000,
            v: 5.77
        };
        const data = await sendVkRequest('photos.get', params);
        setPhotos(data);
        return data;
    };


    // добавить аккаунт в базу данных
    const addUserToDB = () => {

        const body = {source: data.items};

        try {

            fetch(
                './sellers/add', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body)
                })
                .then(res => {
                    if (!res.ok) return console.log(`Error: status(${res.status}), text - "${res.statusText}"`);
                    return console.log(`Success: status(${res.status}), text - "${res.statusText}"`);
                })

        } catch (e) {
            console.log('ERROR: ', e)
        }
        return null
    };

    // обновить в базе информацию аккаунта (только общая инфа)
    const updateUserFromDB = () => {

        data.map((item) => {
            try {
                const body = item;
                fetch(
                    './sellers/update', {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(body)
                    })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log('data - ', data)
                    })
            } catch (e) {
                console.log('ERROR: ', e)
            }
            return null
        });
        return null
    };

    const addAlbumsToDB = () => {

        albums.map((item) => {
            try {
                const body = item;
                fetch(
                    './albums/add', {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(body)
                    })
                    .then(res => res.json())
                    .then(data => {
                        console.log('data ', data)
                    })
            } catch (e) {
                console.log('ERROR: ', e)
            }
            return null
        });
        return null
    };

    const addPhotosToDB = () => {

        data.items.map((item) => {
            try {

                const body = item;

                fetch(
                    './photos/add', {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(body)
                    }
                )
                    .then(res => res.json())
                    .then(data => {
                        console.log('data ', data)
                    })

            } catch (e) {
                console.log('ERROR ', e)
            }
            return null
        });
        return null
    };

    const checkPhotosText = () => {
        data.items.map((item) => {
            if (item.text.toLowerCase().includes(searchStr.toLowerCase())) {
                console.log(item.text);

            }
            return null
        });
        console.log(searchStr);
        return null
    };

    const sendVkRequest = (method, params) => {
        // jsonp(getUrl(method, params), (res => {
        //         if (res.error) {
        //             return console.log(`ERROR: `, res.error.error_msg)
        //         }
        //         console.log(`Response: `, res.response);
        //         setData(res.response);
        //         return res.response;
        //     })
        // );
    };

    const checkData = () => {
        setUsers(data)
        console.log('data ', data);
        console.log('users ', users);
        console.log('albums ', albums);
        console.log('photos ', photos);
    };

    const handleChange = (props) => {
        if (props.name === 'search-group') {
            setGroupId(props.value)
        } else if (props.name === 'search-string') {
            setSearchStr(props.value)
        } else if (props.name === 'search-user') {
            setUserId(props.value)
        } else if (props.name === 'search-album') {
            setAlbumId(props.value)
        }
    };


    return (
        <Fragment>
            <h1>Вк страница</h1>

            <button
                onClick={getAllMembers}
            >
                Get members from group
            </button>
            <input
                name='search-group'
                value={groupId}
                onChange={(e) => handleChange(e.target)}
            />
            <button className='save-user-button'
                    onClick={addUserToDB}
            >
                Save members to DB
            </button>
            <hr/>
            <br/>

            <button
                onClick={getUserInfo}
            >
                Get user info
            </button>
            <input
                name='search-user'
                value={userId}
                onChange={(e) => handleChange(e.target)}
            />
            <button
                onClick={updateUserFromDB}
            >
                Save users info to DB
            </button>
            <br/>

            <button
                onClick={getUserAlbums}
            >
                Get user albums
            </button>
            <input
                name='search-user'
                value={userId}
                onChange={(e) => handleChange(e.target)}
            />
            <button
                onClick={addAlbumsToDB}
            >
                Save albums to DB
            </button>
            <br/>

            <button
                onClick={checkSeller}
            >
                Проверить есть ли альбомы с товарами
            </button>

            <hr/>
            <br/>
            <button
                onClick={getPicturesOneAlbum}
            >
                Get album photos
            </button>
            <input
                name='search-album'
                value={albumId}
                onChange={(e) => handleChange(e.target)}
            />
            <button
                onClick={addPhotosToDB}
            >
                Save photos to DB
            </button>

            <hr/>
            <br/>

            <input
                type='text'
                className='form-control'
                name='search-string'
                value={searchStr}
                onChange={(e) => handleChange(e.target)}
            />
            <button
                onClick={checkPhotosText}
            >
                Искать бренд
            </button>


            <br/>
            <hr/>

            <button
                onClick={checkData}
            >
                check
            </button>

            <br/>
            <hr/>

            <button
                onClick={testFunc}
            >
                Тестовая функция
            </button>

        </Fragment>


    )

};
export default VkPage;
