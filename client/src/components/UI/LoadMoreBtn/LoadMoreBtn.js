import React from "react";
import PropTypes from 'prop-types';

import './loadMoreBtn.style.css';

const LoadMoreBtn = ({limit, size, refreshFunction}) => {

    return (
        size >= limit
            ? <div className='load-more'>
                <button
                    className='load-more__button'
                    onClick={refreshFunction}
                >
                    Показать ещё
                </button>
            </div>
            : null
    )
};

LoadMoreBtn.propTypes = {
    limit: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    refreshFunction: PropTypes.func.isRequired
};

export default LoadMoreBtn;
