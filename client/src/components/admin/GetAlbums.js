import React, {Fragment, useEffect} from "react";
import {getAlbumsFromVk} from "./_api-vk";
import {getMembersFromDB, updateMembersInDB} from "../member/_api-member";
import {createAlbumsToDB} from "../album/_api-album";
import {checkAlbumsNames} from '../admin/_api-check';
import {useDispatch, useSelector} from "react-redux";
import {setCheckThingString} from "../../redux/actions/check.actions";
import {asyncGetMemberAlbums} from "../../redux/actions/checkMember.actions";
import './getAlbums.style.scss';

const GetAlbums = () => {
    const dispatch = useDispatch();
    const check = useSelector(state => state.checker);
    const checkMemberCounters = useSelector(state => state.checker_members);

    useEffect(() => {
        // readCounters()
    }, []);

    // Проверить на закрытие альбомов
    const checkAccessToAlbums = async () => {
        dispatch(setCheckThingString('Albums'));
        dispatch(asyncGetMemberAlbums())
    };


    return (
        <Fragment>

            <div className='album-loader'>
                <div className='album-loader__counters'>
                    <ul className='album-loader__counters-info'>
                        <li>Всего пользователей - {checkMemberCounters.all_members}</li>
                        <li>Есть информация - {checkMemberCounters.with_info}</li>
                        <li>Продавцы - {checkMemberCounters.seller}</li>
                        <li>Скрытые - {checkMemberCounters.closed}</li>
                        <li>Забаненные - {checkMemberCounters.banned}</li>
                        <li>Удалённые - {checkMemberCounters.deleted}</li>

                        <p>Проверяем {check.step} из {
                            checkMemberCounters.all_members -
                            checkMemberCounters.seller -
                            checkMemberCounters.banned -
                            checkMemberCounters.deleted -
                            checkMemberCounters.closed
                        }
                        </p>
                        <span>Статус: {check.status}</span>
                    </ul>

                </div>
                <div className="album-loader__settings">
                    <label>
                        <input
                            id={'seller'}
                            type="checkbox"
                            defaultChecked={false}
                            // onChange={handleChangeChk}
                        />
                        Продавцы
                    </label>
                    <label>
                        <input
                            id={'closed'}
                            type="checkbox"
                            defaultChecked={false}
                            // onChange={handleChangeChk}
                        />
                        Скрытые
                    </label>
                    <label>
                        <input
                            id={'banned'}
                            type="checkbox"
                            defaultChecked={false}
                            // onChange={handleChangeChk}
                        />
                        Забаненные
                    </label>
                    <label>
                        <input
                            id={'deleted'}
                            type="checkbox"
                            defaultChecked={false}
                            // onChange={handleChangeChk}
                        />
                        Удалённые
                    </label>
                    <label>
                        <input
                            id={'others'}
                            type="checkbox"
                            defaultChecked={false}
                            // onChange={handleChangeChk}
                        />
                        Остальные
                    </label>
                </div>
                <div className='album-loader__buttons'>
                    <button className='album-loader__btn-load'
                            onClick={checkAccessToAlbums}
                    >
                        Загрузить альбомы
                    </button>
                </div>


            </div>
        </Fragment>
    )
};

export default GetAlbums;


