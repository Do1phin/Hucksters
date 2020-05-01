import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {stampToDate} from "../../services/date.service";

const PhotoCard = ({user_id, album_id, photo_id, text, photo_sizes, date, additional_photos}) => {

    return (
        <Fragment>
            <div className='photo-card-header'>
                <Link to={`/sellers/${user_id}`}>
                    <div className='photo-card-header_avatar'>
                        <img src='https://vk.com/images/camera_200.png' alt={user_id}/>
                    </div>
                </Link>

                <Link to={`/sellers/${user_id}`}>
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
                    <img src={photo_sizes[photo_sizes.length - 1].url} alt={photo_id}/>
                </div>
            </div>

            <div className="photo-card-footer">
                <div className='photo-card-footer_info'>
                    info
                </div>
                <div className='photo-card-footer_photos'>
                    {additional_photos}
                </div>
                <div className='photo-card-footer_size'>
                    size
                </div>
                {/*<span>{text}</span>*/}
            </div>
        </Fragment>
    )
};

PhotoCard.propTypes = {
    user_id: PropTypes.number.isRequired,
    album_id: PropTypes.number.isRequired,
    photo_id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    additional_photos: PropTypes.number.isRequired,
    photo_sizes: PropTypes.array.isRequired,
    date: PropTypes.number.isRequired
};

export default PhotoCard;
