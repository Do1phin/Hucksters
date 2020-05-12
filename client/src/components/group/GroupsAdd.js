import React, {Fragment, useState} from "react";
import Spinner from "../spinner";
import {createGroupInDB} from "./_api-group";
import {getGroupInfoFromVk, getGroupSizeFromVk} from '../admin/_api-vk';

// import './groups.style.scss';

const GroupsAdd = () => {
    const [group_id, setGroupId] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        event.preventDefault();
        setGroupId(event.target.value);
    };

    const handleGroupAddBtn = async (event) => {


        event.preventDefault();
        setLoading(true);
        Promise.resolve(group_id)
            .then(() => {
                let pos = group_id.indexOf('://');
                if (pos !== -1) {
                    return group_id.substr(pos + 10);
                }
                return group_id
            }).then(getGroupInfoFromVk)
            .then(getGroupSizeFromVk)
            .then(createGroupInDB);
        // props.refreshFunc()
        setGroupId('');
        setLoading(false);
    };

    return (
        loading
            ? <Spinner/>
            : (<Fragment>
                <div className='group-add'>
                    <p
                        className='group-add__text'
                        aria-label='Введите группу'
                    >
                        Введите id группы
                    </p>
                    <input
                        className='group-add__input'
                        aria-label='Значение группы'
                        placeholder='https://vk.com/group1'
                        disabled={loading}
                        value={group_id}
                        onChange={(event) => handleChange(event)}
                    />
                    <button
                        className='group-add__button'
                        aria-label='Добавить группу'
                        disabled={loading}
                        onClick={(event) => handleGroupAddBtn(event)}
                    >
                        Добавить
                    </button>

                </div>
            </Fragment>))
};

export default GroupsAdd;
