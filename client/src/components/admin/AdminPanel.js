import React, {Fragment} from 'react';
import Groups from "../group/Groups";
import GroupsCheck from "../group/GroupsCheck";
import GetPhotos from './GetPhotos';

const AdminPanel = () => {

    return (
        <Fragment>
            <Groups/>
            <GroupsCheck/>
            <GetPhotos/>
        </Fragment>
    )
};

export default AdminPanel;
