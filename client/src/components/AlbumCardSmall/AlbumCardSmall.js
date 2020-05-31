// Core
import React, {Fragment} from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';

const AlbumCardSmall = (props) => {

    const {owner_id, album_id, photo, size, title} = props;

    return (
        <Fragment>
            <NavLink to={'/members/' + owner_id + '/albums/' + album_id}>
                <div className='album-list__item-header'>
                    <div className='album-list__item-header-title'>
                        <span>{title}</span>
                    </div>
                </div>

                <div className='album-list__item-body'>
                    <div className='album-list__item-body-photo'>
                        <img src={photo} alt={title}/>
                    </div>
                </div>

                <div className="album-list__item-footer">
                    <div className='album-list__item-footer-size'>
                        Фотографий: {size}
                    </div>
                </div>
            </NavLink>
        </Fragment>
    );
};

export default AlbumCardSmall;

AlbumCardSmall.propTypes = {
    owner_id: PropTypes.number.isRequired,
    album_id: PropTypes.number.isRequired,
    photo: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    title: PropTypes.string
};
