// Core
import React, {Fragment, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// Redux actions
import {loading_start, loading_stop} from '../../redux/actions/generalSettings.actions';
import {setLoadMore} from '../../redux/actions/listSettings.actions';
import {FavoritesGetAsyncAction} from '../../redux/actions/favorite.actions';
import {PhotosFillAsyncAction} from './photos.actions';
import {SomeMembersFillAsyncAction} from '../Members/members.actions';
// React components
import PhotoList from '../../components/PhotoList/PhotoList';
import PhotoSize from '../../components/PhotoSize/PhotoSize';
import SearchContainer from '../Search/SearchContainer';
import LimitSelect from '../../components/UI/LimitSelect/LimitSelect';
import SortSelect from '../../components/UI/SortSelect/SortSelect';
import LoadMoreBtn from '../../components/UI/LoadMoreBtn/LoadMoreBtn';
// API
import {getMembersFromDB} from '../Members/members.api';
// Styles
import '../../styles/photos.style.scss';

const Photos = () => {

    const list_settings = useSelector(state => state.list_settings);
    const photos = useSelector(state => state.photos);
    const members = useSelector(state => state.members);
    const favorite = useSelector(state => state.favorites);
    const search = useSelector(state => state.search);

    const dispatch = useDispatch();

    dispatch(FavoritesGetAsyncAction());
    // dispatch(setManyMembersToStore());

    useEffect(() => {
        dispatch(loading_start());

        dispatch(PhotosFillAsyncAction());
        dispatch(SomeMembersFillAsyncAction());

        dispatch(setLoadMore(false));
        dispatch(loading_stop());
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
                <PhotoList photos={photos} members={members} favorite={favorite}/>
            </div>

            <LoadMoreBtn/>
        </Fragment>
    );
};

export default Photos;
