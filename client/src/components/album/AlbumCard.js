import React from "react";
import {NavLink} from "react-router-dom";

const AlbumCard = ({userId, albumId, title, size, created, updated, photo}) => {

    return (
        <NavLink to={'/sellers/' + userId + '/albums/' + albumId}>
            <div className='album-card-title'>
                <span>{title}</span>
            </div>
            <div className='album-card-img'>
                <img src={photo} alt={title}/>
            </div>
            <div className='album-card-size'>
                Фотографий: {size}
            </div>
            <div className='album-card-date-info'>
                <span>Обновлён: {updated}</span><br/>
                <span>Создан: {created}</span>
            </div>
        </NavLink>
    )
};

export default AlbumCard;
