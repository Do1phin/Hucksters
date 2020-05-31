// * Component Button
// Core
import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
    const { type, disabled, text, className, onClick } = props;

    const styles = `input-btn${className && ` ${className}`}`;

    return (
        <button
            className={styles}
            type={type}
            disabled={disabled}
            onClick={onClick}
        >
            <span className='btn-text'>{text}</span>
        </button>
    );
};

export default Button;

Button.propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    text: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
};

Button.defaultProps = {
    type: 'button',
    className: 'custom-btn',
    disabled: false,
};
