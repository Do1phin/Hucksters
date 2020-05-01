import React from "react";
import PropTypes from 'prop-types';

const ErrorNotFound = ({title}) => {
    title = `${title} not found =(`.toUpperCase();
        let className = 'not-found';

    if (title) {
        className = title + "-" + className;
    }

    const Content = () => {
        return (
            <div className={className}>
                <h1>{title}</h1>
            </div>
        )
    };

    return (
        <Content/>
    )
};

ErrorNotFound.propTypes = {
    title: PropTypes.string
};

export default ErrorNotFound;
