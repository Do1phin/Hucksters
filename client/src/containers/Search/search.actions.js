// Redux constants
import { SEARCH_STRING_UPDATE } from './search.constants';

export const SearchStringUpdateAsyncAction = (string) => {
    return async (dispatch) => {

        dispatch({
            type: SEARCH_STRING_UPDATE,
            payload: string
        })
    };
};

