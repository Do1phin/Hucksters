import React from "react";

import './loadMoreBtn.style.css';

const LoadMoreBtn = (props) => {
    return (
        props.size >= props.limit
            ? <div className='photos-load-more'>
                <button
                    className='load-more-btn'
                    onClick={props.refreshFunction}
                >
                    Показать ещё
                </button>
            </div>
            : null
    )
};

export default LoadMoreBtn;
