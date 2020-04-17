import React, { Fragment} from 'react';
import { Link} from 'react-router-dom';
import {stampToDate} from "../../services/date.service";

const PhotoCard = ({userId, albumId, photoId, text, photo, date}) => {

    return (
        <Fragment>
            <div className='photo-card-header'>
                {/*<Link to={`/sellers/${userId}/albums/${albumId}/photos/${photoId}`}>*/}
                <div className='photo-card-header_avatar'>
                    Ava
                </div>
                {/*</Link>*/}
                <div className='photo-card-header_username'>
                    Имя Фамилия
                </div>
                <div className='photo-card-header_date'>
                    {stampToDate(date)}
                </div>
            </div>

            <div className='photo-card-body'>
                <div className="photo-card-body_img">
                    <img src={photo} alt={photoId}/>
                </div>
            </div>

            <div className="photo_card-footer">
                <span>{text}</span>
            </div>
        </Fragment>
    )
};

export default PhotoCard;
