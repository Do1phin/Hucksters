import {call} from "../admin/api-vk";

const groupList = (params) => {
    const url = '/vk/group/list';

    try {
        return fetch(url, {
            method: "GET"
        })
            .then((res) => {
                return res.json()
            })
            .catch((error) => {
                console.log('Error -> ', error);
            });

    } catch (e) {
        throw new Error(e);
    }
};

const groupCreate = (params) => {
    const url = '/vk/group/add';

    const {id, name, size, photo_50} = params;

    const body = {
        groupId: +id,
        name,
        size,
        photo: photo_50
    };

    try {
        return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then((res) => {
                return res.json()
            })
            .catch((error) => {
                console.error('Error -> ', error);
            })
    } catch (e) {
        throw new Error(e);
    }
};

const getGroupInfo = (groupId) => new Promise((resolve, reject) => {
    const params = {
        group_id: groupId,
        fields: 'city, country, place, description, wiki_page, market, members_count, counters, start_date, ' +
            'finish_date, can_post, can_see_all_posts, activity, status, contacts, links, fixed_post, verified, ' +
            'site, ban_info, cover',
        v: 5.120
    };

    call('groups.getById', params)
        .then((result) => {
            if (!result) {
                reject('No group info');
            }
            resolve({...result[0]});
        })
        .catch((error) => {
            console.error('Error -> ', error);
            reject(error)
        })
});

const getGroupSize = (groupObj) => new Promise((resolve, reject) => {
    const params = {
        group_id: groupObj.id,
        v: 5.103
    };

    call('groups.getMembers', params)
        .then((result) => {
            if (!result) {
                reject('No group size');
            }
            groupObj['size'] = +result.count;
            resolve({groupObj});
        })
        .catch((error) => {
            console.error('Error -> ', error);
            reject(error)
        })
});

export {
    getGroupInfo,
    getGroupSize,
    groupList,
    groupCreate
};
