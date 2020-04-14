import React, {Fragment} from 'react';
import {getGroupMembers} from "./api-vk";

const VkAdmin = () => {
    return (
        <Fragment><br/>
            <button
                onClick={getGroupMembers}
            >
                Загрузить пользователей группы
            </button>
        </Fragment>
    )
};

export default VkAdmin;
