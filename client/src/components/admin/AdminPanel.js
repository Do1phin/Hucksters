import React, {Fragment} from 'react';
import Groups from "../group/Groups";
import GroupsCheck from "../group/GroupsCheck";
import GetPhotos from './GetPhotos';
import GetComments from "./GetComments";

const AdminPanel = () => {

    return (
        <Fragment>
            <Groups/>
            <GroupsCheck/>
            <GetPhotos/>
            <GetComments/>
        </Fragment>
    )
};

export default AdminPanel;
