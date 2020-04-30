import React, {Fragment, useEffect, useState} from 'react';
import {getAlbumsFromDB} from './_api-album';
import AlbumCard from './AlbumCard';
import Spinner from "../spinner";
import Search from "../search/Search";
import LimitSelect from "../UI/LimitSelect/LimitSelect";
import SortSelect from "../UI/SortSelect/SortSelect";
import './album.style.css';
import '../UI/SortSelect/sortSelect.style.css';
import LoadMoreBtn from "../UI/LoadMoreBtn/LoadMoreBtn";
import ErrorNotFound from "../errors/ErrorNotFound";

const Albums = () => {
    const [loading, setLoading] = useState(true);
    const [albums, setAlbums] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [itemSize, setItemSize] = useState(0);
    const [allItemSize, setAllItemSize] = useState(0);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(100);
    const [sort, setSort] = useState(-1);
    const [more, setMore] = useState(false);

    useEffect(() => {

        const variables = {
            title: searchText,
            skip,
            limit,
            sort
        };

        const loadAlbums = (variables) => {

            getAlbumsFromDB(variables)
                .then(data => {
                    console.log('data ', data)

                    if (data) {
                        setItemSize(data.itemSize);

                        if (more) {
                            setAllItemSize(allItemSize + data.itemSize);
                            setAlbums([...albums, ...data.albums]);
                        } else {
                            setAllItemSize(data.itemSize);
                            setAlbums(data.albums);
                        }
                        return setLoading(false);
                    }
                })
        };

        setMore(false);
        loadAlbums(variables)
    }, [searchText, limit, skip, sort]);

    const loadMore = () => {
        let skipAfter = skip + limit;
        setMore(true);
        setSkip(skipAfter);
    };

    const albumsView = () => {
        if (albums.length !== 0) {
            return albums.map((item) => {
                return (
                    <div className="album-card-wrapper" key={item.albumId}>
                        <AlbumCard {...item}/>
                    </div>
                )
            });
        } else {
            return <ErrorNotFound title={'albums'}/>
        }
    }

    const AlbumSize = () => {
        return (
            <div className='album-size'>
                {allItemSize
                    ? <span>Результатов - {allItemSize}</span>
                    : null
                }
            </div>
        )
    };

    const Content = () => {
        return loading
            ? <Spinner/>
            : <div className='albums'>{albumsView()}</div>
    };

    return (
        <Fragment>
            <Search
                setSkip={setSkip}
                setItemSize={setItemSize}
                setAllItemSize={setAllItemSize}
                setSearchText={setSearchText}
            />
            <AlbumSize/>
            <LimitSelect
                limit={limit}
                refreshFunction={setLimit}
            />
            <SortSelect
                sort={sort}
                refreshFunction={setSort}
            />
            <Content/>
            <LoadMoreBtn
                limit={limit}
                size={itemSize}
                refreshFunction={loadMore}
            />
        </Fragment>
    )
};

export default Albums;

