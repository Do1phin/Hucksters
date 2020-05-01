import React, {Fragment} from "react";
import { NavLink} from "react-router-dom";
import PropTypes from 'prop-types';
import {stampToDate} from "../../services/date.service";

const AlbumCard = ({user_id, album_id, title, size, created, updated, photo}) => {

    return (
        <Fragment>
             <NavLink to={'/sellers/' + user_id + '/albums/' + album_id}>
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

AlbumCard.propTypes = {
    user_id: PropTypes.number.isRequired,
    album_id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    created: PropTypes.number.isRequired,
    updated: PropTypes.number.isRequired,
    photo: PropTypes.string.isRequired
}

export default AlbumCard;
