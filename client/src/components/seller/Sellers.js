import React, {Fragment, useEffect, useState} from "react";
import {getMembersFromDB} from './_api-seller';
import SellerCard from "./SellerCard";
import ErrorNotFound from "../errors/ErrorNotFound";
import './seller.style.css';
import Search from "../search/Search";
import LimitSelect from "../UI/LimitSelect/LimitSelect";
import LoadMoreBtn from "../UI/LoadMoreBtn/LoadMoreBtn";
import SellerPage from "./SellerPage";
import StatusSelect from "../UI/StatusSelect/StatusSelect";
import Spinner from "../spinner";

const Sellers = (props) => {
    const [loading, setLoading] = useState(true);
    const [sellers, setSellers] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [itemSize, setItemSize] = useState(0);
    const [allItemSize, setAllItemSize] = useState(0);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(100);
    const [more, setMore] = useState(false);
    const [status, setStatus] = useState('seller');


    useEffect(() => {
        const variables = {
            page: 'list',
            first_name: searchText,
            skip,
            limit,
            status
        };

        const loadSellers = (variables) => {
            setLoading(true);

            getMembersFromDB(variables)
                .then(data => {

                    if (data) {
                        setItemSize(data.sellers.length);

                        if (more) {
                            setSellers([...sellers, ...data.sellers]);
                            setAllItemSize(allItemSize + data.sellers.length);
                        } else {
                            setSellers(data.sellers);
                            setAllItemSize(data.sellers.length);
                        }
                        setLoading(false);
                    }
                })
        };

        loadSellers(variables);
        setMore(false);
    }, [searchText, limit, skip, status]);

    const loadMore = () => {
        let skipAfter = skip + limit;
        setMore(true);
        setSkip(skipAfter);
    };

    const SellersView = () => {

        if (sellers.length) {
            return sellers.map((item) => {
                return (
                    <div className='seller-card__item' key={item.user_id}>
                        <SellerCard {...item}/>
                    </div>
                );
            });
        } else {
            return <ErrorNotFound title={'sellers'}/>
        }
    };

    const SellersSize = () => {
        return (
            <div className='seller-size'>
                {
                    allItemSize
                        ? <span>Результатов - {allItemSize}</span>
                        : null
                }
            </div>
        )

    };

    const Content = () => {
        const user_id = +props.match.params.user_id;
        let element;
        if (user_id) {
            return <SellerPage user_id={user_id}/>
        }

        if (!loading && !sellers.length) {
            element = <ErrorNotFound title={'sellers'}/>
        } else if (!loading && sellers.length) {
            element = (
                <Fragment>
                    <div className='seller-list'>
                        <SellersView/>
                    </div>
                </Fragment>
            )
        } else if (loading && sellers.length) {
            element = (
                <Fragment>
                    <div className='seller-list'>
                        <SellersView/>
                    </div>
                    <div className='seller-list__more'>
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
                <SellersSize/>
                <LimitSelect
                    limit={limit}
                    refreshFunction={setLimit}
                />
                <StatusSelect
                    status={status}
                    refreshFunction={setStatus}
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

export default Sellers;
