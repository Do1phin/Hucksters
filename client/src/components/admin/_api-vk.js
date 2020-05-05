/* global VK */

// Обращение к API
const call = (method, params) => {
    try {
        return new Promise((resolve, reject) => {
            VK.Api.call(method, params, (response) => {
                console.log('vk call response ', response);
                if (!response.error) {
                    resolve(response)
                } else {
                    if (response.error) {
                        reject(`VkApiError: code[${response.error.error_code}] - ${response.error.error_msg}`);
                    }
                    reject(`VkApiError: code[${response.error.error_code}] - ${response.error.error_msg}`)
                }
            })
        })
    } catch (e) {
        throw new Error(e);
    }
};

// Проходим авторизацию
const login = () => {
    VK.Auth.login((response => {
        console.log('session ', response)
    }), 4)
};

// Получаем всех пользователей группы
const getMembersGroupFromVk = ({group_id, count}) => new Promise((resolve, reject) => {
    console.log('getMembersGroupFromVk ', group_id);
    const params = {
        group_id,
        sort: 'id_asc',
        count: 1000,
        offset: count * 1000,
        v: 5.9
    };

    call('groups.getMembers', params)
        .then((response) => {
            if (response) resolve(response.response.items); // массив пользователей группы
        }).catch((err) => reject(err));

});

// Получаем подробную информацию по пользователям
const getMembersInfoFromVk = (membersArray) => new Promise((resolve, reject) => {
    console.log('getMembersInfoFromVk' , membersArray);
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
            if (response) resolve(response.response);
        }).catch((err) => reject(err));

});

// Получаем все фотографии из альбома
const getPhotosFromVk = (groupObj) => new Promise((resolve, reject) => {

    const {user_id, album_id} = groupObj;
    const params = {
        owner_id: user_id,
        album_id,
        rev: 0,
        extended: 1,
        count: 1000,
        photo_sizes: 1,
        v: 5.103
    };

    call('photos.get', params)
        .then((response) => {
            if (response.response.items) resolve(response.response.items);
            if (!response.response.items) reject('* 0 photos *')
        }).catch((err) => reject(err))
});

// Получаем комментарии
const getCommentsFromVk = (photoObj) => new Promise((resolve, reject) => {
    const {userId, photoId} = photoObj;
    const params = {
        owner_id: userId,
        photo_id: photoId,
        count: 100,
        extended: 1,
        sort: 'asc',
        fields: 'photo_id',
        v: 5.103
    };

    call('photos.getComments', params)
        .then((response) => {
            if (response.response.items.length) {
                console.log('response.items ', response.response.items);
                resolve([...response.response.items, photoId])
            } else {
                reject()
            }
        }).catch((err) => {
        reject(err)
    })
});


// Получаем подробную информацию о группе
const getGroupInfoFromVk = (group_id) => new Promise((resolve, reject) => {
    let gr_id;
    if (group_id.type !== 'string') {

    } else {
        gr_id = new RegExp(/\/.*/g, 'asdf')
    }

    if (group_id < 0) {
        reject('Group not found')
    }

    const params = {
        group_ids: group_id,
        fields: 'city, country, place, description, wiki_page, market, members_count, counters, start_date, ' +
            'finish_date, can_post, can_see_all_posts, activity, status, contacts, links, fixed_post, verified, ' +
            'site, ban_info, cover',
        v: 5.120
    };

    call('groups.getById', params)
        .then((result) => {
            if (!result) reject('No group info');
            resolve({...result.response[0]});
        }).catch((err) => reject(err));
});

// Получаем количество пользователей в группе
const getGroupSizeFromVk = (groupObj) => new Promise((resolve, reject) => {
    if (groupObj.deactivated || groupObj.id < 0) {
        reject('Group not found');
    }
    // } else if (groupObj.is_closed = 2) {
    //     reject('Group is closed')
    // }

    const params = {
        group_id: groupObj.id,
        v: 5.103
    };

    call('groups.getMembers', params)
        .then((result) => {
            if (!result) {
                reject('No group size');
            }
            groupObj['size'] = +result.response.count;
            resolve(groupObj);
        }).catch((err) => reject(err))
});

// Получаем все альбомы пользователя
const getAlbumsFromVk = (obj) => new Promise((resolve, reject) => {
    console.log('getAlbumsFromVk ', obj)
    const {user_id} = obj;

    const params = {
        owner_id: user_id,
        need_covers: 1,
        photo_sizes: 1,
        count: 1000,
        v: 5.103
    };

    try {
        call('photos.getAlbums', params)
            .then((data) => {
                if (!data || !data.response.count) {
                    reject('(reject - empty)')
                } else {
                    resolve(data.response.items) // массив альбомов
                }
            }).catch((err) => {
            reject(err)
        })
    } catch (e) {
        reject(e)
    }
});

export {
    call,
    login,
    getMembersGroupFromVk,
    getMembersInfoFromVk,
    getGroupInfoFromVk,
    getGroupSizeFromVk,
    getPhotosFromVk,
    getCommentsFromVk,
    getAlbumsFromVk
}
