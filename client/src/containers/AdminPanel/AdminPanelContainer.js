// Core
import React, {Fragment} from 'react';
// React components
import CheckGroup from '../../components/group/CheckGroup';
import GetComments from '../../components/admin/GetComments';
import GetPhotos from '../../components/admin/GetPhotos';
import Counters from '../../components/Counters/Counters';
import GroupsContainer from '../Groups/GroupsContainer';

const AdminPanelContainer = () => {

    return (
        <Fragment>
            <GroupsContainer/>

            <Counters/>
            <CheckGroup/>
            <GetPhotos/>
            <GetComments/>
        </Fragment>
    );
};

export default AdminPanelContainer;
