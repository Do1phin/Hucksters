import React from 'react';
import {ListSettingsSetSortTypeAction} from '../../../redux/actions/listSettings.actions';
import {useDispatch, useSelector} from 'react-redux';
import './sortSelect.style.scss';

const SortSelect = () => {

    const dispatch = useDispatch();

    const sort = useSelector(state => state.list_settings.sort);

    const dispatchSetSortSelect = (event) => {
        const sort = +event.target.value;
        dispatch(ListSettingsSetSortTypeAction(sort));
    };

    return (
        <div className='sort-select'>
            <select
                value={sort}
                onChange={dispatchSetSortSelect}
            >
                <option value={-1}>от новых к старым</option>
                <option value={1}>от старым к новым</option>
            </select>
        </div>
    );
};

export default SortSelect;
