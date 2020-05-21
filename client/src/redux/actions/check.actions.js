import {
    CHECK_THING,
    CHECK_STEP,
    CHECK_STATUS
} from "./actionTypes";

export const setCheckThingString = (thing) => {
    return {
        type: CHECK_THING,
        payload: thing
    }
};

export const setCheckStepNumber = (step) => {
    return {
        type: CHECK_STEP,
        payload: step
    }
};

export const setCheckStatusString = (status) => {
    return {
        type: CHECK_STATUS,
        payload: status
    }
};

