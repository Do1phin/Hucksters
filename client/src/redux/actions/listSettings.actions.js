import { types } from './actionTypes';

export const setLimitItemsSelect = (limit) => {
    return {
        type: types.LIST_SETTINGS_LIMIT_ITEMS,
        payload: limit
    };
};

export const setSkipItemsNumber = (skip) => {
    return {
        type: types.LIST_SETTINGS_SKIP_ITEMS,
        payload: skip
    };
};

export const setSortItemsSelect = (sort) => {
    return {
        type: types.LIST_SETTINGS_SORT_ITEMS,
        payload: sort
    };
};

export const setPartItems = (count) => {
    return {
        type: types.LIST_SETTINGS_FETCHED_PART_ITEMS,
        payload: count
    };
};

export const setTotalItems = (total) => {
    return {
        type: types.LIST_SETTINGS_TOTAL_ITEMS,
        payload: total
    };
};

export const setTotalLoadedItems = (total) => {
    return {
        type: types.LIST_SETTINGS_TOTAL_LOADED_ITEMS,
        payload: total
    };
};

export const setLoadMore = (load_more) => {
    return {
        type: types.LIST_SETTINGS_LOAD_MORE,
        payload: load_more
    };
};

export const setMemberStatusSelect = (status) => {
    return {
        type: types.LIST_SETTINGS_MEMBER_STATUS,
        payload: status
    };
};

export const setMemberCountrySelect = (country) => {
    return {
        type: types.LIST_SETTINGS_MEMBER_COUNTRY,
        payload: country
    };
};


