import React, {Fragment} from 'react';
import {call} from "./api-vk";

const GetPhotosAndComments = () => {

    const getAlbumsFromDb = () => new Promise((resolve, reject) => {


    });

    return(
        <Fragment>
            <button
                onClick={getAlbumsFromDb}
            >
                Собрать фото и комментарии
            </button>

        </Fragment>
    )

};

export default GetPhotosAndComments;
