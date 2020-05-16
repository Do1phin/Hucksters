import {
    LIST_SETTINGS_FETCHED_PART_ITEMS,
    LIST_SETTINGS_LIMIT_ITEMS,
    LIST_SETTINGS_LOAD_MORE,
    LIST_SETTINGS_MEMBER_COUNTRY,
    LIST_SETTINGS_MEMBER_STATUS,
    LIST_SETTINGS_SEARCH_TEXT,
    LIST_SETTINGS_SKIP_ITEMS,
    LIST_SETTINGS_SORT_ITEMS,
    LIST_SETTINGS_TOTAL_ITEMS,
} from '../actions/actionTypes';

const initialState = {
    limit: 100,
    skip: 0,
    sort: -1,
    search_text: '',
    total_items: 0,
    member_status: 'Seller',
    member_country: '',
};

const listReducers = (state = initialState, action) => {
    switch (action.type) {
        case LIST_SETTINGS_LIMIT_ITEMS:
            return {
                ...state,
                limit: action.payload
            };
        case LIST_SETTINGS_SKIP_ITEMS:
            return {
                ...state,
                skip: action.payload
            };
        case LIST_SETTINGS_SORT_ITEMS:
            return {
                ...state,
                sort: action.payload
            };
        case LIST_SETTINGS_FETCHED_PART_ITEMS:
            return {
                ...state,
                part_items: action.payload
            };
        case LIST_SETTINGS_TOTAL_ITEMS:
            return {
                ...state,
                total_items: action.payload
            };
        case LIST_SETTINGS_SEARCH_TEXT:
            return {
                ...state,
                search_text: action.payload
            };
        case LIST_SETTINGS_LOAD_MORE:
            return {
                ...state,
                loadMore: action.payload
            };
        case LIST_SETTINGS_MEMBER_STATUS:
            return {
                ...state,
                member_status: action.payload
            };
        case LIST_SETTINGS_MEMBER_COUNTRY:
            return {
                ...state,
                member_country: action.payload
            };
        default:
            return state
    }
};

export default listReducers;
