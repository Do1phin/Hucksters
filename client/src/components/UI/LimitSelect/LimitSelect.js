import React from "react";
import PropTypes from 'prop-types';

import './limitSelect.style.scss';

const LimitSelect = ({limit, refreshFunction}) => {

    return (
        <div className='limit-select'>
            <label>Выводить по - </label>
            <select
                value={limit}
                onChange={(event) => refreshFunction(+event.target.value)}
            >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
        </div>
    )
};

LimitSelect.propTypes = {
    limit: PropTypes.number.isRequired,
    refreshFunction: PropTypes.func.isRequired
};

export default LimitSelect;
