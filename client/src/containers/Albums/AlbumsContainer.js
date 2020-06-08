// Core
import React, {Fragment, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// Redux actions
import {loadingStart, loadingStop} from '../../redux/actions/generalSettings.actions';
import {ListSettingsSetLoadMoreAction} from '../../redux/actions/listSettings.actions';
import {AlbumsFillAsyncAction} from './albums.actions';
// React components
import ItemsSize from '../../components/ItemsSize/ItemsSize';
import AlbumList from '../../components/AlbumList/AlbumList';
import SearchContainer from '../Search/SearchContainer';
import LimitSelect from '../../components/UI/LimitSelect/LimitSelect';
import SortSelect from '../../components/UI/SortSelect/SortSelect';
import LoadMoreBtn from '../../components/UI/LoadMoreBtn/LoadMoreBtn';
import Spinner from '../../components/Spinners/GeneralSpinner';
// Styles
import '../../styles/albums.style.scss';


const AlbumsContainer = () => {

    const dispatch = useDispatch();

    const list_settings = useSelector(state => state.list_settings);
    const general_settings = useSelector(state => state.general_settings);
    const albums = useSelector(state => state.albums);
    const search = useSelector(state => state.search);

    useEffect(() => {

        dispatch(loadingStart());
        dispatch(AlbumsFillAsyncAction());
        dispatch(ListSettingsSetLoadMoreAction(false));
        dispatch(loadingStop());

    }, [
        search.search_text,
        list_settings.limit,
        list_settings.skip,
        list_settings.sort,
        dispatch
    ]);

    return (
        <Fragment>
            <SearchContainer/>
            <ItemsSize
                loading={general_settings.loading}
                total_items={list_settings.total_items}
                total_loaded_items={list_settings.total_loaded_items}
            />
            <LimitSelect/>
            <SortSelect/>

            {
                !albums.albums.length && !albums.albums_fetching_error
                    ? <Spinner/>
                    : (
                        <div className='album-list'>
                            <AlbumList albums={[...albums.albums]}/>
                        </div>
                    )
            }

            {
                albums.albums_fetching_error && 'ERROR'
            }

            <LoadMoreBtn/>
        </Fragment>
    );
};

export default AlbumsContainer;
