import React, {useEffect, useState} from "react";
import GroupCard from "./GroupCard";
import Spinner from "../spinner";
import {getGroupListFromDB} from "./_api-group";

import './group.style.css';

const GroupsList = () => {
    const [loading, setLoading] = useState(true);
    const [groups, setGroups] = useState([]);
    const [groupsCount, setGroupsCount] = useState(0);

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

        loadGroups(groups);

        return () => {
            console.log('exit')
        }
    }, []);


    // const groupsView = groups.map((item) => {
    //     return (
    //         <div className='group-list__item' key={item.group_id}>
    //             <GroupCard item={item} groupsCount={groupsCount} refreshFunction={setGroupsCount}/>
    //         </div>
    //     )
    // });


    const content = loading ? (
        <Spinner/>
    ) : !groups.length ? (
        <span>Вы не добавили ни одной группы</span>
    ) : (
        groups.map((item) => {
            return (
                <div className='group-list__item' key={item.group_id}>
                    <GroupCard item={item} groupsCount={groupsCount} refreshFunction={setGroupsCount}/>
                </div>
            )
        })
    );

    return (
        <div className='group-list'>

            <div className='group-list__item-name'>
                <p>Группы</p>
            </div>
            <div className='group-list__item-titles'>
                {/*<ul className='group-list__item-titles-ul'>*/}
                <p>photo</p>
                <p>id</p>
                <p>name</p>
                <p>members</p>
                <p>actions</p>
                {/*</ul>*/}
            </div>
            {content}
        </div>
    )
};

export default GroupsList;
