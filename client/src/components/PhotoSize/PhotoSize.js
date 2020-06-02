// Core
import React from 'react';
import PropTypes from 'prop-types';

const PhotoSize = (props) => {

    const { list_settings } = props;

    return (
        <div className='photos-size'>
            {list_settings.total_loaded_items
                ? <span>Результатов - {list_settings.total_loaded_items} из {list_settings.total_items}</span>
                : null
            }
        </div>
    );
};

export default PhotoSize;

PhotoSize.propTypes = {
    list_settings: PropTypes.object.isRequired
};
