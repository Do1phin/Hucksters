// Core
import React, {Fragment} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// React components
import GroupList from '../../components/GroupList/GroupList';
import GroupAdd from '../../components/GroupAdd/GroupAdd';
import {asyncGetGroupMembers} from './groups.actions';
// API
import {getGroupListFromDB} from './groups.api';
// Styles
import '../../styles/groups.style.scss';

const GroupsContainer = () => {

    const dispatch = useDispatch();

    dispatch(getGroupListFromDB());
    const groups = useSelector(state => state.groups);

    return(
        <Fragment>
            <GroupAdd/>
            <GroupList groups={groups}/>
        </Fragment>
    );

};

export default GroupsContainer;
