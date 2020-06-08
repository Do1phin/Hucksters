// Core
import React from 'react';
import PropTypes from 'prop-types';
// React components
import GroupCard from '../GroupCard/GroupCard';

const GroupList = (props) => {

    const groups = props.groups;

    const content = () => {
        return (
            groups.map((item) => {

                return (
                    <div className='group-list__item' key={item.group_id}>
                        {/*<GroupCard item={item} groupsCount={groupsCount} refreshFunction={setGroupsCount}/>*/}
                        <GroupCard item={item}/>
                    </div>
                );
            })
        );
    };

    return (
        <div className='group-list'>

            <div className='group-list__item-name'>
                <p>Группы</p>
            </div>
            <div className='group-list__item-titles'>
                {/*<ul className='group-list__item-titles-ul'>*/}
                <p>photo</p>
                <p>id</p>
                <p>name</p>
                <p>members</p>
                <p>actions</p>
                {/*</ul>*/}
            </div>

            {content()}

        </div>
    );
};

export default GroupList;

GroupList.propTypes = {
    groups: PropTypes.array.isRequired
};
