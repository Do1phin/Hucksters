import { types } from './actionTypes';

export const setLimitItemsSelect = (limit) => {
    return {
        type: types.LIST_SETTINGS_SET_ITEMS_LIMIT,
        payload: limit
    };
};

export const setSkipItemsNumber = (skip) => {
    return {
        type: types.LIST_SETTINGS_SET_NUMBER_OF_SKIP,
        payload: skip
    };
};

export const setSortItemsSelect = (sort) => {
    return {
        type: types.LIST_SETTINGS_SET_SORT_TYPE_OF_ITEMS,
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
        type: types.LIST_SETTINGS_SET_TOTAL_ITEMS,
        payload: total
    };
};

export const setTotalLoadedItems = (total) => {
    return {
        type: types.LIST_SETTINGS_SET_TOTAL_LOADED_ITEMS,
        payload: total
    };
};

export const setLoadMore = (load_more) => {
    return {
        type: types.LIST_SETTINGS_SET_LOAD_MORE,
        payload: load_more
    };
};

export const setMemberStatusSelect = (status) => {
    return {
        type: types.LIST_SETTINGS_SET_MEMBER_STATUS,
        payload: status
    };
};

export const setMemberCountrySelect = (country) => {
    return {
        type: types.LIST_SETTINGS_SET_MEMBER_COUNTRY,
        payload: country
    };
};


