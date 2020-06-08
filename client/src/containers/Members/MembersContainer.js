// Core
import React, {Fragment, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// Redux actions
import {loadingStart, loadingStop} from '../../redux/actions/generalSettings.actions';
import {ListSettingsSetLoadMoreAction} from '../../redux/actions/listSettings.actions';
import {MembersFillAsyncAction} from './members.actions';
import {FavoritesGetAsyncAction} from '../../redux/actions/favorite.actions';
// React components
import SearchContainer from '../Search/SearchContainer';
import LimitSelect from '../../components/UI/LimitSelect/LimitSelect';
import LoadMoreBtn from '../../components/UI/LoadMoreBtn/LoadMoreBtn';
import ItemsSize from '../../components/ItemsSize/ItemsSize';
import MemberList from '../../components/MemberList/MemberList';
import StatusSelect from '../../components/UI/StatusSelect/StatusSelect';
import CountrySelect from '../../components/UI/CountrySelect/CountrySelect';
import Spinner from '../../components/Spinners/GeneralSpinner';
// Styles
import '../../styles/members.style.scss';

const MembersContainer = (props) => {

    const dispatch = useDispatch();

    const list_settings = useSelector(state => state.list_settings);
    const general_settings = useSelector(state => state.general_settings);
    const members = useSelector(state => state.members);
    const search = useSelector(state => state.search);

    useEffect(() => {

        dispatch(loadingStart());
        dispatch(FavoritesGetAsyncAction());
        dispatch(MembersFillAsyncAction());
        dispatch(ListSettingsSetLoadMoreAction(false));
        dispatch(loadingStop());

    }, [
        search.search_text,
        list_settings.limit,
        list_settings.skip,
        list_settings.member_status,
        list_settings.member_country,
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
            <StatusSelect/>
            <CountrySelect/>

            {
                !members.members.length && !members.members_fetching_error
                    ? <Spinner/>
                    : (
                        <div className='member-list'>
                            <MemberList members={[...members.members]}/>
                        </div>
                    )
            }

            {
                members.members_fetching_error && 'ERROR'
            }

            <LoadMoreBtn/>
        </Fragment>
    );
};

export default MembersContainer;
