// Core
import React, {Fragment} from 'react';
// VK API
import {call, getMembersGroupFromVk, getMembersInfoFromVk} from '../admin/_api-vk';
// API
import {createMembersToDB, updateMembersInDB} from '../../containers/Members/members.api';
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
                        .then(createMembersToDB)
                        .then(getMembersInfoFromVk)
                        .then(updateMembersInDB)
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

    return (
        <Fragment>
            <GetAlbums/>
        </Fragment>
    )
};

export default CheckGroup;
