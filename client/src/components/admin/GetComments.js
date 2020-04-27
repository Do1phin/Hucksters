import React, {Fragment} from "react";
import {getPhotosFromDb} from '../photo/api-photo';
import {addCommentsToDb} from '../comment/api-comment';
import {getCommentsFromVk} from "./api-vk";

const GetComments = () => {

    const getAllComments = async () => {
    try {
        let items, itemSize;
        await Promise.resolve()
            .then(getPhotosFromDb)
            .then((response) => {
                console.log('resp ', response)
                    items = response;
                    itemSize = response.itemSize;
                })

        console.log('items ', items, itemSize)
        let count = 0;
        await (function f() {
            console.info(`Step ${count} from ${itemSize}`);
            if (count < itemSize) {
                const photoObj = items.photos[count];
                console.log('photoOgh ', photoObj)

                Promise.resolve(photoObj)
                    .then(getCommentsFromVk)
                    .then(addCommentsToDb)
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
            <button
                onClick={getAllComments}
            >
                Получить комментарии из ВК
            </button>
        </Fragment>
    )
};

export default GetComments;
