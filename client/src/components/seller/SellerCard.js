import React, {Fragment} from "react";
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';

import './seller.style.css';

const SellerCard = ({user_id, first_name, last_name, domain, photo}) => {

    return (
        <Fragment>
            <NavLink to={'/sellers/' + user_id}>
                <div className="seller-card-header">
                    <div className='seller-card-header_info'>
                        {first_name}<br/>{last_name}
                    </div>
                </div>

                <div className="seller-card-body">
                    <div className='seller-card-body_img'>
                        <img src={photo} alt={first_name + ' ' + last_name + ' [' + domain + ']'}/>
                    </div>
                </div>

                <div className="seller-card-footer">
                    <div className='seller-card-footer_id'>
                        id: {user_id}
                    </div>
                </div>
            </NavLink>
        </Fragment>
    );
};

SellerCard.propTypes = {
    user_id: PropTypes.number.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    domain: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired
};
export default SellerCard;
