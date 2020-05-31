// Core
import React, {Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
// API
import {getMembersFromDB} from '../../containers/Members/members.api';
import {getPhotosFromDB} from '../../containers/Photos/photos.api';
// Components
import {getAlbumsFromDB} from '../../containers/Albums/albums.api';
import AlbumCardSmall from '../AlbumCardSmall/AlbumCardSmall';
import MemberInfo from '../MemberInfo/MemberInfo';
import Spinner from '../spinner';
// Styles
import '../../styles/memberPage.style.scss';

const MemberPage = (props) => {

    const {owner_id} = props;

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
                    return setUserInfo(...response);
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
                    return setAlbums(response);
                }).catch(err => console.error(err));
            setLoading(false);
        };

        const loadPhotos = () => {
            const variables = {
                owner_id
            };

            getPhotosFromDB(variables)
                .then(response => {
                    return setPhotos(response);
                }).catch(err => console.error(err));
            return variables;
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
                        <AlbumCardSmall {...item}/>
                    </div>
                );
            });
        } else {
            return <span>у пользователя нет альбомов</span>;
        }
    };



    // const MemberPage = () => {
    //     return (
    //         <div className='member-page'>
    //             <MemberInfo {...userInfo}/>
    //             <div className='album-list'>
    //                 {albumsView()}
    //             </div>
    //             <div className='photo-list'>
    //                 фотографии выбранного альбома
    //             </div>
    //         </div>
    //     )
    // };

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
            );
    };


    return (
        <Fragment>
            <Content/>
        </Fragment>
    );
};

export default MemberPage;

MemberPage.propTypes = {
    owner_id: PropTypes.number.isRequired
};
