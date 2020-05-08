import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {stampToDate} from "../../services/date.service";

const PhotoCard = ({owner_id, album_id, photo_id, text, photo_sizes, date, additional_photos}) => {

    return (
        <Fragment>
            <div className='photo-card__item-header'>
                <Link to={`/members/${owner_id}`}>
                    <div className='photo-card__item-header-avatar'>
                        <img src='https://vk.com/images/camera_200.png' alt={owner_id}/>
                    </div>
                </Link>

                <Link to={`/members/${owner_id}`}>
                    <div className='photo-card__item-header-username'>
                        Имя Фамилия
                    </div>
                </Link>

                <div className='photo-card__item-header-date'>
                    {stampToDate(date)}
                </div>
            </div>

            <div className='photo-card__item-body'>
                <div className="photo-card__item-body-img">
                    <img src={photo_sizes[photo_sizes.length - 1].url} alt={photo_id}/>
                </div>
            </div>

            <div className="photo-card__item-footer">
                <div className='photo-card__item-footer-info'>
                    info
                </div>
                <div className='photo-card__item-footer-photos'>
                    {additional_photos}
                </div>
                <div className='photo-card__item-footer-size'>
                    size
                </div>
                <span>{text}</span>
            </div>
        </Fragment>
    )
};

PhotoCard.propTypes = {
    owner_id: PropTypes.number.isRequired,
    album_id: PropTypes.number.isRequired,
    photo_id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    additional_photos: PropTypes.number.isRequired,
    photo_sizes: PropTypes.array.isRequired,
    date: PropTypes.number.isRequired
};

export default PhotoCard;
