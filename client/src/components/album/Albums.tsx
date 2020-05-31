// Core
import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
// API
import {getAlbumsFromDB} from '../../containers/Albums/albums.api';
// Redux-actions
import {setLoadMore, setPartItems, setTotalItems} from "../../redux/actions/listSettings.actions";
// Components
import AlbumCard from '../AlbumCard/AlbumCard';
import Spinner from "../../components/spinner/index";
import SearchContainer from '../../containers/Search/SearchContainer';
import LimitSelect from "../../components/UI/LimitSelect/LimitSelect";
import SortSelect from "../../components/UI/SortSelect/SortSelect";
import LoadMoreBtn from "../../components/UI/LoadMoreBtn/LoadMoreBtn";
import ErrorNotFound from "../../components/errors/ErrorNotFound";
import AlbumPage from "../AlbumPage/AlbumPage";
// Styles
import '../../components/UI/SortSelect/sortSelect.style.scss';
import '../../styles/albums.style.scss';

interface getAlbumsReqVariables{
    info: string,
    search_text: string,
    skip: number,
    limit: number,
    sort: number
}

const Albums = (props) => {
    const [loading, setLoading] = useState(true);
    const [albums, setAlbums] = useState([]);

    const dispatch = useDispatch();
    const list_settings = useSelector(state => state.list_settings);
    const search = useSelector(state => state.search);

    useEffect(() => {

        const variables: getAlbumsReqVariables = {
            info: 'list',
            search_text: search.search_text,
            skip: list_settings.skip,
            limit: list_settings.limit,
            sort: list_settings.sort,
        };

        const loadAlbums = (variables: object) => {

            getAlbumsFromDB(variables)
                .then(data => {

                    if (data) {
                        dispatch(setPartItems(data.length));

                        if (list_settings.load_more) {
                            dispatch(setTotalItems(list_settings.total_items + data.length));
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
        list_settings.search_text,
        list_settings.limit,
        list_settings.skip,
        list_settings.sort
    ]);

    const AlbumsView = () => {

        if (albums.length) {
            return albums.map((item: object) => {
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
                {list_settings.total_items
                    ? <span>Результатов - {list_settings.total_items}</span>
                    : null
                }
            </div>
        )
    };

    const Content = () => {
        const {owner_id, album_id} = props.match.params;
        let element: any;

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
                <SearchContainer/>
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

