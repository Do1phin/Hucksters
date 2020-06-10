// Core
import React, {Fragment} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {store} from '../../redux/store';
import PropTypes from 'prop-types';
// React components
import {CheckGroup} from '../../containers/CheckGroup/CheckGroup';
// Redux actions
import { GroupDeleteAsyncSagaAction, GroupInfoUpdateAsyncAction, } from '../../containers/Groups/groups.actions';
import { GroupMembersGetAsyncAction } from '../../containers/CheckGroup/checkGroup.actions';
import {loadingStart, loadingStop} from '../../redux/actions/generalSettings.actions';
// Redux-saga watchers
import {watchDeleteGroup} from '../../redux/saga/watchers';

const GroupCard = (props) => {

    const {item} = props;
    const {photo, name, group_id, size} = item;

    const dispatch = useDispatch();

    const general_settings = useSelector(state => state.general_settings);
    const checker = useSelector(state => state.checker);
    const groups = useSelector(state => state.groups);

    const dispatchRemoveBtn = (event) => {
        const group_id = +event.target.id;
        // dispatch(asyncDeleteGroup(group_id));
        // dispatch(asyncDeleteGroup(group_id)); // thunk
        GroupDeleteAsyncSagaAction(group_id);
    };

    const dispatchRefreshInfoBtn = (event) => {
        const group_id = +event.target.id;

        dispatch(loadingStart());
        dispatch(GroupInfoUpdateAsyncAction(group_id));
        dispatch(loadingStop());
    };

    const dispatchGetMembersBtn = (event) => {
        const group_id = +event.target.id;

        dispatch(GroupMembersGetAsyncAction(group_id));
    };

    store.subscribe(() => {
        // const state = store.getState();
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

           <CheckGroup/>

            <div className='group-list__item-actions'>
                <button className='group-list__item-actions-refresh'
                        id={group_id}
                        disabled={general_settings.loading}
                        aria-label='Обновить данные группы'
                        onClick={dispatchRefreshInfoBtn}
                >
                    Обновить данные
                </button>
                <button className='group-list__item-actions-delete'
                        id={group_id}
                        disabled={general_settings.loading}
                        aria-label='Удалить группу'
                        onClick={dispatchRemoveBtn}
                >
                    Удалить группу
                </button>
                <button className='group-list__item-actions-load'
                        id={group_id}
                        disabled={general_settings.loading}
                        aria-label='Загрузить пользователей группы'
                        onClick={dispatchGetMembersBtn}
                >
                    Загрузить пользователей
                </button>

            </div>
        </Fragment>
    );
};

export default GroupCard;

GroupCard.propTypes = {
    item: PropTypes.object.isRequired,
};
