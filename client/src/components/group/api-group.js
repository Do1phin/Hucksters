import {call} from "../admin/api-vk";

const groupList = (params) => {
    try {
        return fetch('/vk/group/list', {
            method: "GET"
        }).then((response) => {
            return response.json()
        }).catch((err) => console.error(err));
    } catch (e) {
        throw new Error(e);
    }
};

const groupCreate = (params) => {
    const {id, name, size, photo_50} = params;
    const body = {
        groupId: +id,
        name,
        size,
        photo: photo_50
    };

    try {
        return fetch('/vk/group/add', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then((response) => {
            return response.json()
        }).catch((err) => console.error(err))
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
            if (!result) reject('No group info');
            resolve({...result[0]});
        }).catch((err) => {
        console.error('Error -> ', err);
        reject(err)
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
        }).catch((err) => {
        console.error('Error -> ', err);
        reject(err)
    })
});

const delGroupFromDb = (props) => {
    console.log('props ', props)
    const {groupId} = props;
    const newGroups = props.groups.filter((item) => !item.groupId);

    try {
        fetch('/vk/group/remove', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({groupId})
        }).then((response) => {
            return response.json()
        }).catch((err) => console.log(err))
    } catch (e) {
        throw new Error(e)
    }
    props.setGroups(newGroups);
};

export {
    getGroupInfo,
    getGroupSize,
    groupList,
    groupCreate,
    delGroupFromDb
};
