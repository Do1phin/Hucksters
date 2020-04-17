import React, {useEffect, useState} from "react";

import './search.style.css';
import {list} from "./api-search";

const Search = (props) => {
    const [result, setResult] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadContent()
    }, []);

    const loadContent = () => {
        list({})
            .then(data => {
                console.log('data ', data)
                if (!data.error) {
                    // setResult(data);
                    // setLoading(false);
                }
            })
    };

    return (
        <div>
            <div className='search-info-block'>
                <span>Результатов: </span>
                <strong>{result}</strong>
            </div>
            {/*<Photos/>*/}
        </div>
    )

};

export default Search;
