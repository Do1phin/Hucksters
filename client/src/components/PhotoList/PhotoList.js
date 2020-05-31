// Core
import React from 'react';
import PropTypes from 'prop-types';
// Components
import PhotoCard from '../PhotoCard/PhotoCard';

const PhotoList = (props) => {

    const {photos} = props.photos;

    return photos.map((item) => (
        <div className='photo-card__item' key={item.photo_id}>
            <PhotoCard {...item} />
        </div>
    ));
};

export default PhotoList;

PhotoList.propTypes = {
    photos: PropTypes.array.isRequired
};

PhotoList.defaultProps = {
    photos: []
};
