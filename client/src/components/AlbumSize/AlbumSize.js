// Core
import React from 'react';
import PropTypes from 'prop-types';

const AlbumSize = (props) => {

    const { list_settings, general_settings } = props;

    return (
        <div className='albums-size'>
            {list_settings.total_loaded_items && !general_settings.loading
                ? <span>Результатов - {list_settings.total_loaded_items} из {list_settings.total_items}</span>
                : null
            }
        </div>
    );
};

export default AlbumSize;

AlbumSize.propTypes = {
    list_settings: PropTypes.object.isRequired,
    general_settings: PropTypes.object.isRequired
};
