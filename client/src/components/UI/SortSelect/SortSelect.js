import React from 'react';
import {setSortItemsSelect} from '../../../redux/actions/list.actions';
import {useDispatch, useSelector} from 'react-redux';
import './sortSelect.style.scss';

const SortSelect = () => {
    const dispatch = useDispatch();
    const sort = useSelector(state => state.list.sort);

    const dispatchSetSortSelect = (event) => {
        const sort = +event.target.value;
        dispatch(setSortItemsSelect(sort));
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
