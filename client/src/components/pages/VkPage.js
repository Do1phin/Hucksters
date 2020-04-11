import React, {Fragment, useState} from "react";
import jsonp from './jsonp';

const VkPage = () => {
    const [data, setData] = useState();
    const [users, setUsers] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [photos, setPhotos] = useState([]);

    let albumTitleKeys = ['дорого', 'скидк', 'в наличи', 'футболки', 'поло', 'ремни', 'галстуки', 'одежда',
        'продаж', 'new', 'о б н о в а', 'обнова', 'o b n o v a',
    ];


    let authUrl = 'https://oauth.vk.com/authorize?client_id=6907721&display=page&redirect_uri=https://oauth.vk.com/blank.html&scope=friends&response_type=token&v=5.52'
    let data2, method, params, group;

    const params2 = {
        group_id: 115050558,
        sort: 'id_asc',
        count: 1000,
        offset: 0
    };

    const getUrl = (method, params) => {
        const token = 'b933997c980d6742a0247af5fe4ade67a8f9d1c796205776d97b8f08f896cdc0d13e9a5863f1fb0786fef';
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

        for (let i = 7; i < 8; i++) {
            await setTimeout((function (i) {
                return () => {
                    params = 'group_id=' + group + '&sort=id_asc&count=1000&offset=' + i * 1000;
                        const url = getUrl(method, params);
                        sendVkRequest(url);
                        return setUsers(data);
                };
            })(i), 1000 * (i + 1))
        }

    };


    const getUserAlbums = async () => {
        method = 'photos.getAlbums';
        params = 'owner_id=' + 131934298;
        const url = await getUrl(method, params);
        return await sendVkRequest(url);
    };

    const checkSeller = async () => {
        data.items.map((item) => {
            albumTitleKeys.map((element) => {
                if (item.title.toLowerCase().includes(element.toLowerCase())) {
                    console.log(element, item.title);
                    albums.push(item.id)
                }
            })
        });
        console.log('albums -> ', albums);
        return setAlbums(albums);
    };

    const getPicturesOneAlbum = async () => {

        method = 'photos.get';
        params = 'owner_id=131934298&album_id=161517835';
        const url = await getUrl(method, params);
        await sendVkRequest(url);
        return setPhotos(data);
    };

    const addUserToDB = () => {

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
        })
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

    return (
        <Fragment>
            <h1>Вк страница</h1>

            <button
                onClick={getUsers}
            >
                Получить всех пользователей группы
            </button>
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
            <br/>

            <button
                onClick={getPicturesOneAlbum}
            >
                Получить все фотографии выбранного альбома
            </button>
            <br/>

            <hr/>

            <button
                onClick={addUserToDB}
            >
                Добавить пользователей в базу
            </button>


        </Fragment>


    )

};
export default VkPage;
