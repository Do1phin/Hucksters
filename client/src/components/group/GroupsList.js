import React, {Fragment, useEffect, useState} from "react";
import GroupCard from "./GroupCard";
import Spinner from "../spinner";
import {getGroupListFromDB} from "./_api-group";

import './group.style.css';

const GroupsList = () => {
    const [groups, setGroups] = useState([]);
    const [groupsCount, setGroupsCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadGroups = () => {
            getGroupListFromDB()
                .then((data) => {
                    if (!data) return console.error('GroupsAdd not loaded');
                    setGroups(data);
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
                <GroupCard item={item} groupsCount={groupsCount} refreshFunction={setGroupsCount}/>
            </div>
        )
    });

    const Content = () => {
        return loading ? <Spinner/> : (groups.length ? groupsView : <span>Вы не добавили ни одной группы</span>)
    };

    return(
        <Fragment>
            <Content/>
        </Fragment>
    )
};

export default GroupsList;
