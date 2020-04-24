import React, {Fragment, useEffect, useState} from "react";
import Spinner from "../spinner";
import GroupCard from "./GroupCard";
import './group.style.css';
import {getGroupInfo, groupCreate, groupList, getGroupSize} from "./api-group";

const Groups = () => {
    const [groups, setGroups] = useState([]);
    const [groupId, setGroupId] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadGroups();
    }, []);

    const loadGroups = () => {
        groupList()
            .then((data) => {
                if (!data) {
                    return console.error('Groups not loaded')
                } else {
                    setGroups([...data.groups]);
                    return data
                }
            });
        setLoading(false)
    };

    const addGroup = ({groupObj}) => new Promise((resolve, reject) => {

        return groupCreate(groupObj)
            .then((data) => {
                if (!data) {
                    return console.error('Group not created')
                } else {
                    return data
                }
            })
    });

    const handleChange = (event) => {
        setGroupId(event.target.value);
    };

    const handleClick = async (event) => {
        event.preventDefault();
        Promise.resolve(groupId)
            .then(getGroupInfo)
            .then(getGroupSize)
            .then(addGroup)

    };

    const handleRemoveBtn = async (event) => {
        const url = '/vk/group/remove';
        const groupId = event.target.id;
        const newGroups = await groups.filter((item) => !item.groupId);

        try {
            fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({groupId})
            })
                .then((res) => {
                    if (res) return console.error('Group not deleted');
                    return console.info('Group deleted successfully')
                })
        } catch (e) {

        }
        setGroups(newGroups);
    };

    const groupsView = groups.map((item) => {
        return (
            <div className='group-card-wrapper' key={item.groupId}>
                <GroupCard {...item}/>
            </div>
        )

    });

    const isDisabled = groups.some((item) => item.groupId === +groupId);

    const Content = () => {
        return loading ? <Spinner/> : groupsView
    };

    return (
        <Fragment>
            <div className='group-add'>
                <div className='group-add_input'>
                    <span>Введите id группы</span>
                    <input
                        value={groupId}
                        onChange={handleChange}
                    />
                    <button
                        disabled={isDisabled}
                        onClick={handleClick}
                    >
                        Добавить
                    </button>
                </div>

                <Content/>
            </div>
        </Fragment>
    )
};

export default Groups;
