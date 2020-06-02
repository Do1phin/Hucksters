// Core
import React from 'react';
import PropTypes from 'prop-types';

const MembersSize = (props) => {

    const { list_settings } = props;

    return (
        <div className='member-size'>
            {
                list_settings.total_loaded_items
                    ? <span>Результатов - {list_settings.total_loaded_items} из {list_settings.total_items}</span>
                    : null
            }
        </div>
    );
};

export default MembersSize;

MembersSize.propTypes = {
    list_settings: PropTypes.object.isRequired
};
