// Core
import React, {Fragment, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { store } from '../../redux/store';
import PropTypes from 'prop-types';
// Redux actions
import { GroupDeleteAsyncAction, GroupInfoUpdateAsyncAction, GroupMembersGetAsyncAction, GroupDeleteAsyncSagaAction, GroupDeleteAction} from '../../containers/Groups/groups.actions';

// Redux-saga watchers
import {watchDeleteGroup} from '../../redux/saga/watchers';

const GroupCard = (props) => {

    const {item} = props;
    const {photo, name, group_id, size} = item;

    const [loading, setLoading] = useState(false);

    const general_settings = useSelector(state => state.general_settings);
    const checker = useSelector(state => state.checker);
    const groups = useSelector(state => state.groups);

    const dispatch = useDispatch();

    const dispatchRemoveBtn = (event) => {
        const group_id = +event.target.id;
        // dispatch(asyncDeleteGroup(group_id));
        // dispatch(asyncDeleteGroup(group_id)); // thunk
        GroupDeleteAsyncSagaAction(group_id);
    };

    const dispatchRefreshInfoBtn = (event) => {
        setLoading(true);
        dispatch()
        const group_id = +event.target.id;
        dispatch(GroupInfoUpdateAsyncAction(group_id));
        setLoading(false);
    };

    const dispatchGetMembersBtn = (event) => {
        const group_id = +event.target.id;
        dispatch(GroupMembersGetAsyncAction(group_id));
    };

    store.subscribe(() => {
        const state = store.getState();
        // console.info('state ', state);
    });

    return (
        <Fragment>
            <div className='group-list__item-info'>
                <div className='group-list__item-info-photo'>
                    <img src={photo} alt={name}/>
                </div>
                <div className='group-list__item-info-id'>
                    {group_id}
                </div>

                <div className='group-list__item-info-name'>
                    {name}
                </div>

                <div className='group-list__item-info-size'>
                    {size}
                </div>
            </div>
            <div className='group-list__status'>
                { group_id !== groups.group_id ? 1 : 2}
                <span>Проверяем {checker.step} из {size}</span>
                <span>Статус: {checker.status}</span>
            </div>

            <div className='group-list__item-actions'>
                <button
                    className='group-list__item-actions-refresh'
                    id={group_id}
                    disabled={loading}
                    aria-label='Обновить данные группы'
                    onClick={dispatchRefreshInfoBtn}
                >
                    Обновить данные
                </button>
                <button
                    className='group-list__item-actions-delete'
                    id={group_id}
                    disabled={general_settings.loading}
                    aria-label='Удалить группу'
                    onClick={dispatchRemoveBtn}
                >
                    Удалить группу
                </button>
                <button
                    className='group-list__item-actions-load'
                    id={group_id}
                    disabled={general_settings.loading}
                    aria-label='Получить пользователей группы'
                    onClick={dispatchGetMembersBtn}
                >
                    Получить пользователей
                </button>
                {checker.status}
            </div>
        </Fragment>
    );
};

export default GroupCard;

GroupCard.propTypes = {
    item: PropTypes.object.isRequired,
};
