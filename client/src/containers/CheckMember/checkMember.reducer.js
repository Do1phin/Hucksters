import { types } from '../../redux/actions/actionTypes'

const initialState = {
    all_members: 0,
    with_info: 0,
    closed: 0,
    seller: 0,
    banned: 0,
    deleted: 0
};

const checkMemberReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CHECK_MEMBERS_ALL:
            return {
                ...state,
                all_members: action.payload
            };
        case types.CHECK_MEMBERS_WITH_INFO:
            return {
                ...state,
                with_info: action.payload
            };
        case types.CHECK_MEMBERS_CLOSED:
            return {
                ...state,
                closed: action.payload
            };
        case types.CHECK_MEMBERS_SELLER:
            return {
                ...state,
                seller: action.payload
            };
        case types.CHECK_MEMBERS_BANNED:
            return {
                ...state,
                banned: action.payload
            };
        case types.CHECK_MEMBERS_DELETED:
            return {
                ...state,
                deleted: action.payload
            };
        default:
            return state
    }
};

export {
    checkMemberReducer
};
