import React, {useEffect, useState} from 'react';
import {createFavoritePhotoInDB, deleteFavoriteFromDB, updateFavoritesFromDB} from './_api-favorite';
import {updateFavoritePhotoCount} from '../../photo/_api-photo';
import PropTypes from 'prop-types';


const FavoriteBtn = ({photo_id, type, favorite}) => {
    const [loading, setLoading] = useState(true);
    const [favorited, setFavorited] = useState(false);
    const [favoriteCount, setFavoriteCount] = useState(0);

    useEffect(() => {
        const body = {};


        // readFavoritesFromDB(body);
        setLoading(false);
    }, []);

    localStorage.setItem('user_id', '5e8ca6ef2fe3e651a4d723ac');


    const favoriteBtnClick = () => {
        setLoading(true);

        const body = {
            user_id: localStorage.getItem('user_id'),
            photo_id,
            type
        };

        if (!favorite) {
            updateFavoritesFromDB(body);
            updateFavoritePhotoCount({...body, operation: 'inc'});

            setFavorited(!favorited);
            createFavoritePhotoInDB(body);

            setFavoriteCount(1 + favoriteCount);

        } else {

            deleteFavoriteFromDB(body);
            updateFavoritePhotoCount({...body, operation: 'dec'});

            setFavorited(!favorited);
            setFavoriteCount(favoriteCount - 1);
        }

        setLoading(false);
    };

    return (
        <div className='favorite-block'>
            <button className='favorite-block__btn'
                    onClick={favoriteBtnClick}
                    disabled={loading}
            >
                {favorite ? <span>Удалить из избранного</span> : <span>Добавить в избранное</span>}
            </button>
        </div>
    );
};

FavoriteBtn.propTypes = {
    photo_id: PropTypes.number.isRequired
};

export default FavoriteBtn;
