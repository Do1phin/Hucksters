// Core
import React, {Fragment, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// React components
import GroupList from '../../components/GroupList/GroupList';
import GroupAdd from '../../components/GroupAdd/GroupAdd';
import Spinner from '../../components/Spinners/GeneralSpinner';
// React actions
import {GroupsFillAsyncAction} from './groups.actions';
// Styles
import '../../styles/groups.style.scss';

const GroupsContainer = () => {

    const dispatch = useDispatch();

    const groups = useSelector(state => state.groups);

    useEffect(() => {
        dispatch(GroupsFillAsyncAction());
    }, [dispatch]);

    return (
        <Fragment>
            <GroupAdd/>
            {
                !groups.groups.length
                    ? <Spinner/>
                    : (
                        <GroupList groups={[...groups.groups]}/>
                    )
            }

        </Fragment>
    );
};

export default GroupsContainer;
