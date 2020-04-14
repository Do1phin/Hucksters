import jsonp from "./jsonpHandler.js";

let authUrl = 'https://oauth.vk.com/authorize?client_id=6907721&display=popup&response_type=token&v=5.52';


const getUrl = (method, params) => {

    if (!method) {
        throw new Error('Method is empty')
    }
    let path = '';
    for (let [key, value] of Object.entries(params)) {
        path += key + '=' + value + '&'
    }

    const token = '3ef9652d44ba744f2e85bf972fd9638470f837eddecb844840e29e5f2b6950c4f6caf9877e2fd038fabce';
    const url = 'https://api.vk.com/method/' + method + '?' + path
        + 'v=5.52&access_token=' + token;
    console.log('url - > ', url);
    return url
};

const sendRequest = async (method, params) => {
    console.log('vkApiHandler.js - > sendRequest', method, params);
    await jsonp(getUrl(method, params), (res => {
        if (res.error) {
            return console.log(`ERROR: `, res.error.error_msg)
        } else {
            console.log(`Response: `, res.response);
            return setData(res.response);
        }
    }));

};


export {
    getUrl,
    sendRequest,
}


