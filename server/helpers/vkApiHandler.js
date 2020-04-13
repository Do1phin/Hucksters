import jsonp from "../helpers/jsonpHandler.js";

const getUrl = (method, params) => {
    const token = 'b5cfd2aa3d6b213cc3fc8bb287af5c81b7b33756fb74338bde4125d6235742a2f0bb1a44ddf639075ce22';
    const url = 'https://api.vk.com/method/'
        + method
        + '?' + params
        + '&v=5.52&access_token='
        + token;

    return url
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


export default {
    getUrl,
    sendVkRequest
}


