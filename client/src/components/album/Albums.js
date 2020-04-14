import React, {Fragment, useEffect, useState} from 'react';
import {list} from './api-album';
import AlbumCard from './AlbumCard';
import Spinner from "../spinner";

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
            <li key={item.albumId}>
                <AlbumCard {...item}/>
            </li>
        )
    });

    let content = loading ? <Spinner/> : albumsView;

    return (
        <Fragment><br/>

            <ul>
                {content}
            </ul>

        </Fragment>
    )


};

export default Albums;

