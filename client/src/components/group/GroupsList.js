import React, {Fragment, useEffect, useState} from "react";
import GroupCard from "./GroupCard";
import Spinner from "../spinner";
import {getGroupListFromDB} from "./_api-group";

import './group.style.css';

const GroupsList = (props) => {
    const [groups, setGroups] = useState([]);
    const [groupsCount, setGroupsCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadGroups = () => {
            getGroupListFromDB()
                .then((data) => {
                    console.log('data ' ,data.groups)
                    if (!data) return console.error('GroupsAdd not loaded');
                    setGroups(data.groups);
                    setGroupsCount(data.length);
                    return data
                });
            setLoading(false)
        };

        loadGroups(groups)
    }, [groupsCount]);



    const groupsView = groups.map((item) => {
        return (
            <div className='group-card-wrapper' key={item.groupId}>
                <GroupCard item={item} groupsCount={groupsCount} refreshFunc={setGroupsCount}/>
            </div>
        )
    });

    const Content = () => {
        return loading ? <Spinner/> : (groupsView && <span>Нет групп для отображения</span>)
    };

    return(
        <Fragment>
            <Content/>
        </Fragment>
    )

};

export default GroupsList;
