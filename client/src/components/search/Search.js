import React, {useState} from "react";

import './search.style.css';

const Search = (props) => {
    const [searchText, setSearchText] = useState();

    const handleSubmit = (event) => {
        if (event.key === "Enter") {
            return updateSearchText(searchText);
        }
    };

    const handleChange = (event) => {
        if (!event.target.value) {
            setSearchText(event.target.value);
            return updateSearchText();
        }
        return setSearchText(event.target.value);
    };

    const updateSearchText = (newSearchText) => {
            props.setSkip(0);
            props.setItemSize(0);
            props.setAllItemSize(0);
            props.setSearchText(newSearchText);
    };


    return (
        <div className='search-block-wrapper'>
            <div className='search-block-str'>
                <input
                    placeholder='Искать ...'
                    value={searchText}
                    onChange={(event) => handleChange(event)}
                    onKeyPress={(event) => handleSubmit(event)}
                />
            </div>
        </div>
    )

};

export default Search;
