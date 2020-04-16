import React from "react";
import {NavLink} from 'react-router-dom';
import './seller.style.css';

const SellerCard = ({userId, firstName, lastName, domain, photo, }) => {

    return (
        <NavLink to={'/sellers/' + userId}>
            <div className='seller-card-info'>{firstName} {lastName}</div>
            <div className='seller-card-img'>
                <img src={photo} alt={firstName + ' ' + lastName + ' [' + domain + ']'}/>
            </div>
            <div className='seller-card-id'>id: {userId}</div>
        </NavLink>
    );
};

export default SellerCard;
