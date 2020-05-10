import React, {Fragment, useEffect, useState} from "react";
import PropTypes from 'prop-types';
import {getAlbumsFromDB} from "../album/_api-album";
import {getMembersFromDB} from './_api-member';
import AlbumCardS from "../album/AlbumCardS";
import MemberInfo from "./MemberInfo";
import Spinner from "../spinner";

import './MemberPage.style.css';
import {getPhotosFromDB} from "../photo/_api-photo";

const MemberPage = ({owner_id}) => {
    const [loading, setLoading] = useState(true);
    const [albums, setAlbums] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {

        const loadInfo = () => {
            const variables = {
                owner_id,
                status: 'id',
                first_name: '',
            };
            getMembersFromDB(variables)
                .then((response) => {
                    return setUserInfo(...response)
                }).catch(err => console.error(err));
        };

        const loadAlbums = () => {
            const variables = {
                owner_id,
                info: 'seller',
                first_name: '',
            };
            getAlbumsFromDB(variables)
                .then((response) => {
                    return setAlbums(response)
                }).catch(err => console.error(err));
            setLoading(false);
        };

        const loadPhotos = () => {
            const variables = {
                owner_id
            };

            getPhotosFromDB(variables)
                .then(response => {
                    return setPhotos(response)
                }).catch(err => console.error(err));
            return variables
        };

        loadInfo();
        loadAlbums();
        loadPhotos();
    }, [owner_id]);

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



    const MemberPage = () => {
        return (
            <div className='member-page'>
                <MemberInfo {...userInfo}/>
                <div className='album-list'>
                    {albumsView()}
                </div>
                <div className='photo-list'>
                    фотографии выбранного альбома
                </div>
            </div>
        )
    };

    const Content = () => {
        return loading
            ? <Spinner/>
            : (
                <div className='member-page'>
                    <MemberInfo {...userInfo}/>
                    <div className='album-list'>
                        {albumsView()}
                    </div>
                    <div className='photo-list'>
                        фотографии выбранного альбома
                    </div>
                </div>
            )
    };


    return (
        <Fragment>
            <Content/>
        </Fragment>
    )
        ;

};

MemberPage.propTypes = {
    owner_id: PropTypes.number.isRequired
};

export default MemberPage;
