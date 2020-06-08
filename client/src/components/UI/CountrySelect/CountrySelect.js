import React, {Fragment} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setMemberCountrySelect} from '../../../redux/actions/listSettings.actions';
import './countrySelect.style.scss';

const CountrySelect = () => {

    const dispatch = useDispatch();

    const country = useSelector(state => state.list_settings.member_country);

    const dispatchSetCountrySelect = (event) => {
        const country = event.target.value;
        dispatch(setMemberCountrySelect(country));
    };

    return (
        <Fragment>
            <div className='country-select'>
                <label></label>
                <select
                    value={country}
                    onChange={dispatchSetCountrySelect}
                >
                    <option value="">Все страны</option>
                    <option value="Украина">Украина</option>
                    <option value="Россия">Россия</option>
                    <option value="Беларусь">Беларусь</option>
                </select>
            </div>
        </Fragment>
    );
};

export default CountrySelect;
