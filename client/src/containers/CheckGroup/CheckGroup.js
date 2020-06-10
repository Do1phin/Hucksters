// Core
import React, { Fragment } from 'react';
import {useDispatch, useSelector} from 'react-redux';

const CheckGroup = () => {

    const dispatch = useDispatch();

    const checker = useSelector(state => state.checker);
    const check_groups = useSelector(state => state.check_groups);

    return (
        <Fragment>
            <div className='group-list__status'>
                {/*{group_id !== groups.group_id ? 1 : 2}*/}
                <span>Проверяем {checker.step} из {check_groups.group_size}</span>
                <span>Статус: {checker.status}</span>
                {checker.status}
            </div>
        </Fragment>
    );
};

export {
    CheckGroup
};
