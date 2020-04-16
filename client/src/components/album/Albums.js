import React, {useEffect, useState} from 'react';
import {list} from './api-album';
import AlbumCard from './AlbumCard';
import Spinner from "../spinner";

import './album.style.css';

const Albums = () => {
    const [loading, setLoading] = useState(true);
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        loadAlbums()
    }, []);

    const loadAlbums = () => {
        list({
            size: null
        })
            .then(data => {
                if (!data.error) {
                    setAlbums(data);
                    setLoading(false);
                }
            })
    };

    const albumsView = albums.map((item) => {
        return (
            <div className="album-card-wrapper" key={item.albumId}>
                <AlbumCard {...item}/>
            </div>
        )
    });

    let content = loading ? <Spinner/> : albumsView;

    return (
        <div className='albums'>
            {content}
        </div>
    )


};

export default Albums;

