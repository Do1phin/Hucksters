import { types } from './actionTypes';

export const setCheckThingString = (thing) => {
    return {
        type: types.CHECK_THING,
        payload: thing
    };
};

export const setCheckStepNumber = (step) => {
    return {
        type: types.CHECK_STEP,
        payload: step
    };
};

export const setCheckStatusString = (status) => {
    return {
        type: types.CHECK_STATUS,
        payload: status
    };
};

