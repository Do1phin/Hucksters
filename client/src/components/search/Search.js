import React, {useState} from "react";
import PropTypes from 'prop-types';

import './search.style.css';

const Search = ({setSkip, setItemSize, setAllItemSize, setSearchText}) => {
    const [text, setText] = useState();

    const handleSubmit = (event) => {
        if (event.key === "Enter") {
            setText(text);
            return updateSearchText(text);
        }
    };

    const handleChange = (event) => {
        if (!event.target.value) {
            setText(event.target.value);
            return updateSearchText();
        }
        event.preventDefault();
        return setText(event.target.value);
    };

    const updateSearchText = (newSearchText) => {
            setSkip(0);
            setItemSize(0);
            setAllItemSize(0);
            setSearchText(newSearchText);
    };

    return (
        <div className='search-block'>
            <div className='search-block__input'>
                <input
                    placeholder='Искать ...'
                    value={text}
                    onChange={(event) => handleChange(event)}
                    onKeyPress={(event) => handleSubmit(event)}
                />
            </div>
        </div>
    )
};

Search.propTypes = {
    setSkip: PropTypes.func.isRequired,
    setItemSize: PropTypes.func.isRequired,
    setAllItemSize: PropTypes.func.isRequired,
    setSearchText: PropTypes.func.isRequired
};

export default Search;
