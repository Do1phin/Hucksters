import React from "react";

import './limitSelect.style.css';

const LimitSelect = (props) => {

    return (
        <div className='limit-select'>
            <span>Выводить по - </span>
            <select
                value={props.limit}
                onChange={(event) => props.refreshFunction(+event.target.value)}
            >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
        </div>
    )
};

export default LimitSelect;
