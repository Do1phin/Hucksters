import React, {Fragment} from "react";
import {getAlbumsFromDB} from "../album/api-album";
import {addPhotosToDb} from '../photo/api-photo';
import {getMembersGroupFromVk, getMembersInfoFromVk, getPhotosFromVk} from "./api-vk";
import {createMembersToDB, updateMembersInDB} from "../seller/api-seller";

const GetPhotos = () => {

    const getAllPhotos = async () => {
        try {

            let items, itemSize;
            await Promise.resolve()
                .then(getAlbumsFromDB)
                .then((response) => {
                    items = response.albums;
                    itemSize = response.itemSize;
                });

            let count = 0;
            await (function f() {
                console.info(`Step ${count} from ${itemSize}`);
                if (count < itemSize) {
                    const albumObj = items[count];

                    Promise.resolve(albumObj)
                        .then(getPhotosFromVk)
                        .then(addPhotosToDb)
                        .catch((err) => console.error(err));

                    count++;
                    setTimeout(f, 10000);
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
                onClick={getAllPhotos}
            >
                Получить фотографии из ВК
            </button>
        </Fragment>
    )
};

export default GetPhotos;
