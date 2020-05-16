import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {setSearchTextString, setSkipItemsNumber, setPartItems, setTotalItems} from "../../redux/actions/list.actions";
import './search.style.scss';

const Search = () => {
    const [text, setText] = useState();

    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        // event.preventDefault();
        if (event.key === "Enter") {
            setText(event.target.value);
            // setText(text);
            const text = event.target.value;
            return updateSearchText(text);
        }
    };

    const updateSearchText = (newSearchText) => {
        dispatch(setSkipItemsNumber(0));
        dispatch(setPartItems(0));
        dispatch(setTotalItems(0));
        dispatch(setSearchTextString(newSearchText));
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
    )
};

export default Search;
