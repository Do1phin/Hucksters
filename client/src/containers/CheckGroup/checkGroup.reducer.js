import {CHECK_GROUP_SET_ID_CHECKING_GROUP} from './checkGroup.constants';

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
        default:
            return state
    }
};

export {
    checkGroupReducer
};
