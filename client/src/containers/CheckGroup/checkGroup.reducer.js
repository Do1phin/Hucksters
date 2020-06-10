import { CHECK_GROUP_SET_ID_CHECKING_GROUP, CHECK_GROUP_SET_GROUP_SIZE } from './checkGroup.constants';

const initialState = {
    group_id: null,
    group_size: null,
};

const checkGroupReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHECK_GROUP_SET_ID_CHECKING_GROUP:
            return {
                ...state,
                group_id: action.payload
            };
        case CHECK_GROUP_SET_GROUP_SIZE:
            return {
                ...state,
                group_size: action.payload
            };
        default:
            return state
    }
};

export {
    checkGroupReducer
};
