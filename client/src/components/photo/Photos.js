import React, {useEffect, useState} from "react";
import {list} from './api-photo';
import PhotoCard from './PhotoCard';
import Spinner from "../spinner";

import './photo.style.css';


const Photos = ({pathname}) => {
    const [loading, setLoading] = useState(true);
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        loadPhotos();
    }, []);

    const loadPhotos = () => {
        list({})
            .then(data => {
                if (!data.error) {
                    setPhotos(data);
                    setLoading(false);
                }
            })
    };

    const photosView = photos.map((item) => {
        return (
            <div className='photo-card-wrapper' key={item.photoId}>
                <PhotoCard {...item} />
            </div>
        )
    });

    const content = loading ? <Spinner/> : photosView;

    return (
        <div className='photos'>
            {pathname}
            {content}
        </div>
    )

};

export default Photos;
