// Core
import React, {Fragment, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// Redux actions
import {loading} from '../../redux/actions/generalSettings.actions';
import {setLoadMore} from '../../redux/actions/listSettings.actions';
import {setAlbumsToStore} from './albums.actions';
// React components
import AlbumSize from '../../components/AlbumSize/AlbumSize';
import AlbumList from '../../components/AlbumList/AlbumList';
import SearchContainer from '../Search/SearchContainer';
import LimitSelect from '../../components/UI/LimitSelect/LimitSelect';
import SortSelect from '../../components/UI/SortSelect/SortSelect';
import LoadMoreBtn from '../../components/UI/LoadMoreBtn/LoadMoreBtn';
// Styles
import '../../styles/albums.style.scss';

const AlbumsContainer = () => {

    const albums = useSelector(state => state.albums);
    const list_settings = useSelector(state => state.list_settings);
    const search = useSelector(state => state.search);

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(loading(true));

        dispatch(setAlbumsToStore());
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
            <AlbumSize list_settings={list_settings}/>
            <LimitSelect/>
            <SortSelect/>

            <div className='album-list'>
                <AlbumList albums={albums}/>
            </div>

            <LoadMoreBtn/>
        </Fragment>
    );
};

export default AlbumsContainer;
