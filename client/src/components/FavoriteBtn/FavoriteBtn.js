// Core
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
// Redux actions
import {changeFavoritePhoto} from './favoriteBtn.actions';

const FavoriteBtn = (props) => {
    const {photo_id, type, favorite} = props;

    const [loading, setLoading] = useState(false);

    localStorage.setItem('user_id', '5e8ca6ef2fe3e651a4d723ac');

    useEffect(() => {

    }, []);

    const favoriteBtnClick = async () => {
        console.log('favoriteBtnClick')
        const body = {
            user_id: localStorage.getItem('user_id'),
            photo_id,
            type,
            favorite
        };

        await changeFavoritePhoto(body);
        setLoading(false);
    };

    return (
        <div className='favorite-block'>
            <button className='favorite-block__btn'
                    onClick={favoriteBtnClick}
                    disabled={loading}
            >
                {
                    favorite
                        ? <span>Удалить из избранного</span>
                        : <span>Добавить в избранное</span>}
            </button>
        </div>
    );
};

FavoriteBtn.propTypes = {
    photo_id: PropTypes.number.isRequired
};

export default FavoriteBtn;
