import React, { Fragment} from 'react';
import { Link} from 'react-router-dom';

const PhotoCard = ({vkId, albumId, photoId, photoText, photoSrc, photoDate}) => {
    // const date = new Date(photoDate).toLocaleString();

    return (
        <Fragment>
            <div className='photo-card-header'>
                <Link to={`/sellers/${vkId}/albums/${albumId}/photos/${photoId}`}>
                <div className='photo-card-header_avatar'>
                    Ava
                </div>
                </Link>
                <div className='photo-card-header_username'>
                    Имя Фамилия
                </div>
                <div className='photo-card-header_date'>
                    {photoDate}
                </div>
            </div>

            <div className='photo-card-body'>
                <div className="photo-card-body_img">
                    <img src={photoSrc} alt={photoId}/>
                </div>
            </div>

            <div className="photo_card-footer">
                <span>{photoText}</span>
            </div>
        </Fragment>
    )
};

export default PhotoCard;
