// Core
import React, {Fragment, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import store from '../../redux/store';
// Redux actions
import {asyncAddGroup} from '../../containers/Groups/groups.actions';
import {loading} from '../../redux/actions/generalSettings.actions';
// React components
import Spinner from '../Spinners/GeneralSpinner';
// Styles
import '../../styles/groups.style.scss';

const GroupAdd = () => {

    let text;

    const group_id = useSelector(state => state.groups.group_id);
    const general_settings = useSelector(state => state.general_settings);

    const dispatch = useDispatch();

    const handleChange = (event) => {
        // event.preventDefault();
        text = event.target.value;
    };

    const dispatchBtnAction = (event) => {
        event.preventDefault();

        dispatch(loading(true));

        dispatch(asyncAddGroup(text));
        text = '';

        dispatch(loading(false));
    };

    store.subscribe(() => {
        const state = store.getState();
        // console.info('state ', state);
    });

    return (
        general_settings.loading
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
                        disabled={general_settings.loading}
                        value={text}
                        onChange={(event) => handleChange(event)}
                    />
                    <button
                        className='group-add__button'
                        aria-label='Добавить группу'
                        disabled={general_settings.loading}
                        onClick={dispatchBtnAction}
                    >
                        Добавить
                    </button>

                </div>
            </Fragment>));
};

export default GroupAdd;
