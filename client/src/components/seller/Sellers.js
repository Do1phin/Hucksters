import React, {Fragment, useEffect, useState} from "react";
import {list} from './api-seller';
import SellerCard from "./SellerCard";
import Spinner from '../spinner';

const Sellers = () => {
    const [loading, setLoading] = useState(true);
    const [sellers, setSellers] = useState([]);

    useEffect(() => {
        loadSellers()
    }, []);

    const loadSellers = () => {
        list({
            seller: true
        })
            .then(data => {
                if (!data.error) {
                    setSellers(data);
                    setLoading(false);
                }
            })
    };

    const sellersView = sellers.map((item) => {
        return (
            <li key={item.vkId}>
                <SellerCard {...item}/>
            </li>
        );
    });

    let content = loading ? <Spinner/> : sellersView;

    return (
        <Fragment><br/>
            <ul>
                {content}
            </ul>
        </Fragment>
    )
};

export default Sellers;
