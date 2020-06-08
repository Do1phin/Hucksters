// Core
import React from 'react';
import PropTypes from 'prop-types';

const ItemsSize = (props) => {

    const { loading, total_items, total_loaded_items } = props;

    return (
        <div className='items-size'>
            {total_loaded_items && !loading
                ? <span>Результатов - {total_loaded_items} из {total_items}</span>
                : null
            }
        </div>
    );
};

export default ItemsSize;

ItemsSize.propTypes = {
    loading: PropTypes.bool.isRequired,
    total_items: PropTypes.number.isRequired,
    total_loaded_items: PropTypes.number.isRequired
};
