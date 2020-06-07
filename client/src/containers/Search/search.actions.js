// Redux constants
import {UPDATE_SEARCH_STRING} from './search.constants';

export const SearchStringUpdateAsyncAction = (string) => {
    return async (dispatch) => {

        dispatch({
            type: UPDATE_SEARCH_STRING,
            payload: string
        })
    };
};
