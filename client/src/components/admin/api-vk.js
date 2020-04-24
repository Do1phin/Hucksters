/* global VK */

const getGroupMembers = (params) => {
    try {
        return fetch(
            '/vk/getmembers', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then((res) => {
                console.log('api-vk.js - > res', res);
                return res.json()
            })
            .catch((error) => {
                console.log('Error -> ', error)
            })
    } catch (e) {
        throw new Error(e);
    }
};

const login = () => {
    VK.Auth.login(response => console.log('session ', response))
};

const call = (method, params) => {
    try {
        return new Promise((resolve, reject) => {
            VK.Api.call(method, params, res => {
                if (res) resolve(res.response);
                reject();
            });
        });
    } catch (e) {
        throw new Error(e);
    }
};


export {
    call,
    login
}
