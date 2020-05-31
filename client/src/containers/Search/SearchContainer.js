// Core
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
// Redux-actions
import {setSkipItemsNumber, setPartItems, setTotalItems} from '../../redux/actions/listSettings.actions';
import {updateSearchString} from './search.actions';
// Styles
import '../../styles/search.style.scss';

const SearchContainer = () => {

    const dispatch = useDispatch();
    const list = useSelector(state => state.list);

    let text;

    const handleSubmit = (event) => {
        const text = event.target.value;

        if (event.key === 'Enter') {
            dispatch(setSkipItemsNumber(0));
            dispatch(setPartItems(0));
            dispatch(setTotalItems(0));
            dispatch(updateSearchString(text));
        }
    };

    return (
        <div className='search-block'>
            <div className='search-block__input'>
                <input
                    placeholder='Искать ...'
                    value={text}
                    onKeyPress={handleSubmit}
                />
            </div>
        </div>
    );
};

export default SearchContainer;
