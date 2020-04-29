import React, {Fragment, useEffect, useState} from 'react';
import {getGroupListFromDB} from "../group/_api-group";
import GroupsAdd from "../group/GroupsAdd";
import GroupsCheck from "../group/GroupsCheck";
import GroupsList from "../group/GroupsList";
import GetComments from "./GetComments";
import GetPhotos from "./GetPhotos";

const AdminPanel = () => {

    return (
        <Fragment>
            <GroupsAdd/>
            <GroupsList/>
            <GroupsCheck/>
            <GetPhotos/>
            <GetComments/>

        </Fragment>
    )
};

export default AdminPanel;
