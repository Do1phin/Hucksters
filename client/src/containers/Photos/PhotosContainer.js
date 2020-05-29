// Core
import React, {Fragment, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// Redux-actions
import {setLoadMore} from '../../redux/actions/list.actions';
import {getFavoritesAsync} from '../../redux/actions/favorite.actions';
import {setPhotosToStore} from './photos.actions';
// Components
import PhotoList from '../../components/PhotoList/PhotoList';
import PhotoSize from '../../components/PhotoSize/PhotoSize';
import Search from '../../components/search/Search';
// UI components
import LimitSelect from '../../components/UI/LimitSelect/LimitSelect';
import SortSelect from '../../components/UI/SortSelect/SortSelect';
import LoadMoreBtn from '../../components/UI/LoadMoreBtn/LoadMoreBtn';
// Styles
import '../../styles/photos.style.scss';

const Photos = () => {

    const listSettings = useSelector(state => state.list);
    const photos = useSelector(state => state.photos);

    const dispatch = useDispatch();

    dispatch(getFavoritesAsync());

    useEffect(() => {
        dispatch(setPhotosToStore());
        dispatch(setLoadMore(false));

    }, [
        listSettings.search_text,
        listSettings.limit,
        listSettings.skip,
        listSettings.sort
    ]);


    return (
        <Fragment>
            <Search/>
            <PhotoSize listSettings={listSettings}/>
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
