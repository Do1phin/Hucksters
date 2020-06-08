// Core
import React, {Fragment} from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
// Styles
import '../../styles/members.style.scss';

const MemberCard = (props) => {

    const {owner_id, first_name, last_name, domain, photo} = props;

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

export default MemberCard;

MemberCard.propTypes = {
    owner_id: PropTypes.number.isRequired,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    domain: PropTypes.string,
    photo: PropTypes.string
};

MemberCard.defaultProps = {
    owner_id: '',
    first_name: '',
    last_name: '',
    domain: '',
    photo: ''
};
