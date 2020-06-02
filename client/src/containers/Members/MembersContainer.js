// Core
import React, {Fragment, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// Redux actions
import {loading} from '../../redux/actions/generalSettings.actions';
import {setLoadMore} from '../../redux/actions/listSettings.actions';
import {setMembersToStore} from './members.actions';
import {getFavoritesAsync} from '../../redux/actions/favorite.actions';
// React components
import SearchContainer from '../Search/SearchContainer';
import LimitSelect from '../../components/UI/LimitSelect/LimitSelect';
import LoadMoreBtn from '../../components/UI/LoadMoreBtn/LoadMoreBtn';
import MemberPage from '../../components/MemberPage/MemberPage';
import MembersSize from '../../components/MemberSize/MemberSize';
import MemberList from '../../components/MemberList/MemberList';
import StatusSelect from '../../components/UI/StatusSelect/StatusSelect';
import CountrySelect from '../../components/UI/CountrySelect/CountrySelect';
// Styles
import '../../styles/members.style.scss';

const MembersContainer = (props) => {

    const list_settings = useSelector(state => state.list_settings);
    const members = useSelector(state => state.members);
    const search = useSelector(state => state.search);
    const general_settings = useSelector(state => state.general_settings);

    const dispatch = useDispatch();

    dispatch(getFavoritesAsync());

    useEffect(() => {

        dispatch(loading(true));

        dispatch(setMembersToStore());
        dispatch(setLoadMore(false));

        dispatch(loading(false));
    }, [
        search.search_text,
        list_settings.limit,
        list_settings.skip,
        list_settings.member_status,
        list_settings.member_country
    ]);

    return (
        <Fragment>
            <SearchContainer/>
            <MembersSize list_settings={list_settings}/>
            <LimitSelect/>
            <StatusSelect/>
            <CountrySelect/>

            <div className='member-list'>
                <MemberList members={members}/>
            </div>

            <LoadMoreBtn/>
        </Fragment>
    );
};

export default MembersContainer;
