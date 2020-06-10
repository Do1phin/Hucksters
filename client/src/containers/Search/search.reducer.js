import { SEARCH_STRING_UPDATE } from './search.constants';

const initialState = {
    search_text: ''
};

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_STRING_UPDATE:
            return {
                ...state,
                search_text: action.payload
            };
        default:
            return state
    }
};

export {
    searchReducer
};
