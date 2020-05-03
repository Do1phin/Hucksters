import React, {Fragment, useEffect, useState} from "react";
import PropTypes from 'prop-types';
import {getAlbumsFromDB} from "../album/_api-album";
import AlbumCardS from "../album/AlbumCardS";
import Spinner from "../spinner";

const SellerPage = ({user_id}) => {
    const [loading, setLoading] = useState(true);
    const [albums, setAlbums] = useState([]);


    useEffect(() => {

        const loadAlbums = () => {
            const variables = {
                user_id: user_id,
                page: 'seller',
                first_name: '',
            };

            getAlbumsFromDB(variables)
                .then(response => {
                    return setAlbums(response.albums)
                });
            setLoading(false);
        };

        loadAlbums()
    }, [user_id]);


    const albumsView = () => {

        if (albums.length) {
            return albums.map((item) => {
                return (
                    <div className='album-list__item'
                         key={item.album_id}
                    >
                        <AlbumCardS {...item}/>
                    </div>
                )
            })
        } else {
            return <span>у пользователя нет альбомов</span>
        }
    };

    const SellerPage = () => {
        return (
            <div className='seller-page'>
                <div className='album-list'>
                    {albumsView()}
                </div>
            </div>
        )
    };

    const Content = () => {
        return loading
            ? <Spinner/>
            : <SellerPage/>
    };


    return (
        <Fragment>
            страница продавца {user_id}
            <Content/>
        </Fragment>
    )
        ;

};

SellerPage.propTypes = {
    user_id: PropTypes.number.isRequired
};

export default SellerPage;
