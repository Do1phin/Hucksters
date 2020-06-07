// Core
import React, {Fragment, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// React components
import GroupList from '../../components/GroupList/GroupList';
import GroupAdd from '../../components/GroupAdd/GroupAdd';
import {GroupMembersGetAsyncAction, GroupsFillAsyncAction} from './groups.actions';
// Styles
import '../../styles/groups.style.scss';

const GroupsContainer = () => {

    const dispatch = useDispatch();

    const groups = useSelector(state => state.groups.groups);

    useEffect(() => {
        dispatch(GroupsFillAsyncAction());
    }, []);

    return(
        <Fragment>
            <GroupAdd/>
            <GroupList groups={groups}/>
        </Fragment>
    );
};

export default GroupsContainer;
