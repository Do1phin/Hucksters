// Redux constants
import { types } from './actionTypes';

export const loadingStart = () => {
    return {
        type: types.LOADING_START,
    };
};

export const loadingStop = () => {
    return {
        type: types.LOADING_STOP,
    };
};

export const fetchingStart = () => {
    return {
        type: types.FETCHING_START,
    };
};

export const fetchingStop = () => {
    return {
        type: types.FETCHING_STOP,
    };
};
