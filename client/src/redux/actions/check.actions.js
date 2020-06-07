import { types } from './actionTypes';

export const CheckerSetThingStringAction = (thing) => {
    return {
        type: types.CHECKER_SET_CHECK_THING,
        payload: thing
    };
};

export const CheckerSetStepNumberAction = (step) => {
    return {
        type: types.CHECKER_SET_CHECK_STEP,
        payload: step
    };
};

export const CheckerSetStatusStringAction = (status) => {
    return {
        type: types.CHECKER_SET_CHECK_STATUS,
        payload: status
    };
};

