import { types } from '../actions/actionTypes';

const initialState = {
    limit: 100,
    sort: -1,
    skip: 0,
    part_items: 0,
    total_loaded_items: 0,
    total_items: 0,
    member_status: 'Seller',
    member_country: '',
};

const listSettingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LIST_SETTINGS_SET_ITEMS_LIMIT:
            return {
                ...state,
                limit: action.payload
            };
        case types.LIST_SETTINGS_SET_NUMBER_OF_SKIP:
            return {
                ...state,
                skip: action.payload
            };
        case types.LIST_SETTINGS_SET_SORT_TYPE_OF_ITEMS:
            return {
                ...state,
                sort: action.payload
            };
        case types.LIST_SETTINGS_FETCHED_PART_ITEMS:
            return {
                ...state,
                part_items: action.payload
            };
        case types.LIST_SETTINGS_SET_TOTAL_ITEMS:
            return {
                ...state,
                total_items: action.payload
            };
        case types.LIST_SETTINGS_SET_TOTAL_LOADED_ITEMS:
            return {
                ...state,
                total_loaded_items: action.payload
            };
        case types.LIST_SETTINGS_SET_LOAD_MORE:
            return {
                ...state,
                load_more: action.payload
            };
        case types.LIST_SETTINGS_SET_MEMBER_STATUS:
            return {
                ...state,
                member_status: action.payload
            };
        case types.LIST_SETTINGS_SET_MEMBER_COUNTRY:
            return {
                ...state,
                member_country: action.payload
            };
        default:
            return state
    }
};

export {
    listSettingsReducer
};
