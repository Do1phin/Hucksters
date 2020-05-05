import React from "react";

import './SellerInfo.style.css';

const SellerInfo = (props) => {
    const {
        user_id, is_closed, deactivated, first_name, last_name, nickname, domain, sex,
        country, photo, albums, picturesInAlbums,
    } = props;
    console.log('props ', props)

    return (
        <div className='seller-info'>
            <div className='seller-info__name'>
                {first_name} {last_name}
            </div>
            <div className='seller-info__photo'>
                <img src={photo} alt='Аватарка'/>
            </div>
            <div className='seller-info__country'>
                Страна: {country}
            </div>
            <div className='seller-info__gender'>
                Пол: {sex}
            </div>
            <div className='seller-info__albums'>
                Альбомов: {albums}
            </div>
            <div className='seller-info__pictures'>
                Фотографий: {picturesInAlbums}
            </div>
        </div>
    )
};

export default SellerInfo;
