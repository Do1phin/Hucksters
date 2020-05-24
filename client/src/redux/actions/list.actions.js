import {
    LIST_SETTINGS_LIMIT_ITEMS,
    LIST_SETTINGS_SKIP_ITEMS,
    LIST_SETTINGS_SORT_ITEMS,
    LIST_SETTINGS_SEARCH_TEXT,
    LIST_SETTINGS_FETCHED_PART_ITEMS,
    LIST_SETTINGS_TOTAL_ITEMS,
    LIST_SETTINGS_LOAD_MORE,
    LIST_SETTINGS_MEMBER_STATUS,
    LIST_SETTINGS_MEMBER_COUNTRY
} from './actionTypes';

export const setLimitItemsSelect = (limit) => {
    return {
        type: LIST_SETTINGS_LIMIT_ITEMS,
        payload: limit
    };
};

export const setSkipItemsNumber = (skip) => {
    return {
        type: LIST_SETTINGS_SKIP_ITEMS,
        payload: skip
    };
};

export const setSortItemsSelect = (sort) => {
    return {
        type: LIST_SETTINGS_SORT_ITEMS,
        payload: sort
    };
};

export const setSearchTextString = (string) => {
    return {
        type: LIST_SETTINGS_SEARCH_TEXT,
        payload: string
    };
};

export const setPartItems = (count) => {
    return {
        type: LIST_SETTINGS_FETCHED_PART_ITEMS,
        payload: count
    };
};

export const setTotalItems = (total) => {
    return {
        type: LIST_SETTINGS_TOTAL_ITEMS,
        payload: total
    };
};

export const setLoadMore = (loadMore) => {
    return {
        type: LIST_SETTINGS_LOAD_MORE,
        payload: loadMore
    };
};

export const setMemberStatusSelect = (status) => {
    return {
        type: LIST_SETTINGS_MEMBER_STATUS,
        payload: status
    };
};

export const setMemberCountrySelect = (country) => {
    return {
        type: LIST_SETTINGS_MEMBER_COUNTRY,
        payload: country
    };
};


