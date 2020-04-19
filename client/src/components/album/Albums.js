import React, {Fragment, useEffect, useState} from 'react';
import {list} from './api-album';
import AlbumCard from './AlbumCard';
import Spinner from "../spinner";

import './album.style.css';
import Search from "../search/Search";

const Albums = () => {
    const [loading, setLoading] = useState(true);
    const [albums, setAlbums] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [albumSize, setAlbumSize] = useState(0);
    const [allAlbumSize, setAllAlbumSize] = useState(0);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(100);

    let source;

    useEffect(() => {

        const variables = {
            text: searchText,
            skip,
            limit
        };

        loadAlbums(variables)
    }, [searchText]);

    const updateSearchText = (newSearchText) => {
        if (newSearchText !== searchText) {
            setSkip(0);
            setAlbumSize(0);
            setAllAlbumSize(0);
        }
        setSearchText(newSearchText);
    };

    const loadAlbums = (variables) => {
        list(variables)
            .then(data => {
                source = data;

                if (data) {
                    if (variables.loadMore) {
                        setAlbums([...albums, ...source.albums]);
                    } else {
                        setAlbums(source.albums);
                    }
                    setAlbumSize(source.albumSize);
                    setAllAlbumSize(allAlbumSize + source.albumSize);
                    setLoading(false);
                }
            })
    };

    const loadMore = () => {

        let skipAfter = skip + limit;

        const variables = {
            title: searchText,
            skip: skipAfter,
            limit: limit,
            loadMore: true
        };

        loadAlbums(variables);
        setSkip(skipAfter);
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
        <Fragment>
            <Search
                refreshFunction={updateSearchText}
            />

            <div className='album-size'>
                {allAlbumSize
                    ? <span>Результатов - {allAlbumSize}</span>
                    : null
                }
            </div>

            <div className='albums'>
                {content}
            </div>

            {albumSize >= limit
                ? <div className='album-load-more'>
                    <button
                        className='load-more-button'
                        onClick={loadMore}
                    >
                        Показать ещё
                    </button>
                </div>
                : null
            }

        </Fragment>
    )


};

export default Albums;

