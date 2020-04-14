import React, {Fragment, useEffect, useState} from "react";
import {list} from './api-photo';
import PhotoCard from './PhotoCard';
import Spinner from "../spinner";


const Photos = () => {
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
            <li key={item.photoId}>
                <PhotoCard {...item} />
            </li>
        )
    });

    const content = loading ? <Spinner/> : photosView;

    return (
        <Fragment><br/>
            <ul>
                {content}
            </ul>
        </Fragment>
    )

};

export default Photos;
