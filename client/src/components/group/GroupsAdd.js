import React, {Fragment, useState} from 'react';
import Spinner from '../spinner';
import store from '../../redux/store';
import {asyncAddGroup} from '../../redux/actions/group.actions';
import {useDispatch} from 'react-redux';

import './groups.style.scss';

const GroupsAdd = () => {
    const [group_id, setGroupId] = useState('');
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const handleChange = (event) => {
        event.preventDefault();
        setGroupId(event.target.value);
    };

    const dispatchBtnAction = (event) => {
        event.preventDefault();
        setLoading(true);

        dispatch(asyncAddGroup(group_id));

        setGroupId('');
        setLoading(false);
    };

    store.subscribe(() => {
        const state = store.getState();
        // console.info('state ', state);
    });

    return (
        loading
            ? <Spinner/>
            : (<Fragment>
                <div className='group-add'>
                    <p
                        className='group-add__text'
                        aria-label='Введите группу'
                    >
                        Введите группу
                    </p>
                    <input
                        className='group-add__input'
                        aria-label='Значение группы'
                        placeholder='https://vk.com/group'
                        disabled={loading}
                        value={group_id}
                        onChange={(event) => handleChange(event)}
                    />
                    <button
                        className='group-add__button'
                        aria-label='Добавить группу'
                        disabled={loading}
                        onClick={dispatchBtnAction}
                    >
                        Добавить
                    </button>

                </div>
            </Fragment>));
};

export default GroupsAdd;
