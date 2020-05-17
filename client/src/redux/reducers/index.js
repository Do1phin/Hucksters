import {combineReducers} from "redux";
import groupReducer from './group.reducer';
import listReducer from './list.reducer';
import checkReducer from './check.reducer';

export default combineReducers({
    group: groupReducer,
    list: listReducer,
    checker: checkReducer
});
