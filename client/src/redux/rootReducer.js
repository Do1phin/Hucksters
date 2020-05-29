import { combineReducers } from 'redux';
import groupReducer from './reducers/group.reducer';
import listReducer from './reducers/list.reducer';
import checkReducer from './reducers/check.reducer';
import checkMemberReducer from './reducers/checkMember.reducer';
import photoReducer from '../containers/Photos/photos.reducer';
import favoriteReducer from './reducers/favorite.reducer';

export default combineReducers({
    groups: groupReducer,
    photos: photoReducer,
    favorites: favoriteReducer,
    list: listReducer,
    checker: checkReducer,
    checker_members: checkMemberReducer
});
