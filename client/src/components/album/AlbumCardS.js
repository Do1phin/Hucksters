import React from 'react';
import {NavLink} from 'react-router-dom';

const AlbumCardS = ({owner_id, album_id, photo, size, title}) => {

    return(
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
    );
};

export default AlbumCardS;
