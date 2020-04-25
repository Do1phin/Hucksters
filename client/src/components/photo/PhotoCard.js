import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {stampToDate} from "../../services/date.service";

const PhotoCard = ({userId, albumId, photoId, text, photo, date}) => {

    return (
        <Fragment>
            <div className='photo-card-header'>
                <Link to={`/sellers/${userId}`}>
                    <div className='photo-card-header_avatar'>
                        <img src='https://vk.com/images/camera_200.png' alt={userId}/>
                    </div>
                </Link>

                <Link to={`/sellers/${userId}`}>
                <div className='photo-card-header_username'>
                    Имя Фамилия
                </div>
                </Link>

                <div className='photo-card-header_date'>
                    {stampToDate(date)}
                </div>
            </div>

            <div className='photo-card-body'>
                <div className="photo-card-body_img">
                    <img src={photo} alt={photoId}/>
                </div>
            </div>

            <div className="photo-card-footer">
                <div className='photo-card-footer_info'>
                    info
                </div>
                <div className='photo-card-footer_photos'>
                    photos
                </div>
                <div className='photo-card-footer_size'>
                    size
                </div>
                {/*<span>{text}</span>*/}
            </div>
        </Fragment>
    )
};

export default PhotoCard;
