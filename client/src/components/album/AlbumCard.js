import React, {Fragment} from "react";
import { NavLink} from "react-router-dom";
import {stampToDate} from "../../services/date.service";

const AlbumCard = ({userId, albumId, title, size, created, updated, photo}) => {

    return (
        <Fragment>
             <NavLink to={'/sellers/' + userId + '/albums/' + albumId}>
            <div className='album-card-header'>
                <div className='album-card-header_title'>
                    <span>{title}</span>
                </div>
            </div>

            <div className='album-card-body'>
                <div className='album-card-body_img'>
                    <img src={photo} alt={title}/>
                </div>
            </div>

            <div className="album-card-footer">
                <div className='album-card-size'>
                    Фотографий: {size}
                </div>

                <div className='album-card-date-info'>
                    <span>Update: {stampToDate(updated)}</span><br/>
                    <span>Create: {stampToDate(created)}</span>
                </div>
            </div>
             </NavLink>
        </Fragment>
    )
};

export default AlbumCard;
