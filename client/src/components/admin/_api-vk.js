/* global VK */
import {CheckerSetStatusStringAction} from "../../redux/actions/check.actions";
import { store } from "../../redux/store";

// Обращение к API
const call = (method, params) => {
    try {
        return new Promise((resolve, reject) => {
            VK.Api.call(method, params, (response) => {
                console.info('vk call response ', response);
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
    // const dispatch = useDispatch();
    store.dispatch(CheckerSetStatusStringAction('- получение пользователей из группы...'));
    console.log('getMembersGroupFromVk ', group_id);

    const params = {
        group_id,
        sort: 'id_asc',
        offset: count * 1000,
        count: 1000,
        // fields: 'sex, bdate, city, country, photo_50, photo_100, photo_200_orig, photo_200, photo_400_orig, ' +
        //     'photo_max, photo_max_orig, online, online_mobile, lists, domain, has_mobile, contacts, connections, ' +
        //     'site, education, universities, schools, can_post, can_see_all_posts, can_see_audio, ' +
        //     'can_write_private_message, status, last_seen, common_count, relation, relatives',
        // filter: ,
        v: 5.107
    };

    call('groups.getMembers', params) // https://vk.com/dev/groups.getMembers
        .then((response) => {
            console.log('groups.getMembers ' , response)
            if (response) resolve(response.response.items); // массив пользователей группы
        }).catch((err) => reject(err));

});

// Получаем подробную информацию по пользователям
const getMembersInfoFromVk = (membersArray) => new Promise((resolve, reject) => {
    // const dispatch = useDispatch();
    store.dispatch(CheckerSetStatusStringAction('- получение информации о пользователях из ВК...'));
    console.log('getMembersInfoFromVk' , membersArray);

    const params = {
        user_ids: membersArray.join(),
        fields: 'photo_id, verified, sex, bdate, city, country, home_town, has_photo, photo_50, photo_100, ' +
            'photo_200_orig, photo_200, photo_400_orig, photo_max, photo_max_orig, online, domain, has_mobile, ' +
            'contacts, site, education, universities, schools, status, last_seen, followers_count, common_count, ' +
            'occupation, nickname, relatives, relation, personal, connections, exports, activities, interests, ' +
            'music, movies, tv, books, games, about, quotes, can_post, can_see_all_posts, can_see_audio, ' +
            'can_write_private_message, can_send_friend_request, is_favorite, is_hidden_from_feed, timezone, ' +
            'screen_name, maiden_name, crop_photo, is_friend, friend_status, career, military, blacklisted, ' +
            'blacklisted_by_me, can_be_invited_group',
        name_case: 'Nom',
        v: 5.122
    };

    call('users.get', params) // https://vk.com/dev/users.get
        .then((response) => {
            if (response) resolve(response.response);
        }).catch((err) => reject(err));

});

// Получаем все фотографии из альбома
const getPhotosFromVk = (groupObj) => new Promise((resolve, reject) => {
    store.dispatch(CheckerSetStatusStringAction('- получение всех фотографий из альбома ВК...'));

    const {owner_id, album_id} = groupObj;
    const params = {
        owner_id,
        album_id,
        // photo_ids: ,
        rev: 1,
        extended: 1,
        // feed_type: '',
        // feed: '',
        photo_sizes: 1,
        offset: 0,
        count: 1000,
        v: 5.107
    };

    call('photos.get', params) // https://vk.com/dev.php?method=photos.get
        .then((response) => {
            if (response.response.items) resolve(response.response.items);
            if (!response.response.items) reject('* 0 photos *')
        }).catch((err) => reject(err))
});

// Получаем комментарии
const getCommentsFromVk = (photoObj) => new Promise((resolve, reject) => {
    store.dispatch(CheckerSetStatusStringAction('- получение всех комментариев из фотографии ВК...'));

    const {owner_id, photo_id} = photoObj;
    const params = {
        owner_id,
        photo_id,
        need_likes: 1,
        // start_comment_id: ,
        offset: 0,
        count: 100,
        sort: 'desc',
        // access_key: ,
        extended: 1,
        fields: 'photo_id, verified, sex, bdate, city, country, home_town, has_photo, photo_50, photo_100, ' +
            'photo_200_orig, photo_200, photo_400_orig, photo_max, photo_max_orig, online, lists, domain, ' +
            'has_mobile, contacts, site, education, universities, schools, status, last_seen, followers_count, ' +
            'common_count, occupation, nickname, relatives, relation, personal, connections, exports, ' +
            'wall_comments, activities, interests, music, movies, tv, books, games, about, quotes, can_post, ' +
            'can_see_all_posts, can_see_audio, can_write_private_message, can_send_friend_request, is_favorite, ' +
            'is_hidden_from_feed, timezone, screen_name, maiden_name, crop_photo, is_friend, friend_status, ' +
            'career, military, blacklisted, blacklisted_by_me',
        v: 5.107
    };

    call('photos.getComments', params) // https://vk.com/dev/photos.getComments
        .then((response) => {
            if (response.response.items.length) {
                console.log('response.items ', response.response.items);
                resolve([...response.response.items, photo_id])
            } else {
                reject()
            }
        }).catch((err) => {
        reject(err)
    })
});


// Получаем подробную информацию о группе
const getGroupInfoFromVk = (group_id) => new Promise((resolve, reject) => {
    store.dispatch(CheckerSetStatusStringAction('- получение информации о группе ВК...'));

    if (group_id < 0) {
        reject('Group not found')
    }

    const params = {
        group_ids: group_id, // список групп
        group_id: group_id, // одна группа (id или имя)
        fields: 'city, country, place, description, wiki_page, market, members_count, counters, start_date, ' +
            'finish_date, can_post, can_see_all_posts, activity, status, contacts, links, fixed_post, verified, ' +
            'site, ban_info, cover',
        v: 5.107
    };

    call('groups.getById', params) // https://vk.com/dev/groups.getById
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
        v: 5.107
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
    store.dispatch(CheckerSetStatusStringAction('- получение всех альбомов пользователя из ВК...'));

    const {owner_id} = obj;

    const params = {
        owner_id,
        // album_ids: ,
        offset: 0,
        count: 1000,
        need_system: 0,
        need_covers: 1,
        photo_sizes: 1,
        v: 5.107
    };

    try {
        call('photos.getAlbums', params) // https://vk.com/dev/photos.getAlbums
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
