import { UPDATE_SEARCH_STRING } from './search.constants';

const initialState = {
    search_text: ''
};

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SEARCH_STRING:
            return {
                ...state,
                search_text: action.payload
            };
        default:
            return state
    }
};

export default searchReducer;
