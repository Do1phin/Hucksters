import React, {useEffect, useState} from "react";
import {list} from './api-seller';
import SellerCard from "./SellerCard";
import Spinner from '../spinner';
import './seller.style.css';

const Sellers = (props) => {
    const [loading, setLoading] = useState(true);
    const [sellers, setSellers] = useState([]);

    const userId = props.match.params.userId;

    useEffect(() => {
        loadSellers()
    }, []);


    const loadSellers = () => {
        const prms = userId ? {seller: true} : {userId: userId};

        list(
            prms
        )
            .then(data => {
                if (!data.error) {
                    setSellers(data);
                    setLoading(false);
                }
            })
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
        <div className='sellers'>
            {console.log('params ', props.match.params.userId)}
            {content}
        </div>
    )
};

export default Sellers;
