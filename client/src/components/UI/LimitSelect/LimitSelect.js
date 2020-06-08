import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ListSettingsSetItemsLimitAction} from '../../../redux/actions/listSettings.actions';
import './limitSelect.style.scss';

const LimitSelect = () => {

    const dispatch = useDispatch();

    const limit = useSelector(state => state.list_settings.limit);

    const dispatchSetLimitSelect = (event) => {
        const limit = +event.target.value;
        dispatch(ListSettingsSetItemsLimitAction(limit));
    };

    return (
        <div className='limit-select'>
            <label>Выводить по - </label>
            <select
                value={limit}
                onChange={dispatchSetLimitSelect}
            >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
            </select>
        </div>
    );
};

export default LimitSelect;
