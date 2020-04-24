import React, {Fragment} from "react";
import {call} from "../admin/api-vk";

const GroupsCheck = () => {
    // const [data, setData] = useState(null);

    // получаем всех пользователей группы
    const getAllMembers = async () => {
        try {

            const members = await call('groups.getMembers', {group_id: 115050558, v: 5.9});
            const membersSize = await members.count;

            let count = 0;
            await (function f() {
                console.info(`Step ${count} from ${membersSize/1000}`);
                if (count < Math.ceil(membersSize / 1000)) {

                    Promise.resolve(count)
                        .then(getMembers)
                        .then(createMembersInDB)
                        .then(getMembersInfo)
                        .then(updateMembersInDB);

                    count++;
                    setTimeout(f, 60000);
                } else {
                    console.log('All members added');
                }
            }());

        } catch (e) {
            throw new Error(e)
        }
    };

    // получаем всех пользователей группы
    const getMembers = (count) => new Promise((resolve, reject) => {
        console.info('1. Get members [start]');
        const params = {
            group_id: 115050558,
            sort: 'id_asc',
            count: 1000,
            offset: count * 1000,
            v: 5.9
        };
        const members = call('groups.getMembers', params);

        members
            .then((result) => {
                console.log('1. Members ', members);
                if (!result) reject('пусто');
                setTimeout(() => {console.log('members pause')}, 5000);
                resolve(members);
            });
        console.info('1. Get members [finish]');
    });

    // получаем подробную информацию по пользователям
    const getMembersInfo = (members) => new Promise((resolve, reject) => {
        console.info('3. Get members info [start]');

        let ids = members.items.join();

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
        const membersWithInfo = call('users.get', params);

        membersWithInfo
            .then((result) => {
                console.log('membersWithInfo ', membersWithInfo);
                if (!result) reject('пусто');
                setTimeout(() => {console.log('members info pause')}, 5000);
                resolve(membersWithInfo);
            });
        console.info('3. Get members info [finish]');
    });

    // добавить аккаунты в базу данных
    const createMembersInDB = (members) => new Promise((resolve, reject) => {
        console.info('2. Create members in DB [start]');

        const body = {source: members.items};

        try {

            fetch(
                './sellers/add', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body)
                })
                .then(res => {
                    if (!res.ok) return console.log(`Error: status(${res.status}), text - "${res.statusText}"`);
                    console.log(`Success: status(${res.status}), text - "${res.statusText}"`);
                    setTimeout(() => {console.log('create members pause')}, 5000);
                    resolve(members)
                })

        } catch (e) {
            console.log('ERROR: ', e);
            reject(e);
        }
        console.info('2. Create members in DB [finish]');
    });


    // обновить в базе информацию аккаунта (только общая инфа)
    const updateMembersInDB = (membersWithInfo) => new Promise((resolve, reject) => {
        console.info('4. Update members info in DB [start]');

        membersWithInfo.map((item) => {
            try {
                const body = item;
                fetch(
                    './sellers/update', {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(body)
                    })
                    .then((res) => res.json())
                    .then((data) => {
                        // console.log('data - ', data);
                    })
            } catch (e) {
                console.log('ERROR: ', e);
                reject(e)
            }
            return null
        });
        console.log('Members added');
        setTimeout(() => {console.log('update members pause')}, 5000);
        resolve('Members added');
        console.info('4. Update members info in DB [finish]');
    });

    return(
        <Fragment>
            проверка групп<br />
            <button
                onClick={getAllMembers}
            >
                Загрузить пользователей группы
            </button><br />
        </Fragment>
    )
};

export default GroupsCheck;
