// Core
import React, {Fragment} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {store} from '../../redux/store';
// Redux actions
import {GroupAddAsyncAction} from '../../containers/Groups/groups.actions';
import {loadingStart, loadingStop} from '../../redux/actions/generalSettings.actions';
// React components
import Spinner from '../Spinners/GeneralSpinner';
// Styles
import '../../styles/groups.style.scss';

const GroupAdd = () => {

    const dispatch = useDispatch();

    const general_settings = useSelector(state => state.general_settings);
    // const group_id = useSelector(state => state.groups.group_id);

    let text;

    const handleChange = (event) => {
        // event.preventDefault();
        text = event.target.value;
    };

    const dispatchBtnAction = (event) => {
        event.preventDefault();

        dispatch(loadingStart());
        dispatch(GroupAddAsyncAction(text));
        text = '';
        dispatch(loadingStop());
    };

    store.subscribe(() => {
        // const state = store.getState();
        // console.info('state ', state);
    });

    return (
        general_settings.loading
            ? <Spinner/>
            : (
                <Fragment>
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
                </Fragment>
            ));
};

export default GroupAdd;
