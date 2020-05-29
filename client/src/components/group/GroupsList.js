import React, {useEffect, useState} from 'react';
import GroupCard from './GroupCard';
import Spinner from '../spinner';
import {useDispatch, useSelector} from 'react-redux';
import {asyncListGroups} from '../../redux/actions/group.actions';

import './groups.style.scss';

const GroupsList = () => {

    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const groups = useSelector(state => state.groups.groups);

    useEffect(() => {

        dispatch(asyncListGroups());

        setLoading(false);
        return () => {
            console.log('exit');
        };
    }, []);

    const content = loading ? (
        <Spinner/>
    ) ? !groups.length : (
        <span>Вы не добавили ни одной группы</span>
    ) : (
        groups.map((item) => {
            return (
                <div className='group-list__item' key={item.group_id}>
                    {/*<GroupCard item={item} groupsCount={groupsCount} refreshFunction={setGroupsCount}/>*/}
                    <GroupCard item={item}/>
                </div>
            );
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
    );
};

export default GroupsList;
