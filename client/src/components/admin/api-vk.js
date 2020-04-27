/* global VK */

const getGroupMembers = (params) => {
    try {
        return fetch('/vk/getmembers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            return response.json()
        }).catch((err) => console.error(err))
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
            VK.Api.call(method, params, (err, res) => {
                if (res) resolve(res.response);
                console.error(err);
                reject(`VkApiError: code[${err.error.error_code}] - ${err.error.error_msg}`, err);
            });
        });
    } catch (e) {
        throw new Error(e);
    }
};

// получаем всех пользователей группы * надо получить count для цикла и айди группы
const getMembersGroupFromVk = ({groupId, count}) => new Promise((resolve, reject) => {
    console.info('1. Get members [start]');
    const params = {
        group_id: groupId,
        sort: 'id_asc',
        count: 1000,
        offset: count * 1000,
        v: 5.9
    };

    call('groups.getMembers', params)
        .then((response) => {
            if (response) resolve(response.items);
        }).catch((err) => reject(err));

    console.info('1. Get members [finish]');
});

// получаем подробную информацию по пользователям * тоже посмотреть что получаем, надо привести к одному айди юзера
const getMembersInfoFromVk = (membersArray) => new Promise((resolve, reject) => {

    console.info('3. Get members info [start]');
    let ids = membersArray.join();

    const params = {
        user_ids: ids,
        fields: 'photo_id, verified, sex, bdate, city, country, home_town, has_photo, photo_50, photo_100, ' +
            'photo_200_orig, photo_200, photo_400_orig, photo_max, photo_max_orig, online, domain, has_mobile, ' +
            'contacts, site, education, universities, schools, status, last_seen, followers_count, ' +
            'common_count, occupation, nickname, relatives, relation, personal, connections, exports, ' +
            'activities, interests, music, movies, tv, books, games, about, quotes, can_post, ' +
            'can_see_all_posts, can_see_audio, can_write_private_message, can_send_friend_request, is_favorite, ' +
            'is_hidden_from_feed, timezone, screen_name, maiden_name, crop_photo, is_friend, friend_status, ' +
            'career, military, blacklisted, blacklisted_by_me, can_be_invited_group',
        name_case: 'Nom',
        v: 5.89
    };

    call('users.get', params)
        .then((response) => {
            if (response) resolve(response);
        }).catch((err) => reject(err));

    console.info('3. Get members info [finish]');
});

// получаем все фотографии из альбома
const getPhotosFromVk = (groupObj) => new Promise((resolve, reject) => {
    const {userId, albumId} = groupObj;
    const params = {
        owner_id: userId,
        album_id: albumId,
        rev: 0,
        extended: 1,
        count: 1000,
        photo_sizes: 1,
        v: 5.103
    };

    call('photos.get', params)
        .then((response) => {
            if (response) resolve(response.items);
        }).catch((err) => reject(err))
});

const getCommentsFromVk = (photoObj) => new Promise((resolve, reject) => {
    const {userId, photoId} = photoObj;
    const params = {
        owner_id: userId,
        photo_id: photoId,
        count: 100,
        sort: 'asc',
        fields: 'photo_id',
        v: 5.103
    };



    call('photos.getComments', params)
        .then((response) => {
            console.log('respon ', response)
            if (response) resolve(response)
        }).catch((err) => {
        console.log('err ', err)
            reject(err)})

});

export {
    call,
    login,
    getMembersGroupFromVk,
    getMembersInfoFromVk,
    getPhotosFromVk,
    getCommentsFromVk
}
