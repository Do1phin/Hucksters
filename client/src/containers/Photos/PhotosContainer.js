// Core
import React, {Fragment, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// Redux actions
import {loadingStart, loadingStop} from '../../redux/actions/generalSettings.actions';
import {ListSettingsSetLoadMoreAction} from '../../redux/actions/listSettings.actions';
import {FavoritesGetAsyncAction} from '../../redux/actions/favorite.actions';
import {PhotosFillAsyncAction} from './photos.actions';
import {SomeMembersFillAsyncAction} from '../Members/members.actions';
// React components
import PhotoList from '../../components/PhotoList/PhotoList';
import ItemsSize from '../../components/ItemsSize/ItemsSize';
import SearchContainer from '../Search/SearchContainer';
import LimitSelect from '../../components/UI/LimitSelect/LimitSelect';
import SortSelect from '../../components/UI/SortSelect/SortSelect';
import LoadMoreBtn from '../../components/UI/LoadMoreBtn/LoadMoreBtn';
import Spinner from '../../components/Spinners/GeneralSpinner';
// Styles
import '../../styles/photos.style.scss';

const Photos = () => {

    const dispatch = useDispatch();

    const list_settings = useSelector(state => state.list_settings);
    const general_settings = useSelector(state => state.general_settings);
    const photos = useSelector(state => state.photos);
    const members = useSelector(state => state.members);
    const favorite = useSelector(state => state.favorites);
    const search = useSelector(state => state.search);

    // dispatch(setManyMembersToStore());

    useEffect(() => {

        dispatch(loadingStart());
        dispatch(FavoritesGetAsyncAction());
        dispatch(PhotosFillAsyncAction());
        dispatch(SomeMembersFillAsyncAction());
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
                !photos.photos.length && !photos.photos_fetching_error
                    ? <Spinner/>
                    : (
                        <div className='photo-list'>
                            <PhotoList photos={[...photos.photos]} members={[...members.members]} favorite={favorite}/>
                        </div>
                    )
            }

            {
                photos.photos_fetching_error && 'ERROR'
            }

            <LoadMoreBtn/>
        </Fragment>
    );
};

export default Photos;
