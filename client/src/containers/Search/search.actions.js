// Constants
import {UPDATE_SEARCH_STRING} from './search.constants';

export const updateSearchString = (string) => {
    return async (dispatch) => {

        dispatch({
            type: UPDATE_SEARCH_STRING,
            payload: string
        })
    };
};
