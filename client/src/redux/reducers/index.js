import {combineReducers} from 'redux';
import groupReducer from './group.reducer';
import listReducer from './list.reducer';
import checkReducer from './check.reducer';
import checkMemberReducer from './checkMember.reducer';

export default combineReducers({
    group: groupReducer,
    list: listReducer,
    checker: checkReducer,
    checker_members: checkMemberReducer
});
