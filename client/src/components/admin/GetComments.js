import React, {Fragment} from "react";
import {getPhotosFromDB, updateAddPhotosCount} from '../photo/_api-photo';
import {addCommentsToDb, checkCommentsBeforeAdd} from '../comment/_api-comment';
import {getCommentsFromVk} from "./_api-vk";

const GetComments = () => {

    const getAllComments = async () => {
    try {
        let items, itemSize;
        await Promise.resolve()
            .then(getPhotosFromDB)
            .then((response) => {
                    items = response.photos;
                    itemSize = response.itemSize;
                });

        let count = 0;
        await (function f() {
            console.info(`Step ${count} from ${itemSize}`);
            if (count < itemSize) {
                const photoObj = items[count];

                Promise.resolve(photoObj)
                    .then(getCommentsFromVk)
                    .then(checkCommentsBeforeAdd)
                    .then(addCommentsToDb)
                    .then(updateAddPhotosCount)
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
