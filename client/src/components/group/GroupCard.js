import React, {Fragment, useState} from "react";
import {getGroupInfoFromVk, getGroupSizeFromVk} from '../admin/_api-vk.js';
import {updateGroupInfoInDB, delGroupFromDB} from './_api-group.js';
import SpinnerItem from "../spinner-item";
import {call, getMembersGroupFromVk, getMembersInfoFromVk} from "../admin/_api-vk";
import {createMembersToDB, updateMembersInDB} from "../seller/_api-seller";

const GroupCard = (props) => {
    const [loading, setLoading] = useState(false);

    const {photo, name, group_id, size} = props.item;
    // console.log('item ', props)

    const handleRemoveBtn = async (event) => {
        const groupId = event.target.id;
        delGroupFromDB(group_id);
        props.refreshFunc(props.groupsCount - 1)
    };

    const handleRefreshInfoBtn = (event) => {
        setLoading(true);
        const group_id = +event.target.id;
        Promise.resolve(group_id)
            .then(getGroupInfoFromVk)
            .then(getGroupSizeFromVk)
            .then(updateGroupInfoInDB);

        setLoading(false);
    };


    const getAllMembers = async (group_id) => {
        try {
            const members = await call('groups.getMembers', {group_id: group_id, v: 5.9});
            const membersSize = await members.response.count;

            let count = 0;
            await (function f() {
                console.info(`Step ${count} from ${membersSize / 1000}`);
                if (count < Math.ceil(membersSize / 1000)) {

                    const obj = {group_id: group_id, count};
                    Promise.resolve(obj)
                        .then(getMembersGroupFromVk)
                        .then(createMembersToDB)
                        .then(getMembersInfoFromVk)
                        .then(updateMembersInDB)
                        .catch((err) => console.error(err));

                    count++;
                    setTimeout(f, 150000);
                } else {
                    console.log('All members added');
                }
            }());

        } catch (e) {
            throw new Error(e)
        }
    };

    const handleGetMembersBtn = (event) => {
        const group_id = +event.target.id;
        getAllMembers(group_id)
    };

    const Card = () => {
        return (
            <Fragment>
                <div className='group-add_photo'>
                    <img src={photo} alt={name}/>
                </div>
                <div className='group-add_id'>
                    {group_id}
                </div>

                <div className='group-add_name'>
                    {name}
                </div>

                <div className='group-add_size'>
                    {size}
                </div>

                <div className='group-add_actions'>
                    <button
                        id={group_id}
                        onClick={(event) => handleRefreshInfoBtn(event)}
                    >
                        Обновить данные
                    </button>
                    <button
                        id={group_id}
                        onClick={(event) => handleRemoveBtn(event)}
                    >
                        Удалить группу
                    </button>
                    <button
                        id={group_id}
                        onClick={(event) => handleGetMembersBtn(event)}
                    >
                        Получить пользователей
                    </button>
                </div>
            </Fragment>
        )
    };

    const Content = () => {
        return loading ? <SpinnerItem/> : <Card/>
    };

    return (
        <Content/>
    )
};

export default GroupCard;
