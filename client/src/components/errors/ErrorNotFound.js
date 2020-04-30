import React from "react";
import picture from './assets/no-albums-available.jpg';

const ErrorNotFound = (props) => {
    const title = `${props.title} not found =(`.toUpperCase();

    const Content = () => {
        return (
            <div className='not-found'>
                <h1>{title}</h1>
                <img src={picture} alt={title}/>
            </div>
        )
    };

    return (
        <Content/>
    )
};

export default ErrorNotFound;
