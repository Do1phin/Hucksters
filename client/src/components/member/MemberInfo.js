import React from "react";

import './MemberInfo.style.css';

const MemberInfo = (props) => {
    const {
        owner_id, is_closed, deactivated, first_name, last_name, nickname, domain, sex,
        country, photo, albums, picturesInAlbums, instagram
    } = props;

    return (
        <div className='member-info'>
            <div className='member-info__name'>
                {first_name} {last_name}
            </div>
            <div className='member-info__photo'>
                <img src={photo} alt='Аватарка'/>
            </div>
            <div className='member-info__country'>
                Страна: {country}
            </div>
            <div className='member-info__gender'>
                Пол: {sex}
            </div>
            <div className='member-info__insta'>
                Инстаграм: {instagram}
            </div>
            <div className='member-info__albums'>
                Альбомов: {albums}
            </div>
            <div className='member-info__pictures'>
                Фотографий: {picturesInAlbums}
            </div>
        </div>
    )
};

export default MemberInfo;
