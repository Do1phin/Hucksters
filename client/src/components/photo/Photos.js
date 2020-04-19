import React, {Fragment, useEffect, useState} from "react";
import {list} from './api-photo';
import PhotoCard from './PhotoCard';
import Spinner from "../spinner";
import Search from "../search/Search";

import './photo.style.css';


const Photos = (props) => {
    const [loading, setLoading] = useState(true);
    const [photos, setPhotos] = useState([]);
    const [searchText, setSearchText] = useState('');


    const updateSearchText = (newSearchText) => {
        setSearchText(newSearchText)
    };

    useEffect(() => {
        loadPhotos();
    }, [searchText]);

    const loadPhotos = () => {

        list({
            text: searchText
        })
            .then(data => {
                if (data) {
                    setPhotos(data);
                    setLoading(false);
                }
            })
    };

    const source = props.source || photos;

    const photosView = source.map((item) => {
        return (
            <div className='photo-card-wrapper' key={item.photoId}>
                <PhotoCard {...item} />
            </div>
        )
    });

    const content = loading ? <Spinner/> : photosView;

    return (
        <Fragment>
            <Search
                refreshFunction={updateSearchText}
            />
            <div className='photos'>
                {content}
            </div>
        </Fragment>
    )

};

export default Photos;
