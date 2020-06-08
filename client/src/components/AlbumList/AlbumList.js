// Core
import React from 'react';
import PropTypes from 'prop-types';
// React components
import AlbumCard from '../AlbumCard/AlbumCard';

const AlbumList = (props) => {

    const albums = props.albums;

    return albums.map((item) => (
        <div className="album-card__item" key={item.album_id}>
            <AlbumCard {...item}/>
        </div>
    ));
};

export default AlbumList;

AlbumList.propTypes = {
    albums: PropTypes.array.isRequired
};

AlbumList.defaultProps = {
    albums: []
};
