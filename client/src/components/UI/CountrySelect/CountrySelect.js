import React, {Fragment} from "react";
import PropTypes from 'prop-types';

import './countrySelect.style.scss';

const CountrySelect = ({country, refreshFunction}) => {

    const handleChanger = (event) => {
        return refreshFunction(event.target.value)
    };

    return (
        <Fragment>
            <div className='country-select'>
                <label></label>
                <select
                    value={country}
                    onChange={handleChanger}
                >
                    <option value="">Все страны</option>
                    <option value="Украина">Украина</option>
                    <option value="Россия">Россия</option>
                    <option value="Беларусь">Беларусь</option>
                </select>
            </div>
        </Fragment>
    )
};

CountrySelect.propTypes = {
    country: PropTypes.string.isRequired,
    refreshFunction: PropTypes.func.isRequired
};

export default CountrySelect;
