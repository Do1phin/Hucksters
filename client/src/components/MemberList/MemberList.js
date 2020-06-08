// Core
import React from 'react';
import PropTypes from 'prop-types';
// React components
import MemberCard from '../MemberCard/MemberCard';

const MemberList = (props) => {

    const members = props.members;

    return members.map((item) => (
        <div className='member-card__item' key={item.owner_id}>
            <MemberCard {...item}/>
        </div>
    ));
};

export default MemberList;

MemberList.propTypes = {
    members: PropTypes.array.isRequired
};

MemberList.defaultProps = {
    members: []
};
