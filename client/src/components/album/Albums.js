import React, {Fragment, useEffect, useState} from 'react';
import {getAlbumsFromDB} from './_api-album';
import AlbumCard from './AlbumCard';
import Spinner from "../spinner";
import Search from "../search/Search";
import LimitSelect from "../UI/LimitSelect/LimitSelect";
import SortSelect from "../UI/SortSelect/SortSelect";
import LoadMoreBtn from "../UI/LoadMoreBtn/LoadMoreBtn";
import ErrorNotFound from "../errors/ErrorNotFound";
import AlbumPage from "./AlbumPage";
import {useDispatch, useSelector} from "react-redux";
import {setLoadMore, setPartItems, setTotalItems} from "../../redux/actions/list.actions";
import '../UI/SortSelect/sortSelect.style.scss';
import './albums.style.scss';

const Albums = (props) => {
    const [loading, setLoading] = useState(true);
    const [albums, setAlbums] = useState([]);

    const dispatch = useDispatch();
    const listSettings = useSelector(state => state.list);

    useEffect(() => {

        const variables = {
            info: 'list',
            search_text: listSettings.search_text,
            skip: listSettings.skip,
            limit: listSettings.limit,
            sort: listSettings.sort,
        };

        const loadAlbums = (variables) => {

            getAlbumsFromDB(variables)
                .then(data => {

                    if (data) {
                        dispatch(setPartItems(data.length));

                        if (listSettings.loadMore) {
                            dispatch(setTotalItems(listSettings.total_items + data.length));
                            setAlbums([...albums, ...data]);
                        } else {
                            dispatch(setTotalItems(data.length));
                            setAlbums(data);
                        }
                        return setLoading(false);
                    }
                })
        };

        dispatch(setLoadMore(false));
        loadAlbums(variables)
    }, [
        listSettings.search_text,
        listSettings.limit,
        listSettings.skip,
        listSettings.sort
    ]);

    const AlbumsView = () => {

        if (albums.length) {
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
                {listSettings.total_items
                    ? <span>Результатов - {listSettings.total_items}</span>
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
                <Search/>
                <AlbumSize/>
                <LimitSelect/>
                <SortSelect/>

                {element}

                <LoadMoreBtn/>
            </Fragment>
        )
    };

    return (
        <Content/>
    )
};

export default Albums;

