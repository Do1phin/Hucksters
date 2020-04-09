import jsonp from './jsonp';

const VkActions = () => {
    const getUrl = (method, params) => {
        const token = '192539407e35533f32342f57f45f484ebb9a7a100aca927a4d8b8f48eeb319edf3a898f62737fcb887a0f';
        const url = 'https://api.vk.com/method/'
            + method
            + '?' + params
            + '&v=5.52&access_token='
            + token;

        console.log(url)
        return url
    };

    const sendVkRequest = (url) => {
        jsonp(url, response => console.log(response));

    };

};

export default VkActions;
