// Core
import React, {Fragment, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// Redux-actions
import {loading} from '../../redux/actions/generalSettings.actions';
import {setLoadMore} from '../../redux/actions/listSettings.actions';
import {getFavoritesAsync} from '../../redux/actions/favorite.actions';
import {setPhotosToStore} from './photos.actions';
// Components
import PhotoList from '../../components/PhotoList/PhotoList';
import PhotoSize from '../../components/PhotoSize/PhotoSize';
import SearchContainer from '../Search/SearchContainer';
import LimitSelect from '../../components/UI/LimitSelect/LimitSelect';
import SortSelect from '../../components/UI/SortSelect/SortSelect';
import LoadMoreBtn from '../../components/UI/LoadMoreBtn/LoadMoreBtn';
// Styles
import '../../styles/photos.style.scss';

const Photos = () => {

    const list_settings = useSelector(state => state.list_settings);
    const photos = useSelector(state => state.photos);
    const search = useSelector(state => state.search);

    const dispatch = useDispatch();

    dispatch(getFavoritesAsync());

    useEffect(() => {

        dispatch(loading(true));

        dispatch(setPhotosToStore());
        dispatch(setLoadMore(false));

        dispatch(loading(false));

    }, [
        search.search_text,
        list_settings.limit,
        list_settings.skip,
        list_settings.sort
    ]);

    return (
        <Fragment>
            <SearchContainer/>
            <PhotoSize list_settings={list_settings}/>
            <LimitSelect/>
            <SortSelect/>

            <div className='photo-list'>
                <PhotoList photos={photos}/>
            </div>

            <LoadMoreBtn/>
        </Fragment>
    );
};

export default Photos;
