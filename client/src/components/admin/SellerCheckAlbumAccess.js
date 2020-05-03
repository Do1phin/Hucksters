import React, {Fragment, useState} from "react";
import {call} from "./_api-vk";
import {getMembersFromDB} from "../seller/_api-seller";

import './sellerCheckAlbumAccess.style.css';

const SellerCheckAlbumAccess = () => {
    const [members, setMembers] = useState(null);
    const [checkStatus, setCheckStatus] = useState('');
    const [checkCount, setCheckCount] = useState(0);
    const [membersInfo, setMembersInfo] = useState({
        all_sellers: 10000,
        banned: 0,
        deleted: 0,
        closed: 0,
        seller: 0,
    });

    let source;

    let albumTitleKeys = ['дорого', 'скидк', 'в наличи', 'футболк', 'поло', 'ремни', 'галстук', 'одежда',
        'продаж', 'new', 'о б н о в а', 'обнова', 'o b n o v a', 'куртк', 'ветровк', 'пальто', 'плащ',
        'обувь', 'свитер', 'кардиган', 'худи', 'свитшот', 'олимпийк', 'рубашк', 'рубах', 'джинс', 'чинос', 'брюк',
        'пиджак', 'костюм', 'майк', 'аксессуар', 'женск', 'шорты', 'низ', 'верх', 'взуття', 'одяг', 'обновление',
        'в наявност', 'обновка', 'кепк', 'шапк', 'есть', 'в продаж', 'мужское', 'о б у в ь', 'а к с е с с у а р ы',
        'о б н о в л е н и е', 'наличи', 'C L O T H I N G', 'новые',
    ];

    const checkAccessToAlbums = async () => {
        console.log('start');
        try {
            setCheckStatus('Получение пользователей из базы');
            await Promise.resolve([])
                // .then(getMembersSizesFromDB)
                .then(getMembersFromDB)
                .then((result) => {
                    source = result.sellers;
                });

            async function action(i) {
                let user_id = source[i].user_id;
                setCheckCount(i);

                await Promise.resolve(user_id)
                    .then(getMemberAlbums)
                    .then(checkAlbumsNames)
                    .then(createAlbumsToDB)
                    .then(updateMemberInfo)
                    .catch((err) => console.error(`Member with id ${user_id} does not checked`, err));
            }

            for (let i = 1; i <= membersInfo.all_sellers; i++) {
                setTimeout(action, i * 1000, i);
            }

            console.log('finish')
        } catch (e) {
            console.log('e ', e)

        }
    };

    const getSizesMembers = (user_id) => new Promise((resolve, reject) => {
        setCheckStatus('Получение пользователей...');
        console.info('getSizesMembers')
        const body = {limit: 1000, skip: 0, first_name: ''};

        try {
            fetch('./sellers', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            }).then((response) => response.json())
                .then((data) => {
                    console.log('data ', data)
                    setMembersInfo({...data.itemSize});
                    setMembers(data.sellers);
                    setCheckStatus('Пользователи получены успешно!');
                    resolve(data.sellers)
                })
        } catch (e) {
            setCheckStatus('Ошибка получения пользователей!');
            reject(e)
        }
    });

    const getMemberAlbums = (user_id) => new Promise((resolve, reject) => {
        setCheckStatus('Получение информации пользователя ' + user_id);
        console.log('getMemberAlbums')
        const params = {
            owner_id: user_id,
            need_covers: 1,
            photo_sizes: 1,
            count: 1000,
            v: 5.103
        };

        try {
            call('photos.getAlbums', params)
                .then((data) => {
                    if (!data || !data.response.count) {
                        reject('(reject - empty)')
                    } else {
                        setCheckStatus(' - пользователь ' + user_id + ' успешно обработан!');
                        resolve(data.response.items)
                    }
                }).catch((err) => {
                setCheckStatus(' - пользователь ' + user_id + ' не обработан!');
                reject(err)
            })
        } catch (e) {
            reject(e)
        }

    });

    const checkAlbumsNames = (albumsArray) => new Promise((resolve, reject) => {
        console.log('checkAlbumsNames', albumsArray)
        setCheckStatus('Проверка альбомов пользователя');
        let arr = [];

        albumsArray.map((item) => {
            albumTitleKeys.map((element) => {
                if (item.title.toLowerCase().includes(element.toLowerCase()) && !arr.includes(item)) {
                    console.log(element, item);
                    arr.push(item)
                }
                return null
            });
            return null
        });
        if (!arr) reject('(array is empty');
        resolve(arr);
    });

    const createAlbumsToDB = (albumsArray) => new Promise((resolve, reject) => {
        console.log('addAlbumsToDB')
        setCheckStatus('Добавление альбомов в базу');
        if (!albumsArray) reject('(empty albums)');

        albumsArray.map((item) => {
              try {
                // const body = item;
                fetch('/albums/create', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(item)
                }).then((response) => response.json())
                    .then(data => {
                        console.log('data ', data)
                        console.log('item ', item)
                        resolve(item.owner_id)
                    })
            } catch (e) {
                reject(e)
            }
            return null
        });
        return null
    });

    const updateMemberInfo = (user_id) => new Promise((resolve, reject) => {
        console.log('updateMemberInfo', user_id)
        setCheckStatus('Обновление информации о пользователе ' + user_id);

        try {
            const body = {user_id, info: 'seller'};
            fetch('/sellers/update', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            }).then((response) => response.json())
                .then((data) => {
                    resolve('updated')
                })
        } catch (e) {
            reject(e)
        }
    });

    const createCountersToDB = () => new Promise((resolve, reject) => {
        try {
            fetch('/vk/info/create', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
            }).then((response) => {
                console.log('reso ', response)
                // setMembersInfo(response.json())
                resolve(response)
            })
        } catch (e) {
            reject(e)
        }
    });

    const readCountersToDB = () => {
        try {
            fetch('/vk/info')
                .then((response) => {
                    console.info('response 555', response)
                    // console.log('response ', response)
                }).then(data => console.info(data))
                .catch((err) => {
                    console.log('err ', err)
                    // reject(err)
                })
        } catch (e) {
            console.error(e)
        }
    };

    return (
        <Fragment>
            <div className='check-panel'>
                <div className='check-panel__counters'>
                    <ul className='check-panel__counters-info'>
                        <li>Всего пользователей - {membersInfo.all_sellers}</li>
                        <li>Продавцы - {membersInfo.seller}</li>
                        <li>Скрытые - {membersInfo.closed}</li>
                        <li>Забаненные - {membersInfo.banned}</li>
                        <li>Удалённые - {membersInfo.deleted}</li>

                        <p>Проверяем {checkCount} из {membersInfo.all_sellers - membersInfo.seller - membersInfo.banned -
                        membersInfo.deleted - membersInfo.closed}</p>
                        <span>Статус: {checkStatus}</span>

                    </ul>

                    <div className='check-panel__counters-buttons'>
                        <button className='check-panel__create'
                                onClick={createCountersToDB}
                        >
                            Создать счётчики данных
                        </button>
                        <button className='check-panel__refresh'
                                onClick={readCountersToDB}
                        >
                            Обновить счётчики
                        </button>
                    </div>
                </div>
                <div className='check-panel__buttons'>
                    <button className='check-panel__check-albums'
                            onClick={checkAccessToAlbums}
                    >
                        Проверить на закрытие альбомов
                    </button>
                </div>




            </div>
        </Fragment>
    )
};

export default SellerCheckAlbumAccess;


