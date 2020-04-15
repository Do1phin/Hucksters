import React, {Fragment, useState} from "react";
import jsonp from './jsonp';

const VkPage = () => {
    const [data, setData] = useState();
    const [users, setUsers] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [searchStr, setSearchStr] = useState(null);

    let albumTitleKeys = ['дорого', 'скидк', 'в наличи', 'футболк', 'поло', 'ремни', 'галстук', 'одежда',
        'продаж', 'new', 'о б н о в а', 'обнова', 'o b n o v a', 'куртк', 'ветровк', 'пальто', 'плащ',
        'обувь', 'свитер', 'кардиган', 'худи', 'свитшот', 'олимпийк', 'рубашк', 'рубах', 'джинс', 'чинос', 'брюк',
        'пиджак', 'костюм', 'майк', 'аксессуар', 'женск', 'шорты', 'низ', 'верх', 'взуття', 'одяг', 'обновление',
        'в наявност', 'обновка', 'кепк', 'шапк', 'есть', 'в продаж', 'мужское', 'о б у в ь', 'а к с е с с у а р ы',
        'о б н о в л е н и е', 'наличи', 'C L O T H I N G', 'новые'
    ];


    // let authUrl = 'https://oauth.vk.com/authorize?client_id=6907721&display=popup&response_type=token&v=5.52';
    let method, params, group;

    // const params2 = {
    //     group_id: 115050558,
    //     sort: 'id_asc',
    //     count: 1000,
    //     offset: 0
    // };

    const getUrl = (method, params) => {
        const token = 'c441c02a8bf6aac5584754b7098f6c8c6ba3ad6074809258b00928e1ac3ff403f55e05eed22906b080d72';
        const url = 'https://api.vk.com/method/'
            + method
            + '?' + params
            + '&v=5.52&access_token='
            + token;

        return url
    };

    const getUsers = async () => {

        group = 115050558;
        method = 'groups.getMembers';

        for (let i = 5; i < 6; i++) {
            await setTimeout((function (i) {
                return async () => {
                    params = 'group_id=' + group + '&sort=id_asc&count=1000&offset=' + i * 1000;
                    const url = await getUrl(method, params);
                    await sendVkRequest(url);
                    setUsers(data);
                    return addUserToDB
                };
            })(i), 1000 * (i + 1))
        }

    };


    const getUserAlbums = async () => {
        method = 'photos.getAlbums';
        params = 'owner_id=' + 314441151;
        const url = await getUrl(method, params);
        return await sendVkRequest(url);
    };

    const checkSeller = async () => {
        data.items.map((item) => {
            albumTitleKeys.map((element) => {
                if (item.title.toLowerCase().includes(element.toLowerCase())) {
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

        method = 'photos.get';
        params = 'owner_id=' + 314441151 + '&album_id=' + 218737155 + '&count=1000&extended=1';
        const url = await getUrl(method, params);
        await sendVkRequest(url);
        return setPhotos(data);
    };

    const addUserToDB = () => {

        // data.items.map((item) => {
        data.items.map((item) => {
            try {
                const body = {vkId: item};
                fetch(
                    './sellers/add', {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(body)
                    })
                    .then(res => res.json())
                    .then(data => {
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
                const body = {
                    vkId: item.owner_id,
                    albumId: item.id,
                    albumTitle: item.title,
                    albumSize: item.size,
                    albumCreated: item.created,
                    albumUpdated: item.updated,
                };
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

                const body = {
                    vkId: item.owner_id,
                    albumId: item.album_id,
                    photoId: item.id,
                    photoText: item.text,
                    photoSrc: item.photo_604,
                    photoDate: item.date,
                };

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


    const sendVkRequest = async (url) => {
        await jsonp(url, (res => {
            if (res.error) {
                return console.log(`ERROR: `, res.error.error_msg)
            } else {
                console.log(`Response: `, res.response);
                return setData(res.response);
            }
        }));

    };

    const checkData = () => {
        console.log('data ', data);
        console.log('users ', users);
        console.log('albums ', albums);
        console.log('photos ', photos);
    };

    const handleChange = (props) => {
        setSearchStr(props.value)
    };


    return (
        <Fragment>
            <h1>Вк страница</h1>

            <button
                onClick={getUsers}
            >
                Получить всех пользователей группы
            </button>
            <button
                onClick={addUserToDB}
            >
                Добавить пользователей в базу
            </button>
            <hr/>
            <br/>

            <button
                onClick={getUserAlbums}
            >
                Получить все альбомы выбранного пользователя
            </button>
            <br/>

            <button
                onClick={checkSeller}
            >
                Проверить есть ли альбомы с товарами
            </button>
            <button
                onClick={addAlbumsToDB}
            >
                Добавить альбомы в базу
            </button>
            <br/>
            <hr/>

            <button
                onClick={getPicturesOneAlbum}
            >
                Получить все фотографии выбранного альбома
            </button>
            <button
                onClick={addPhotosToDB}
            >
                Добавить фотографии в базу
            </button>
            <br/>
            <hr/>

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

        </Fragment>


    )

};
export default VkPage;
