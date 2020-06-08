// Core
import React, {createRef} from 'react';
import {useDispatch} from 'react-redux';
// Redux actions
import {
    ListSettingsSetFetchedPartItemsAction,
    ListSettingsSetItemsToSkipAction,
    ListSettingsSetTotalLoadedItemsAction
} from '../../redux/actions/listSettings.actions';
import {SearchStringUpdateAsyncAction} from './search.actions';
// Styles
import '../../styles/search.style.scss';

const SearchContainer = () => {

    const dispatch = useDispatch();

    const searchInput = createRef();
    let text;

    const handleChange = (event) => {
        text = event.target.value;

        if (event.key === 'Enter' && text) {
            handleSubmit(text);
        }
    };

    const handleSubmit = (text) => {
        if (text) {
            dispatch(ListSettingsSetItemsToSkipAction(0));
            dispatch(ListSettingsSetFetchedPartItemsAction(0));
            dispatch(ListSettingsSetTotalLoadedItemsAction(0));
            dispatch(SearchStringUpdateAsyncAction(text));
        }
    };

    const handleClear = () => {

        searchInput.current.value = '';
        dispatch(SearchStringUpdateAsyncAction(''));
    };

    return (
        <div className='search-block'>
            <div className='search-block__input'>
                <input
                    placeholder='Я ищу...'
                    value={text}
                    ref={searchInput}
                    onKeyPress={handleChange}
                />

                <button className='search-block__search-form-clear'
                        onClick={handleClear}
                >
                    X
                </button>
                <button className='search-block__search-button'
                        onClick={handleSubmit}
                >
                    Найти
                </button>
            </div>
        </div>
    );
};

export default SearchContainer;
