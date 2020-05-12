import React, {Fragment, useEffect, useState} from "react";
import {getMembersFromDB} from './_api-member';
import MemberCard from "./MemberCard";
import ErrorNotFound from "../errors/ErrorNotFound";
import './members.style.scss';
import Search from "../search/Search";
import LimitSelect from "../UI/LimitSelect/LimitSelect";
import LoadMoreBtn from "../UI/LoadMoreBtn/LoadMoreBtn";
import MemberPage from "./MemberPage";
import StatusSelect from "../UI/StatusSelect/StatusSelect";
import CountrySelect from "../UI/CountrySelect/CountrySelect";
import Spinner from "../spinner";

const Members = (props) => {
    const [loading, setLoading] = useState(true);
    const [sellers, setSellers] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [itemSize, setItemSize] = useState(0);
    const [allItemSize, setAllItemSize] = useState(0);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(100);
    const [more, setMore] = useState(false);
    const [status, setStatus] = useState('seller');
    const [country, setCountry] = useState('');


    useEffect(() => {
        const variables = {
            info: 'list',
            first_name: searchText,
            skip,
            limit,
            status,
            country
        };

        const loadMembers = (variables) => {
            setLoading(true);

            getMembersFromDB(variables)
                .then(data => {

                    if (data) {
                        setItemSize(data.length);

                        if (more) {
                            setSellers([...sellers, ...data]);
                            setAllItemSize(allItemSize + data.length);
                        } else {
                            setSellers(data);
                            setAllItemSize(data.length);
                        }
                        setLoading(false);
                    }
                })
        };

        loadMembers(variables);
        setMore(false);
    }, [searchText, limit, skip, status, country]);

    const loadMore = () => {
        let skipAfter = skip + limit;
        setMore(true);
        setSkip(skipAfter);
    };

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
            return <ErrorNotFound title={'sellers'}/>
        }
    };

    const MembersSize = () => {
        return (
            <div className='member-size'>
                {
                    allItemSize
                        ? <span>Результатов - {allItemSize}</span>
                        : null
                }
            </div>
        )

    };

    const Content = () => {
        const owner_id = +props.match.params.owner_id;
        let element;
        if (owner_id) {
            return <MemberPage owner_id={owner_id}/>
        }

        if (!loading && !sellers.length) {
            element = <ErrorNotFound title={'sellers'}/>
        } else if (!loading && sellers.length) {
            element = (
                <Fragment>
                    <div className='member-list' key={owner_id}>
                        <MembersView/>
                    </div>
                </Fragment>
            )
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
            )
        }

        return (
            <Fragment>
                <Search
                    setSkip={setSkip}
                    setItemSize={setItemSize}
                    setAllItemSize={setAllItemSize}
                    setSearchText={setSearchText}
                />
                <MembersSize/>
                <LimitSelect
                    limit={limit}
                    refreshFunction={setLimit}
                />
                <StatusSelect
                    status={status}
                    refreshFunction={setStatus}
                />
                <CountrySelect
                    country={country}
                    refreshFunction={setCountry}
                />

                {element}

                <LoadMoreBtn
                    limit={limit}
                    size={itemSize}
                    refreshFunction={loadMore}
                />
            </Fragment>

        )
    };

    return (
        <Content/>
    )
};

export default Members;
