import React from 'react';
import PropTypes from 'prop-types';

const PhotoSize = (props) => {

    const { listSettings } = props;

    return (
        <div className='photos-size'>
            {listSettings.total_items
                ? <span>Результатов - {listSettings.total_items}</span>
                : null
            }
        </div>
    );
};

PhotoSize.propTypes = {
    listSettings: PropTypes.object.isRequired
};

export default PhotoSize;
