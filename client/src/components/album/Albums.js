import React, {Fragment, useEffect, useState} from 'react';
import {getAlbumsFromDB} from './_api-album';
import AlbumCard from './AlbumCard';
import Spinner from "../spinner";
import Search from "../search/Search";
import LimitSelect from "../UI/LimitSelect/LimitSelect";
import SortSelect from "../UI/SortSelect/SortSelect";
import './albums.style.scss';
import '../UI/SortSelect/sortSelect.style.scss';
import LoadMoreBtn from "../UI/LoadMoreBtn/LoadMoreBtn";
import ErrorNotFound from "../errors/ErrorNotFound";
import AlbumPage from "./AlbumPage";

const Albums = (props) => {
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
            info: 'list',
            title: searchText,
            skip,
            limit,
            sort,
        };

        const loadAlbums = (variables) => {
            console.log('vari ', variables)

            getAlbumsFromDB(variables)
                .then(data => {

                    if (data) {
                        setItemSize(data.length);

                        if (more) {
                            setAllItemSize(allItemSize + data.length);
                            setAlbums([...albums, ...data]);
                        } else {
                            setAllItemSize(data.length);
                            setAlbums(data);
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

    const AlbumsView = () => {

        if (albums.length !== 0) {
            return albums.map((item) => {
                return (
                    <div className="album-card__item" key={item.album_id}>
                        <AlbumCard {...item}/>
                    </div>
                )
            });
        } else {
            return <ErrorNotFound title={'albums'}/>
        }
    };

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
        const {owner_id, album_id} = props.match.params;
        let element;
        if (album_id) {
            return <AlbumPage owner_id={+owner_id} album_id={+album_id}/>
        }

        if (!loading && !albums.length) {
            element = <ErrorNotFound title={'albums'}/>
        } else if (!loading && albums.length) {
            element = (
                <Fragment>
                    <div className='album-list'>
                        <AlbumsView/>
                    </div>
                </Fragment>
            )
        } else if (loading && albums.length) {
            element = (
                <Fragment>
                    <div className='album-list'>
                        <AlbumsView/>
                    </div>
                    <div className='album-list__more'>
                        <Spinner/>
                    </div>
                </Fragment>
            )
        }

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

                {element}

                <LoadMoreBtn
                    limit={limit}
                    size={itemSize}
                    refreshFunction={loadMore}
                />
            </Fragment>
        )
    };

    return (
        <Content/>
    )
};

export default Albums;

