import React from "react";
import PropTypes from 'prop-types';

import './statusSelect.style.scss';

const StatusSelect = ({status, refreshFunction}) => {

    const handleChanger = (event) => {
        return refreshFunction(event.target.value)
    };

    return(
        <div className='status-select'>
            <label></label>
            <select
                value={status}
                onChange={(event) => handleChanger(event)}
            >
                <option value='all'>все пользователи</option>
                <option value='seller'>продавцы</option>
                <option value='closed'>скрытые</option>
                <option value='banned'>забаненные</option>
                <option value='deleted'>удалённые</option>
            </select>
        </div>
    )
};

StatusSelect.propTypes = {
    status: PropTypes.string.isRequired,
    refreshFunction: PropTypes.func.isRequired,
};

export default StatusSelect;
