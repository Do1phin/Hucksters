// Core
import React, {Fragment} from 'react';
// React components
import GroupAdd from '../../components/GroupAdd/GroupAdd';
import GroupList from '../../components/GroupList/GroupList';
import CheckGroup from '../../components/group/CheckGroup';
import GetComments from '../../components/admin/GetComments';
import GetPhotos from '../../components/admin/GetPhotos';
import Counters from '../../components/Counters/Counters';

const AdminPanelContainer = () => {

    return (
        <Fragment>
            <GroupAdd/>
            <GroupList/>
            <Counters/>
            <CheckGroup/>
            <GetPhotos/>
            <GetComments/>
        </Fragment>
    );
};

export default AdminPanelContainer;
