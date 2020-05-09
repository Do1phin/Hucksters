import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';

const FavoriteBtn = ({photo_id, type}) => {
    const [loading, setLoading] = useState(true);
    const [favorited, setFavorited] = useState(false);
    const [favoriteCount, setFavoriteCount] = useState(0);

    useEffect(() => {
        const body = {};

        const readFavoritesFromDB = (body) => {
            try {
                 fetch('/api/favorite', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                }).then(response => {
                    if (response.ok) {
                        const data = response.json();
                        return data
                    }
                })
            } catch (e) {
                console.log('eeee ', e)
                throw new Error(e);
            }
        };

        // readFavoritesFromDB(body);
        setLoading(false);
    }, []);

    localStorage.setItem('user_id', '5e8ca6ef2fe3e651a4d723aa');


    const favoriteBtnClick = () => {
        setLoading(true);

        const body = {
            user_id: localStorage.getItem('user_id'),
            photo_id,
            type
        };

        if (!favorited) {

            try {
                fetch('/api/favorite/update', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                }).then(response => {
                    if (response.ok) {
                        setFavorited(!favorited);
                        setFavoriteCount(1 + favoriteCount);
                    } else {
                        alert('Failed to add to Favorites')
                    }
                })
            } catch (e) {
                throw new Error(e)
            }

        } else {

            try {
                fetch('/api/favorite/delete', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                }).then(response => {
                    if (response.ok) {
                        setFavorited(!favorited);
                        setFavoriteCount(favoriteCount - 1);
                    } else {
                        alert('Failed to remove with favorites')
                    }
                })
            } catch (e) {
                throw new Error(e)
            }
        }

        setLoading(false);
    };

    return (
        <div className='favorite-block'>
            <button className='favorite-block__btn'
                    onClick={favoriteBtnClick}
                    disabled={loading}
            >
                {favorited ? <span>Удалить из избранного</span> : <span>Добавить в избранное</span>}
            </button>
            <p className="favorite-block__counter">
                {favoriteCount}
            </p>
        </div>
    )
};

FavoriteBtn.propTypes = {
    photo_id: PropTypes.number.isRequired
};

export default FavoriteBtn;
