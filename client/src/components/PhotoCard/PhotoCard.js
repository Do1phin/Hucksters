// Core
import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
// Services
import {stampToDate} from '../../services/date.service';
// React components
import FavoriteBtn from '../FavoriteBtn/FavoriteBtn';

const PhotoCard = (props) => {

    const {
        owner_id,
        album_id,
        first_name,
        last_name,
        photo,
        date,
        text,
        photo_id,
        photo_sizes,
        additional_photos,
        favorites,
        thing_info,
        isFavorite,
    } = props;

    // const favorite = useSelector(state => state.favorites);
    // console.log('favorite ' ,favorite)

    // const isFavorite = favorite.favorite_photos.some((value) => value === photo_id);

    // console.log('members ' , members)
    return (
        <Fragment>
            <div className='photo-card__item-header'>
                <Link to={`/members/${owner_id}`}>
                    <div className='photo-card__item-header-avatar'>
                        <img src={photo || 'https://vk.com/images/camera_200.png'} alt={owner_id}/>
                    </div>
                </Link>

                <Link to={`/members/${owner_id}`}>
                    <div className='photo-card__item-header-username'>
                        {first_name || 'Имя...'} {last_name || 'Фамилия...'}
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
                <div className="photo-card__item-body-actions">
                    <FavoriteBtn
                        owner_id={owner_id}
                        album_id={album_id}
                        photo_id={photo_id}
                        type={'photos'}
                        favorite={isFavorite}
                    />
                    <p className="favorite-block__counter">
                        {favorites}
                    </p>
                </div>
            </div>

            <div className="photo-card__item-footer">
                <div className={text ? 'photo-card__item-footer-info' : 'photo-card__item-footer-info-none'}>
                    {text ? 'info' : 'no info'}
                </div>
                <div className={additional_photos ? 'photo-card__item-footer-photos' : 'photo-card__item-footer-photos-none'}>
                    {additional_photos ? additional_photos : 'no addict photos'}
                </div>
                <div className={thing_info.size ? 'photo-card__item-footer-size' : 'photo-card__item-footer-size-none'}>
                    {thing_info.size ? thing_info.size : 'no size'}
                </div>
                <span>{text}</span>
            </div>
        </Fragment>
    );
};

PhotoCard.propTypes = {
    owner_id: PropTypes.number.isRequired,
    album_id: PropTypes.number.isRequired,
    photo_id: PropTypes.number.isRequired,
    favorites: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    additional_photos: PropTypes.number.isRequired,
    photo_sizes: PropTypes.array.isRequired,
    date: PropTypes.number.isRequired,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    photo: PropTypes.string,
};

export default PhotoCard;
