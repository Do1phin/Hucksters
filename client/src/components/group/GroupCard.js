import React, {Fragment} from "react";

const GroupCard = (item) => {


    return (
        <Fragment>
            <div className='group-add_photo'>
                <img src={item.photo} alt={item.name}/>
            </div>
            <div className='group-add_id'>
                {item.groupId}
            </div>

            <div className='group-add_name'>
                {item.name}
            </div>

            <div className='group-add_size'>
                {item.size}
            </div>

            <div className='group-add_actions'>
                <button>
                    Обновить данные
                </button>
                <button id={item.groupId}
                        // onClick={handleRemoveBtn}
                >
                    Удалить группу
                </button>
            </div>
        </Fragment>
    )
};

export default GroupCard;
