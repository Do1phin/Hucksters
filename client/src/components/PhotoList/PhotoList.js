// Core
import React from 'react';
import PropTypes from 'prop-types';
// Components
import PhotoCard from '../PhotoCard/PhotoCard';
// Styles
import '../../styles/photos.style.scss';

const PhotoList = (props) => {

    const {photos} = props.photos;
    // const {favorite} = props.favorite;
    console.log('photos ', photos)

    // const isFavorite = favorite.favorite_photos.some((value) => value === photo_id);

    return (
        photos.map((item) => (
            <div className='photo-card__item' key={item.photo_id}>
                <PhotoCard {...item} />
            </div>
        ))
    );
};

PhotoList.propTypes = {
    photos: PropTypes.array.isRequired
};

PhotoList.defaultProps = {
    photos: []
};

export default PhotoList;
