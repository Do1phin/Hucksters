import React, {Fragment} from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';

import './members.style.scss';

const MemberCard = ({owner_id, first_name, last_name, domain, photo}) => {

    return (
        <Fragment>
            <NavLink to={'/members/' + owner_id}>
                <div className="member-card__header">
                    <div className='member-card__header_info'>
                        {first_name}<br/>{last_name}
                    </div>
                </div>

                <div className="member-card__body">
                    <div className='member-card__body_img'>
                        <img
                            src={photo}
                            alt={first_name + ' ' + last_name + ' [' + domain + ']'}/>
                    </div>
                </div>

                <div className="member-card__footer">
                    <div className='member-card__footer_id'>
                        id: {owner_id}
                    </div>
                </div>
            </NavLink>
        </Fragment>
    );
};

MemberCard.propTypes = {
    owner_id: PropTypes.number.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    domain: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired
};
export default MemberCard;
