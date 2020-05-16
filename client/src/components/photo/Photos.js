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
import {useDispatch, useSelector} from "react-redux";
import {setLoadMore, setPartItems, setTotalItems} from "../../redux/actions/list.actions";
import './photos.style.scss';

const Photos = (props) => {
    const [loading, setLoading] = useState(true);
    const [photos, setPhotos] = useState([]);

    const dispatch = useDispatch();
    const listSettings = useSelector(state => state.list);

    useEffect(() => {

        let variables = {
            text: listSettings.search_text,
            skip: listSettings.skip,
            limit: listSettings.limit,
            sort: listSettings.sort
        };

        const loadPhotos = (variables) => {

            setLoading(true);

            getPhotosFromDB(variables)
                .then(data => {

                    if (data) {
                        dispatch(setPartItems(data.photos.length));

                        if (listSettings.loadMore) {
                            setPhotos([...photos, ...data.photos]);
                            dispatch(setTotalItems(listSettings.total_items + data.photos.length));
                        } else {
                            setPhotos(data.photos);
                            dispatch(setTotalItems(data.photos.length));
                        }

                    }
                });
            return setLoading(false);
        };

        loadPhotos(variables);
        dispatch(setLoadMore(false));
    }, [
        listSettings.search_text,
        listSettings.limit,
        listSettings.skip,
        listSettings.sort
    ]);

    const PhotosView = () => {

        if (photos.length) {
            return photos.map((item) => {
                return (
                    <div className='photo-card__item' key={item.photo_id}>
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
                {listSettings.total_items
                    ? <span>Результатов - {listSettings.total_items}</span>
                    : null
                }
            </div>
        )
    };

    const Content = () => {

        const {owner_id, album_id, photo_id} = props.match.params;
        if (owner_id) {
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
                <Search/>
                <PhotoSize/>
                <LimitSelect/>
                <SortSelect/>

                {element}

                <LoadMoreBtn/>
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
