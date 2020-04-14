import React from 'react';

const PhotoCard = ({vkId, albumId, photoId, photoText, photoSrc, photoDate}) => {
    // const date = new Date(photoDate).toLocaleString();

    return (
        <span>
            VkID - {vkId}. Альбом № {albumId}. Фото -> {photoId} {<br/>}* Описание под фото: {photoText}
        </span>
    )
};

export default PhotoCard;
