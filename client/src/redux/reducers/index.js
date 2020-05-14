import {combineReducers} from "redux";
import groupReducer from './group.reducer';

export default combineReducers({
    group: groupReducer
});
