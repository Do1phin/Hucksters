import React, {Fragment, useEffect, useState} from "react";
import {list} from './api-photo';
import PhotoCard from './PhotoCard';
import Spinner from "../spinner";
import Search from "../search/Search";
import LimitSelect from "../UI/LimitSelect/LimitSelect";
import SortSelect from "../UI/SortSelect/SortSelect";
import LoadMoreBtn from "../UI/LoadMoreBtn/LoadMoreBtn";

import './photo.style.css';

const Photos = () => {
    const [loading, setLoading] = useState(true);
    const [photos, setPhotos] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [itemSize, setItemSize] = useState(0);
    const [allItemSize, setAllItemSize] = useState(0);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(100);
    const [sort, setSort] = useState(-1);
    const [more, setMore] = useState(false);

    useEffect(() => {

        let variables = {
            text: searchText,
            skip,
            limit,
            sort
        };

        const loadPhotos = (variables) => {

            list(variables)
                .then(data => {

                    if (data) {
                        setItemSize(data.itemSize);

                        if (more) {
                            setPhotos([...photos, ...data.photos]);
                            setAllItemSize(allItemSize + data.itemSize);
                        } else {
                            setPhotos(data.photos);
                            setAllItemSize(data.itemSize);
                        }
                        return setLoading(false);
                    }
                });
        };

        loadPhotos(variables);
        setMore(false);
    }, [searchText, limit, skip, sort]);

    const loadMore = () => {
        let skipAfter = skip + limit;
        setMore(true);
        setSkip(skipAfter);
    };

    const photosView = photos.map((item) => {
        return (
            <div className='photo-card-wrapper' key={item.photoId}>
                <PhotoCard {...item} />
            </div>
        )
    });

    const PhotoSize = () => {
        return (
            <div className='photos-size'>
                {allItemSize
                    ? <span>Результатов - {allItemSize}</span>
                    : null
                }
            </div>
        )
    };

    const Content = () => {
        return loading ? <Spinner/> : <div className='photos'>{photosView}</div>
    };

    return (
        <Fragment>
            <Search
                setSkip={setSkip}
                setItemSize={setItemSize}
                setAllItemSize={setAllItemSize}
                setSearchText={setSearchText}
            />
            <PhotoSize/>
            <LimitSelect
                limit={limit}
                refreshFunction={setLimit}
            />
            <SortSelect
                sort={sort}
                refreshFunction={setSort}
            />
            <Content/>
            <LoadMoreBtn
                limit={limit}
                size={itemSize}
                refreshFunction={loadMore}
            />
        </Fragment>
    )

};

export default Photos;
