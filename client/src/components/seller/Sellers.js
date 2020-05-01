import React, {Fragment, useEffect, useState} from "react";
import {getMembersFromDB} from './_api-seller';
import SellerCard from "./SellerCard";
import PropTypes from 'prop-types';
import ErrorNotFound from "../errors/ErrorNotFound";
import Spinner from '../spinner';
import './seller.style.css';
import Search from "../search/Search";
import LimitSelect from "../UI/LimitSelect/LimitSelect";
import LoadMoreBtn from "../UI/LoadMoreBtn/LoadMoreBtn";

const Sellers = () => {
    const [loading, setLoading] = useState(true);
    const [sellers, setSellers] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [itemSize, setItemSize] = useState(0);
    const [allItemSize, setAllItemSize] = useState(0);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(100);
    const [more, setMore] = useState(false);


    useEffect(() => {

        const variables = {
            first_name: searchText,
            skip,
            limit
        };

        const loadSellers = (variables) => {
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
    }, [searchText, limit, skip]);

    const loadMore = () => {
        let skipAfter = skip + limit;
        setMore(true);
        setSkip(skipAfter);
    };

    const sellersView = () => {
        if (sellers.length !== 0) {
            return sellers.map((item) => {
                return (
                    <div className='seller-card-wrapper' key={item.userId}>
                        <SellerCard {...item}/>
                    </div>
                );
            });
        } else {
            return <ErrorNotFound title={'sellers'}/>
        }
    };

    const SellerSize = () => {
        return (
            <div className='seller-size'>
                {allItemSize
                    ? <span>Результатов - {allItemSize}</span>
                    : null
                }
            </div>
        )

    };

    const Content = () => {
        return loading
            ? <Spinner/>
            : <div className='sellers'>{sellersView()}</div>
    };

    return (
        <Fragment>
            <Search
                setSkip={setSkip}
                setItemSize={setItemSize}
                setAllItemSize={setAllItemSize}
                setSearchText={setSearchText}
            />
            <SellerSize/>
            <LimitSelect
                limit={limit}
                refreshFunction={setLimit}
            />
            <Content/>
            <LoadMoreBtn
                limit={limit}
                size={itemSize}
                refreshFunction={loadMore}
            />
        </Fragment>
    )
};

export default Sellers;
