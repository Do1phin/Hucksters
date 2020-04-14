import React from "react";
import { NavLink } from 'react-router-dom';

const SellerCard = ({vkId, firstName, lastName, avatar}) => {

    return (
        <div className='seller-card'>
            <NavLink to={'/sellers/' + vkId}>
                <strong>id: {vkId}</strong>
                <img src={avatar} alt={firstName + ' ' + lastName}/>
                <span>Имя Фамилия</span>
            </NavLink>
        </div>
    );
};

export default SellerCard;
