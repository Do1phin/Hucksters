import React, {Fragment} from "react";
import {call, getMembersGroupFromVk, getMembersInfoFromVk} from "../admin/_api-vk";
import {createMembersToDB, updateMembersInDB} from '../seller/_api-seller';
import SellerCheckAlbumAccess from "../admin/SellerCheckAlbumAccess";

const GroupsCheck = () => {
    // const [data, setData] = useState(null);

    // получаем всех пользователей группы
    // const group_id = 115050558;
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

    const test = () => {
        console.log('membersinfo ',);
        console.log('members ',);
    };

    return (
        <Fragment>
            <div className='get-all-members'>
                <button
                    onClick={getAllMembers}
                >
                    Загрузить пользователей группы
                </button>

                <br/><br/>

                <button
                    onClick={test}
                >
                    TEST
                </button>
            </div>
            <SellerCheckAlbumAccess/>
        </Fragment>
    )
};

export default GroupsCheck;
