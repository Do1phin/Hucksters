import React, {Fragment} from "react";
import {delGroupFromDb} from './api-group.js';

const GroupCard = (props) => {
    const {photo, name, groupId, size} = props.item;
    console.log('item ', props)

    const handleRemoveBtn = async (event) => {
        const groupId = event.target.id;
        const newGroups = await props.groups.filter((item) => !item.groupId);
        props.refreshFunc(newGroups)
    };

    return (
        <Fragment>
            <div className='group-add_photo'>
                <img src={photo} alt={name}/>
            </div>
            <div className='group-add_id'>
                {groupId}
            </div>

            <div className='group-add_name'>
                {name}
            </div>

            <div className='group-add_size'>
                {size}
            </div>

            <div className='group-add_actions'>
                <button>
                    Обновить данные
                </button>
                <button id={groupId}
                        onClick={handleRemoveBtn}
                        // groupId={groupId}
                        // groups={props.groups}
                        // refreshFunc={props.refreshFunc}
                >
                    Удалить группу
                </button>
            </div>
        </Fragment>
    )
};

export default GroupCard;
