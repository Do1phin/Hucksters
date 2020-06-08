import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setMemberStatusSelect} from '../../../redux/actions/listSettings.actions';
import './statusSelect.style.scss';

const StatusSelect = () => {

    const dispatch = useDispatch();

    const status = useSelector(state => state.list_settings.member_status);

    const dispatchSetStatusSelect = (event) => {
        const status = event.target.value;
        dispatch(setMemberStatusSelect(status));
    };

    return (
        <div className='status-select'>
            <label></label>
            <select
                value={status}
                onChange={dispatchSetStatusSelect}
            >
                <option value='all'>все пользователи</option>
                <option value='seller'>продавцы</option>
                <option value='closed'>скрытые</option>
                <option value='banned'>забаненные</option>
                <option value='deleted'>удалённые</option>
            </select>
        </div>
    );
};

export default StatusSelect;
