import React, {Fragment, useState} from "react";
import jsonp from './jsonp';

const VkPage = () => {
    const [data, setData] = useState(null);
    const [albums, setAlbums] = useState([]);

    let keys = ['обнова', 'скидка', 'продано', 'vk', 'ТЕСТ'];


    let authUrl = 'https://oauth.vk.com/authorize?client_id=6907721&display=page&redirect_uri=https://oauth.vk.com/blank.html&scope=friends&response_type=token&v=5.52'
    let data2, method, params;

    const params2 = {
        group_id: 115050558,
        sort: 'id_asc',
        count: 1000,
        offset: 0
    };

    const getUrl = (method, params) => {
        const token = '7f07c09d1f2582ec081c9fbc4a2d645dfc526c5126ca2986a8e9d9387c33b48185eab876c98b3324b26c8';
        const url = 'https://api.vk.com/method/'
            + method
            + '?' + params
            + '&v=5.52&access_token='
            + token;

        return url
    };

    const getUsers = () => {

        const interval = 61;

        method = 'groups.getMembers';
        params = 'group_id=115050558&sort=id_asc&count=1000&offset=0';
        const url = getUrl(method, params);
        return sendVkRequest(url)
    };

    const getUserAlbums = async () => {
        method = 'photos.getAlbums';
        params = 'owner_id=' + 16914329;
        const url = await getUrl(method, params);
        return await sendVkRequest(url);
    };

    const checkSeller = async () => {
        data.items.map((item) => {
            keys.map((element) => {
                if (item.title.toLowerCase().includes(element.toLowerCase())) {
                    console.log(element, item.title);
                    albums.push(item.id)
                }
            })
        });
        console.log('albums -> ', albums);
    };


    const saveUserToDB = async () => {
        let data = await getUsers();
        console.log('DData ', data);


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
                Загрузить пользователей
            </button>

            <button
                onClick={getUserAlbums}
            >
                Получить альбомы
            </button>

            <button
                onClick={checkSeller}
            >
                Прочекать альбомы
            </button>


        </Fragment>


    )

};
export default VkPage;
