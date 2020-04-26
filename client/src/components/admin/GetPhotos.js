import React, {Fragment} from "react";
import {list} from '../album/api-album';

const GetPhotos = () => {

    const getPhotosAndComments = async () => {
        await list()
            .then((data) => {
                if (!data) console.log('error')
                console.log(data)
            })
    };

    return (
        <Fragment>
            <button
                onClick={getPhotosAndComments}
            >
                Получить фотографии и комментарии
            </button>
        </Fragment>
    )
};

export default GetPhotos;
