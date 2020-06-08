// Core
import React from 'react';
import PropTypes from 'prop-types';
// React components
import PhotoCard from '../PhotoCard/PhotoCard';

const PhotoList = (props) => {

    const photos = props.photos;
    const members = props.members;
    const {favorite} = props;

    return photos.length && photos.map((item) => {

        const idx = members.findIndex((value) => value.owner_id === item.owner_id);
        const isFavorite = favorite.favorite_photos.some((value) => value === item.photo_id);

        if (idx !== -1) {
            const first_name = members[idx].first_name;
            const last_name = members[idx].last_name;
            const photo = members[idx].photo ? members[idx].photo : 'https://sun1-99.userapi.com/c857224/v857224380/18a1ca/_FrdjZXkvSk.jpg?ava=1';

            item['first_name'] = first_name;
            item['last_name'] = last_name;
            item['photo'] = photo;
            item['isFavorite'] = isFavorite;
        }

        return (
            <div className='photo-card__item' key={item.photo_id}>
                <PhotoCard {...item}/>
            </div>
        );
    });
};

export default PhotoList;

PhotoList.propTypes = {
    photos: PropTypes.array.isRequired,
    members: PropTypes.array.isRequired
};

PhotoList.defaultProps = {
    photos: [],
    members: []
};
