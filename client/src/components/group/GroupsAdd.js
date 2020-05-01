import React, {Fragment, useState} from "react";
import Spinner from "../spinner";
import {createGroupInDB} from "./_api-group";
import {getGroupInfoFromVk, getGroupSizeFromVk} from '../admin/_api-vk';
import GroupsList from "./GroupsList";

// import './group.style.css';

const GroupsAdd = () => {
    const [groupId, setGroupId] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        event.preventDefault();
        setGroupId(event.target.value);
    };

    const handleGroupAddBtn = async (event) => {
        event.preventDefault();
        setLoading(true);
        Promise.resolve(groupId)
            .then(getGroupInfoFromVk)
            .then(getGroupSizeFromVk)
            .then(createGroupInDB);
        // props.refreshFunc()
        setGroupId('');
        setLoading(false);
    };

    // const isDisabled = props.groups.some((item) => item.groupId === +groupId);

    return (
        loading
            ? <Spinner/>
            : (<Fragment>
                <div className='group-add'>
                    <div className='group-add_input'>
                        <span>Введите id группы</span>
                        <input
                            value={groupId}
                            type='number'
                            onChange={(event) => handleChange(event)}
                        />
                        <button
                            disabled={loading}
                            onClick={(event) => handleGroupAddBtn(event)}
                        >
                            Добавить
                        </button>
                    </div>
                </div>
            </Fragment>))
};

export default GroupsAdd;
