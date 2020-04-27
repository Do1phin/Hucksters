import React, {Fragment} from "react";
import {call, getMembersGroupFromVk, getMembersInfoFromVk} from "../admin/api-vk";
import {createMembersToDB, updateMembersInDB} from '../seller/api-seller';
import SellerCheckAlbumAccess from "../admin/SellerCheckAlbumAccess";

const GroupsCheck = () => {
    // const [data, setData] = useState(null);

    // получаем всех пользователей группы
    const groupId = 115050558;
    const getAllMembers = async (groupId) => {
        try {
            const members = await call('groups.getMembers', {group_id: groupId, v: 5.9});
            const membersSize = await members.count;

            let count = 0;
            await (function f() {
                console.info(`Step ${count} from ${membersSize / 1000}`);
                if (count < Math.ceil(membersSize / 1000)) {

                    const obj = {groupId: groupId, count};

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

    const test = () => {
        console.log('membersinfo ', );
        console.log('members ', );
    };

    return (
        <Fragment>
            проверка групп<br/>
            <button
                onClick={getAllMembers}
            >
                Загрузить пользователей группы
            </button>

            <br/><br/>

            <SellerCheckAlbumAccess/>

            <button
            onClick={test}
            >
            TEST
        </button>
        </Fragment>
    )
};

export default GroupsCheck;