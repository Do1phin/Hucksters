import React, {Fragment, useEffect, useState} from "react";
import {list} from './api-photo';
import PhotoCard from './PhotoCard';
import Spinner from "../spinner";
import Search from "../search/Search";
import LimitSelect from "../UI/LimitSelect/LimitSelect";
import SortSelect from "../UI/SortSelect/SortSelect";

import './photo.style.css';

const Photos = () => {
    const [loading, setLoading] = useState(true);
    const [photos, setPhotos] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [photoSize, setPhotoSize] = useState(0);
    const [allPhotoSize, setAllPhotoSize] = useState(0);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(100);
    const [sort, setSort] = useState(-1);

    let source;

    useEffect(() => {

        let variables = {
            text: searchText,
            skip,
            limit,
            sort
        };

        loadPhotos(variables);
    }, [searchText, limit, skip, sort]);

    const updateSearchText = (newSearchText) => {
        if (newSearchText !== searchText) {
            setSkip(0);
            setPhotoSize(0);
            setAllPhotoSize(0);
        }
        setSearchText(newSearchText);
    };


    const loadPhotos = (variables) => {

        list(variables)
            .then(data => {
                source = data;

                if (data) {
                    if (variables.loadMore) {
                        setPhotos([...photos, ...source.photos]);
                    } else {
                        setPhotos(source.photos);
                    }
                    setPhotoSize(source.photoSize);
                    setAllPhotoSize(allPhotoSize + source.photoSize);
                    setLoading(false);
                }
            });
    };

    const loadMore = () => {

        let skipAfter = skip + limit;

        let variables = {
            text: searchText,
            skip: skipAfter,
            limit,
            sort,
            loadMore: true
        };

        console.log('variables 2 ', variables)

        loadPhotos(variables);
        setSkip(skipAfter);
    };

    const photosView = photos.map((item) => {
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

            <div className='photos-size'>
                {allPhotoSize
                    ? <span>Результатов - {allPhotoSize}</span>
                    : null
                }
            </div>

            <LimitSelect limit={limit} refreshFunction={setLimit}/>

            <SortSelect sort={sort} refreshFunction={setSort}/>

            <div className='photos'>
                {content}
            </div>

            {photoSize >= limit
                ? <div className='photos-load-more'>
                    <button
                        className='load-more-btn'
                        onClick={loadMore}
                    >
                        Показать ещё
                    </button>
                </div>
                : null
            }
        </Fragment>
    )

};

export default Photos;
