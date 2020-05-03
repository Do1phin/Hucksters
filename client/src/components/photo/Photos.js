import React, {Fragment, useEffect, useState} from "react";
import {getPhotosFromDB} from './_api-photo';
import PhotoCard from './PhotoCard';
import PhotoPage from "./PhotoPage";
import ErrorNotFound from '../errors/ErrorNotFound';
import Spinner from "../spinner";
import Search from "../search/Search";
import LimitSelect from "../UI/LimitSelect/LimitSelect";
import SortSelect from "../UI/SortSelect/SortSelect";
import LoadMoreBtn from "../UI/LoadMoreBtn/LoadMoreBtn";

import './photo.style.css';

const Photos = (props) => {
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

            getPhotosFromDB(variables)
                .then(data => {

                    if (data) {
                        setItemSize(data.photos.length);

                        if (more) {
                            setPhotos([...photos, ...data.photos]);
                            setAllItemSize(allItemSize + data.photos.length);
                        } else {
                            setPhotos(data.photos);
                            setAllItemSize(data.photos.length);
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

    const PhotosView = () => {

        if (photos.length !== 0) {
            return photos.map((item) => {
                return (
                    <div className='photo-card__item' key={item.photoId}>
                        <PhotoCard {...item} />
                    </div>
                )
            });
        } else {
            return <ErrorNotFound title={'photos'}/>
        }
    };

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
        console.log('props.match.params ', props.match.params)
        const {user_id, album_id, photo_id} = props.match.params;
        if (user_id) {
            return <PhotoPage photo_id={photo_id}/>
        }

        let element;
        if (loading) {
            element = <Spinner/>
        } else if (!loading && !photos.length) {
            element = <ErrorNotFound title={'photos'}/>
        } else {
            element = <div className='photo-list'>
                <PhotosView/>
            </div>
        }

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

                {element}

                <LoadMoreBtn
                    limit={limit}
                    size={itemSize}
                    refreshFunction={loadMore}
                />
            </Fragment>
        );
    };

    return (
        <Fragment>
            <Content/>
        </Fragment>
    )
};

export default Photos;
