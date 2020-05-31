import React, {Fragment, useState} from "react";
import {getAlbumsFromDB} from "../../containers/Albums/albums.api";
import {addPhotosToDb} from '../../containers/Photos/photos.api';
import {getPhotosFromVk} from "./_api-vk";
import {readCountersFromDB} from "./_api-counters";

const GetPhotos = () => {
    const [loading, setLoading] = useState(false);
    const [photos, setPhotos] = useState([]);
    const [checkStatus, setCheckStatus] = useState('');
    const [checkCount, setCheckCount] = useState(0);
    const [counters, setCounters] = useState({
        all_albums: 0,
    });

    const getAllPhotos = async () => {
        setLoading(true);
        try {

            let items, itemSize;
            await Promise.resolve()
                .then(() => {
                    setCheckStatus('Получение счётчиков из базы');
                    return null
                }).then(readCountersFromDB)
                .then((response) => {
                    const {all_albums} = response;
                    setCounters({all_albums});
                    setCheckStatus('Получение всех альбомов из базы');
                    return {
                        info: 'check_all'
                    }
                }).then(getAlbumsFromDB)
                .then((response) => {
                    items = response;
                    itemSize = items.length;
                });

            let count = 0;
            await (function f() {
                setCheckCount(count);

                if (count < itemSize) {
                    const albumObj = items[count];

                    Promise.resolve(albumObj)
                        .then(() => {
                            setCheckStatus('Получение фотографий пользователя ' + albumObj.album_id);
                            return albumObj // объект альбома
                        }).then(getPhotosFromVk)
                        .then((response) => {
                            setCheckStatus('Сохранение фотографий в базу');
                            return response // массив фотографий
                        }).then(addPhotosToDb)
                        .catch((err) => console.error(err));

                    count++;
                    setTimeout(f, 10000);
                } else {
                    console.log('All members added');
                }
            }());
        } catch (e) {
            console.log('er ', e);
            throw new Error(e)
        }
        setLoading(false);
    };

    return (
        <Fragment>
            <div className='photo-loader'>
                <div className='photo-loader__counters'>
                    <ul className='photo-loader__counters-info'>
                        <li>Всего альбомов - {counters.all_albums}</li>

                        <p>Проверяем {checkCount} из {counters.all_albums}</p>
                        <span>Статус: {checkStatus}</span>
                    </ul>

                </div>
                <div className='photo-loader__buttons'>
                    <button className='photo-loader__btn-load'
                            onClick={getAllPhotos}
                    >
                        Загрузить фотографии
                    </button>
                </div>
            </div>
        </Fragment>
    )
};

export default GetPhotos;
