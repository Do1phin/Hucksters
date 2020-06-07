// Redux constants
import { types } from './actionTypes';

export const loading_start = () => {
    return {
        type: types.LOADING_START,
    };
};

export const loading_stop = () => {
    return {
        type: types.LOADING_STOP,
    };
};

export const fetching_start = () => {
    return {
        type: types.FETCHING_START,
    };
};

export const fetching_stop = () => {
    return {
        type: types.FETCHING_STOP,
    };
};
