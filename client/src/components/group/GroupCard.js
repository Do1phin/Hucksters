import React, {Fragment, useState} from "react";
import PropTypes from 'prop-types';
import SpinnerItem from "../spinner-item";
import {useDispatch, useSelector} from "react-redux";
import {asyncDeleteGroup, asyncUpdateGroupInfo, asyncGetGroupMembers} from "../../redux/actions/group.actions";
import store from "../../redux/store";


const GroupCard = ({item}) => {
    const [loading, setLoading] = useState(false);
    // const [actionStatus] = useState('');
    // const [checkCount] = useState(0);

    const dispatch = useDispatch();
    const checkInfo = useSelector(state => state.checker);

    const {photo, name, group_id, size} = item;

    const dispatchRemoveBtn = (event) => {
        const group_id = +event.target.id;
        dispatch(asyncDeleteGroup(group_id))
    };

    const dispatchRefreshInfoBtn = (event) => {
        setLoading(true);
        const group_id = +event.target.id;
        dispatch(asyncUpdateGroupInfo(group_id));
        setLoading(false);
    };

    const dispatchGetMembersBtn = (event) => {
        const group_id = +event.target.id;
        dispatch(asyncGetGroupMembers(group_id))
    };

    store.subscribe(() => {
        const state = store.getState();
        console.info('state ', state);
    });

    const Card = () => {
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
                    <span>Проверяем {checkInfo.step} из {size}</span>
                    <span>Статус: {checkInfo.status}</span>
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
                        disabled={loading}
                        aria-label='Удалить группу'
                        onClick={dispatchRemoveBtn}
                    >
                        Удалить группу
                    </button>
                    <button
                        className='group-list__item-actions-load'
                        id={group_id}
                        disabled={loading}
                        aria-label='Получить пользователей группы'
                        onClick={dispatchGetMembersBtn}
                    >
                        Получить пользователей
                    </button>
                    {checkInfo.status}
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

GroupCard.propTypes = {
    item: PropTypes.object.isRequired,
};

export default GroupCard;
