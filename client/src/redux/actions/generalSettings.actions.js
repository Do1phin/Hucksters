// Redux constants
import { types } from './actionTypes';

export const loading = () => {
    return {
        type: types.LOADING,
        payload: true
    };
};

export const fetching = () => {
    return {
        type: types.FETCHING,
        payload: true
    };
};
