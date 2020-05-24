import React, {Fragment, useEffect, useState} from 'react';
import {getMembersFromDB} from './_api-member';
import MemberCard from './MemberCard';
import ErrorNotFound from '../errors/ErrorNotFound';
import Search from '../search/Search';
import LimitSelect from '../UI/LimitSelect/LimitSelect';
import LoadMoreBtn from '../UI/LoadMoreBtn/LoadMoreBtn';
import MemberPage from './MemberPage';
import StatusSelect from '../UI/StatusSelect/StatusSelect';
import CountrySelect from '../UI/CountrySelect/CountrySelect';
import Spinner from '../spinner';
import {connect, useDispatch, useSelector} from 'react-redux';
import {setLoadMore, setSkipItemsNumber, setPartItems, setTotalItems} from '../../redux/actions/list.actions';
import './members.style.scss';

const Members = (props) => {
    const [loading, setLoading] = useState(true);
    const [sellers, setSellers] = useState([]);

    const dispatch = useDispatch();
    const listSettings = useSelector(state => state.list);

    useEffect(() => {
        const variables = {
            info: 'list',
            search_text: listSettings.search_text,
            skip: listSettings.skip,
            limit: listSettings.limit,
            status: listSettings.member_status,
            country: listSettings.member_country
        };

        const loadMembers = (variables) => {
            setLoading(true);

            getMembersFromDB(variables)
                .then(data => {

                    if (data) {
                        dispatch(setPartItems(data.length));

                        if (listSettings.loadMore) {
                            setSellers([...sellers, ...data]);
                            dispatch(setTotalItems(listSettings.total_items + data.length));
                        } else {
                            dispatch(setSkipItemsNumber(0));
                            setSellers(data);
                            dispatch(setTotalItems(data.length));
                        }
                        return setLoading(false);
                    }
                });
        };

        loadMembers(variables);
        dispatch(setLoadMore(false));
    }, [
        listSettings.search_text,
        listSettings.limit,
        listSettings.skip,
        listSettings.member_status,
        listSettings.member_country
    ]);

    const MembersView = () => {

        if (sellers.length) {
            return sellers.map((item) => {
                return (
                    <div className='member-card__item' key={item.owner_id}>
                        <MemberCard {...item}/>
                    </div>
                );
            });
        } else {
            return <ErrorNotFound title={'sellers'}/>;
        }
    };

    const MembersSize = () => {
        return (
            <div className='member-size'>
                {
                    listSettings.total_items
                        ? <span>Результатов - {listSettings.total_items}</span>
                        : null
                }
            </div>
        );
    };

    const Content = () => {
        const owner_id = +props.match.params.owner_id;
        let element;
        if (owner_id) {
            return <MemberPage owner_id={owner_id}/>;
        }

        if (!loading && !sellers.length) {
            element = <ErrorNotFound title={'sellers'}/>;
        } else if (!loading && sellers.length) {
            element = (
                <Fragment>
                    <div className='member-list' key={owner_id}>
                        <MembersView/>
                    </div>
                </Fragment>
            );
        } else if (loading && sellers.length) {
            element = (
                <Fragment>
                    <div className='member-list' key={owner_id}>
                        <MembersView/>
                    </div>
                    <div className='member-list__more'>
                        <Spinner/>
                    </div>
                </Fragment>
            );
        }

        return (
            <Fragment>
                <Search/>
                <MembersSize/>
                <LimitSelect/>
                <StatusSelect/>
                <CountrySelect/>

                {element}

                <LoadMoreBtn/>
            </Fragment>
        );
    };

    return (
        <Content/>
    );
};

export default connect()(Members);
