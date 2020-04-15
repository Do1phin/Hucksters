import React from "react";
import {NavLink} from 'react-router-dom';
import './seller.style.css';

const SellerCard = ({vkId, firstName, lastName, avatar}) => {

    return (
        <NavLink to={'/sellers/' + vkId}>
            <div className='seller-card-info'>Имя Фамилия</div>
            <div className='seller-card-img'>
                <img src={avatar} alt={firstName + ' ' + lastName}/>
            </div>
            <div className='seller-card-id'>id: {vkId}</div>
        </NavLink>
    );
};

export default SellerCard;
