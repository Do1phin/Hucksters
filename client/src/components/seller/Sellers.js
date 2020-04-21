import React, {Fragment, useEffect, useState} from "react";
import {list} from './api-seller';
import SellerCard from "./SellerCard";
import Spinner from '../spinner';
import './seller.style.css';
import Search from "../search/Search";
import LimitSelect from "../UI/LimitSelect/LimitSelect";

const Sellers = () => {
    const [loading, setLoading] = useState(true);
    const [sellers, setSellers] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [sellerSize, setSellerSize] = useState(0);
    const [allSellerSize, setAllSellerSize] = useState(0);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(100);

    let source;

    useEffect(() => {

        const variables = {
            firstName: searchText,
            skip,
            limit
        };

        loadSellers(variables)
    }, [searchText, limit, skip]);

    const updateSearchText = (newSearchText) => {
        if (newSearchText !== searchText) {
            setSkip(0);
            setSellerSize(0);
            setAllSellerSize(0);
        }
        setSearchText(newSearchText);
    };


    const loadSellers = (variables) => {
        list(variables)
            .then(data => {
                source = data;

                if (data) {
                    if (variables.loadMore) {
                        setSellers([...sellers, ...source.sellers]);
                    } else {
                        setSellers(source.sellers);
                    }
                    setSellerSize(source.sellerSize);
                    setAllSellerSize(allSellerSize + source.sellerSize);
                    setLoading(false);
                }
            })
    };

    const loadMore = () => {

        let skipAfter = skip + limit;

        const variables = {
            firstName: searchText,
            skip: skipAfter,
            limit,
            loadMore: true
        };

        loadSellers(variables);
        setSkip(skipAfter);
    };

    const sellersView = sellers.map((item) => {
        return (
            <div className='seller-card-wrapper' key={item.userId}>
                <SellerCard {...item}/>
            </div>
        );
    });

    let content = loading ? <Spinner/> : sellersView;

    return (
        <Fragment>
            <Search
                refreshFunction={updateSearchText}
            />

            <div className='seller-size'>
                {allSellerSize
                    ? <span>Результатов - {allSellerSize}</span>
                    : null
                }
            </div>

            <LimitSelect limit={limit} refreshFunction={setLimit}/>

            <div className='sellers'>
                {content}
            </div>

            {sellerSize >= limit
                ? <div className='seller-load-more'>
                    <button
                        className='load-more-button'
                        onClick={loadMore}
                    >
                        Показать ещё
                    </button>
                </div>
                : null
            }
        </Fragment>
    )
};

export default Sellers;
