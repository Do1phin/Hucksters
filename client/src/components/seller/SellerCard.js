import React, {Fragment} from "react";
import {NavLink} from 'react-router-dom';
import './seller.style.css';

const SellerCard = ({userId, firstName, lastName, domain, photo,}) => {

    return (
        <Fragment>
            <NavLink to={'/sellers/' + userId}>
                <div className="seller-card-header">
                    <div className='seller-card-header_info'>
                        {firstName}<br />{lastName}
                    </div>
                </div>

                <div className="seller-card-body">
                    <div className='seller-card-body_img'>
                        <img src={photo} alt={firstName + ' ' + lastName + ' [' + domain + ']'}/>
                    </div>
                </div>

                <div className="seller-card-footer">
                    <div className='seller-card-footer_id'>
                        id: {userId}
                    </div>
                </div>
            </NavLink>
        </Fragment>
    );
};

export default SellerCard;
