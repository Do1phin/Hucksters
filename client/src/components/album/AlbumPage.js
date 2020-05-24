import React from 'react';
import PropTypes from 'prop-types';

const AlbumPage = ({album_id}) => {

    return(
        <span>конкретный альбом № {album_id}</span>
    );
};

AlbumPage.propTypes = {
    owner_id: PropTypes.number.isRequired,
    album_id: PropTypes.number.isRequired,
};
export default AlbumPage;
