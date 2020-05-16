import {combineReducers} from "redux";
import groupReducer from './group.reducer';
import listReducer from './list.reducer';

export default combineReducers({
    group: groupReducer,
    list: listReducer,
});
