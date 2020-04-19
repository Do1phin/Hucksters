import React, {useState} from "react";

import './search.style.css';

const Search = (props) => {
    const [searchText, setSearchText] = useState();
    // const [result, setResult] = useState();
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     loadContent()
    // }, []);

    const handleSubmit = (event) => {
        if (event.key === "Enter") {
            return props.refreshFunction(searchText, 0);
        }
    };

    const handleChange = (event) => {
        if (!event.target.value) {
            setSearchText(event.target.value);
            return props.refreshFunction(searchText);
        }
        return setSearchText(event.target.value);
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
