import React from 'react';
import PropTypes from 'prop-types';

import './error.style.scss';

const ErrorNotFound = ({title}) => {
    let className = 'not-found';
    if (title) {
        className = title + '-' + className;
    }

    title = `${title} not found =(`.toUpperCase();

    const Content = () => {
        return (
            <div className='error-not-found'>
                <div className={className}>
                    <span>{title}</span>
                </div>
            </div>
        );
    };

    return (
        <Content/>
    );
};

ErrorNotFound.propTypes = {
    title: PropTypes.string
};

export default ErrorNotFound;
