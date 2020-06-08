// Core
import React, {Fragment} from 'react';
// VK API
import {call, getMembersGroupFromVk, getMembersInfoFromVk} from '../admin/_api-vk';
// API
import { APICreateMembersToDB, APIUpdateMembersInDB} from '../../containers/Members/members.api';
// React components
import GetAlbums from '../admin/GetAlbums';

const CheckGroup = () => {
    // const group_id = 39284544;
    const getAllMembers = async (group_id) => {
        try {
            const members = await call('groups.getMembers', {group_id: group_id, v: 5.9});
            const membersSize = await members.count;

            let count = 0;
            await (function f() {
                console.info(`Step ${count} from ${membersSize / 1000}`);
                if (count < Math.ceil(membersSize / 1000)) {

                    const obj = {group_id, count};

                    Promise.resolve(obj)
                        .then(getMembersGroupFromVk)
                        .then(APICreateMembersToDB)
                        .then(getMembersInfoFromVk)
                        .then(APIUpdateMembersInDB)
                        .catch((err) => console.error(err));

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

    console.log(typeof getAllMembers);

    return (
        <Fragment>
            <GetAlbums/>
        </Fragment>
    )
};

export default CheckGroup;
