import React, {useEffect, useState} from "react";
import Photos from '../photo/Photos.js'

import './search.style.css';
import {list} from "./api-search";

const Search = (props) => {
    const [searchStr, setSearchStr] = useState();
    const [result, setResult] = useState();
    const [loading, setLoading] = useState(true);

    let source, countResult;

    useEffect(() => {
        loadContent()
    }, []);

    const handleSubmit = (props) => {
        if (props === 'Enter' && searchStr) {
            let location;
            // const path = window.location.pathname;
            //     if (path.includes('photos')) {
            //         location = 'photos'
            //     } else if (path.includes('albums')) {
            //         location = 'albums'
            //     } else if (path.includes('sellers')) {
            //         location = 'sellers'
            //     } else {
            //         location = 'photos'
            //     }

            return window.location.href = '/search?q=' + searchStr //+ '&location=' + location;
            // return loadContent(location)
        }
    };

    const handleChange = (props) => {
        setSearchStr(props);
    };

    const loadContent = (props) => {

        list({
            q:searchStr
        })
            .then(data => {
                source = data;
                if (!data) {
                    setResult(data);
                    setLoading(false);
                }
                setResult(source);
                countResult = source.length;
                console.log('result ', source)
            })
    };

    return (
        <div className='search-block-wrapper'>
            <div className='search-block-str'>
                <input
                    placeholder='Искать ...'
                    value={searchStr}
                    onChange={(e) => handleChange(e.target.value)}
                    onKeyPress={(e) => handleSubmit(e.key)}
                />
            </div>
            <div className='search-block-info'>
                <span>Результатов: </span>
                <strong>{countResult}</strong>
            </div>

            <div className='search-block-result'>
                {/*<Photos data={result}/>*/}
            </div>
        </div>
    )

};

export default Search;
