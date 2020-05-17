import React, {Fragment, useEffect, useState} from "react";
import {getAlbumsFromVk} from "./_api-vk";
import {createCountersToDB, readCountersFromDB} from './_api-counters';
import {getMembersFromDB, updateMembersInDB} from "../member/_api-member";
import {createAlbumsToDB} from "../album/_api-album";
import {checkAlbumsNames} from '../admin/_api-check';

import './getAlbums.style.scss';

const GetAlbums = () => {
    const [checkStatus, setCheckStatus] = useState('');
    const [checkCount, setCheckCount] = useState(0);
    const [counters, setCounters] = useState({
        all_members: 0,
        banned: 0,
        deleted: 0,
        closed: 0,
        seller: 0,
    });

    useEffect(() => {
        readCounters()
    }, []);

    // Проверить на закрытие альбомов
    const checkAccessToAlbums = async () => {

        try {
            let source;
            await Promise.resolve([])
                .then(() => {
                    setCheckStatus('Получение счётчиков из базы');
                    return null
                }).then(readCounters)
                .then((response) => {
                    setCheckStatus('Получение пользователей из базы');
                    return []
                }).then(getMembersFromDB)
                .then((response) => {
                    source = response; // массив продавцов
                    return source
                });

            async function action(i) {
                setCheckCount(i);

                let obj = {
                    owner_id: source[i].owner_id,
                    info: 'check_one'
                };

                await Promise.resolve(obj)
                    .then(() => {
                        setCheckStatus('Получение альбомов из ВК');
                        return obj
                    }).then(getAlbumsFromVk)
                    .then((data) => {
                        setCheckStatus('Проверка полученных альбомов на ключи');
                        return data // массив альбомов
                    }).then(checkAlbumsNames)
                    .then((data) => {
                        setCheckStatus('Добавление альбомов в базу');
                        return data // массив отобранных альбомов
                    }).then(createAlbumsToDB)
                    .then(() => {
                        let membersArray = [];
                        membersArray.push(obj);
                        setCheckStatus('Изменение информации о пользователе');
                        return membersArray // массив где id и тело пользователя
                    }).then(updateMembersInDB)
                    .catch((err) => console.error(`Member with id ${source[i].owner_id} does not checked`, err));
            }

            for (let i = 1; i <= counters.all_members; i++) {
                setTimeout(action, i * 1000, i);
            }
        } catch (e) {
            console.error(e)

        }
    };

    const createCounters = () => {
        createCountersToDB()
            .then((response) => {
                return response.json()
            }).then((data) => {
            const {
                all_members, banned, deleted, closed, seller, all_albums, all_photos, photo_with_text,
                photo_with_addit_photo
            } = data;
            let tempCount = {
                all_members,
                banned,
                deleted,
                closed,
                seller,
                all_albums,
                all_photos,
                photo_with_text,
                photo_with_addit_photo
            };
            setCounters(tempCount);
        }).catch((err) => console.error(err))
    };

    const readCounters = async () => {
        await readCountersFromDB()
            .then((response) => {
                return response
            }).then((data) => {
                const {all_members, banned, deleted, closed, seller} = data;
                setCounters({all_members, banned, deleted, closed, seller});
            }).catch((err) => console.error(err));
    };


    return (
        <Fragment>
            <div className='album-loader__counters-buttons'>
                <button className='album-loader__btn-create'
                        onClick={createCounters}
                >
                    Создать счётчики
                </button>
                <button className='album-loader__btn-refresh'
                        onClick={readCounters}
                >
                    Получить счётчики
                </button>

            </div>
            <div className='album-loader'>
                <div className='album-loader__counters'>
                    <ul className='album-loader__counters-info'>
                        <li>Всего пользователей - {counters.all_members}</li>
                        <li>Продавцы - {counters.seller}</li>
                        <li>Скрытые - {counters.closed}</li>
                        <li>Забаненные - {counters.banned}</li>
                        <li>Удалённые - {counters.deleted}</li>

                        <p>Проверяем {checkCount} из {counters.all_members - counters.seller - counters.banned -
                        counters.deleted - counters.closed}
                        </p>
                        <span>Статус: {checkStatus}</span>
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


