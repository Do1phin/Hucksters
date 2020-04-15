import React, {useEffect, useState} from "react";
import {list} from './api-seller';
import SellerCard from "./SellerCard";
import Spinner from '../spinner';
import './seller.style.css';

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
            <div className='seller-card-wrapper' key={item.vkId}>
                <SellerCard {...item}/>
            </div>
        );
    });

    let content = loading ? <Spinner/> : sellersView;

    return (
        <div className='sellers'>
            {content}
        </div>
    )
};

export default Sellers;
