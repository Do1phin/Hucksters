import React, {Fragment, useEffect, useState} from "react";
import {list} from './api-seller';
import SellerCard from "./SellerCard";
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
            firstName: searchText,
            skip,
            limit
        };

        const loadSellers = (variables) => {
            list(variables)
                .then(data => {

                    if (data) {
                        setItemSize(data.itemSize);

                        if (more) {
                            setSellers([...sellers, ...data.sellers]);
                            setAllItemSize(allItemSize + data.itemSize);
                        } else {
                            setSellers(data.sellers);
                            setAllItemSize(data.itemSize);
                        }
                        setLoading(false);
                    }
                })
        };

        loadSellers(variables);
        setMore(false);
    }, [searchText, limit, skip]);

    const updateSearchText = (newSearchText) => {
        if (newSearchText !== searchText) {
            setSkip(0);
            setItemSize(0);
            setAllItemSize(0);
        }
        setSearchText(newSearchText);
    };

    const loadMore = () => {
        let skipAfter = skip + limit;
        setMore(true);
        setSkip(skipAfter);
    };

    const sellersView = sellers.map((item) => {
        return (
            <div className='seller-card-wrapper' key={item.userId}>
                <SellerCard {...item}/>
            </div>
        );
    });

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
        return loading ? <Spinner/> : <div className='sellers'>{sellersView}</div>
    };

    return (
        <Fragment>
            <Search refreshFunction={updateSearchText}/>
            <SellerSize/>
            <LimitSelect limit={limit} refreshFunction={setLimit}/>
            <Content/>
            <LoadMoreBtn limit={limit} size={itemSize} refreshFunction={loadMore}/>
        </Fragment>
    )
};

export default Sellers;
