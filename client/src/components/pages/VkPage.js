import React, {Fragment, useState} from "react";
import jsonp from './jsonp';

const VkPage = () => {
    const [data, setData ] = useState(null);


    let authUrl = 'https://oauth.vk.com/authorize?client_id=6907721&display=page&redirect_uri=https://oauth.vk.com/blank.html&scope=friends&response_type=token&v=5.52'
    let data2, method, params;

    const params2 = {
        group_id: 115050558,
        sort: 'id_asc',
        count: 1000,
        offset: 0
    };

    const getUrl = (method, params) => {
        const token = '1ebeb1d831ee18c9ad24cc59b5032292989693a270448bfa62c15ca03758aa7367787ca9be553828d2350';
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
        getUrl(method, params);
        return sendVkRequest(getUrl(method, params))
    };

    const saveUserToDB = async () => {
        getUsers();

        console.log('DData ', data);
        return (
            <Fragment>
                <ul>
                    {
                        data.map((item) => {
                            console.log(item)
                        })
                    }
                </ul>
            </Fragment>
        )
    };


    const sendVkRequest = (url) => {
        jsonp(url, (res => {
            if (res.error) {
                return console.log(`ERROR: `, res.error.error_msg)
            } else {
                console.log(`Response: `, res.response);
                return setData(res.response.items);

            }
        }));

    };

    return (
        <Fragment>
            <h1>Вк страница</h1>

            <button
                onClick={getUsers}
            >Загрузить пользователей
            </button>

            <button
                onClick={saveUserToDB}
                disabled={false}
            >Распарсить пользователей
            </button>

        </Fragment>
    )

};
export default VkPage;
