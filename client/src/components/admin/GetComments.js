import React, {Fragment, useState} from "react";
import {APIReadPhotosFromDB, APIUpdateCounterForAddedPhotos} from '../../containers/Photos/photos.api';
import {addCommentsToDb, checkCommentsBeforeAdd} from '../comment/_api-comment';
import {getCommentsFromVk} from "./_api-vk";
import {readCountersFromDB} from "../Counters/counters.api";

const GetComments = () => {
    // const [loading, setLoading] = useState(true);
    const [checkStatus, setCheckStatus] = useState('');
    const [checkCount, setCheckCount] = useState(0);
    const [counters, setCounters] = useState({
        all_photos: 0,
        photo_with_text: 0,
        photo_with_addit_photo: 0,
    });

    const getAllComments = async () => {

        // let source;
        try {

            let items, itemSize;
            await Promise.resolve()
                .then(() => {
                    setCheckStatus('Получение счётчиков из базы');
                    return null;
                }).then(readCountersFromDB)
                .then((response) => {
                    setCounters({...response});
                    return counters
                })
                .then(APIReadPhotosFromDB)
                .then((response) => {
                    // source = response.photos;
                    items = response.photos;
                    itemSize = response.photos.length;
                });

            let count = 0;
            await (function f() {

                setCheckCount(count);

                console.info(`Step ${count} from ${itemSize}`);
                if (count < itemSize) {
                    const photoObj = items[count];
                    console.log('photoObj photoObj ', photoObj)

                    Promise.resolve(photoObj)
                        .then(() => {
                            setCheckStatus('Получаем комментарии из ВК');
                            return photoObj
                        }).then(getCommentsFromVk)
                        .then(response => {
                            setCheckStatus('Проверяем комментарии перед добавлением');
                            console.log('resp ', response);
                            return response
                        }).then(checkCommentsBeforeAdd)
                        .then(response => {
                            setCheckStatus('Добавляем комментарии в базу');
                            console.log('resp 2 ', response);
                            return response
                        }).then(addCommentsToDb)
                        .then(response => {
                            setCheckStatus('Обновляем счётчик доп.фото');
                            console.log('resp 3 ', response);
                            return response
                        }).then(APIUpdateCounterForAddedPhotos)
                        .catch((err) => console.error(err));

                    count++;
                    setTimeout(f, 1000);
                } else {
                    console.log('All members added');
                }
            }());
        } catch (e) {
            throw new Error(e)
        }
    };

    return (
        <Fragment>
            <div className='comment-loader'>
                <div className='comment-loader__counters'>
                    <ul className='comment-loader__buttons'>
                        <li>Всего фотографий - {counters.all_photos}</li>
                        <li>С описанием - {counters.photo_with_text}</li>
                        <li>С доп.фото - {counters.photo_with_addit_photo}</li>

                        <p>Проверяем {checkCount} из {counters.all_photos}</p>
                        <span>Статус: {checkStatus}</span>
                    </ul>

                </div>
                <div className='comment-loader__buttons'>

                    <button
                        onClick={getAllComments}
                    >
                        Загрузить комментарии
                    </button>
                </div>
            </div>
        </Fragment>
    )
};

export default GetComments;
