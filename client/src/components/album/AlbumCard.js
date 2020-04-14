import React from "react";

const AlbumCard = ({vkId, albumId, albumTitle, albumSize, albumCreated, albumUpdated}) => {

    return (
        <span>VkID - {vkId}. Альбом № {albumId}: {albumTitle} ({albumSize})</span>
    )
};

export default AlbumCard;
