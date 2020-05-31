// Core
import { combineReducers } from 'redux';
// Reducers
import albumReducer from '../containers/Albums/albums.reducer';
import groupReducer from './reducers/group.reducer';
import listSettingsReducer from './reducers/listSettingsReducer';
import checkReducer from './reducers/check.reducer';
import checkMemberReducer from './reducers/checkMember.reducer';
import favoriteReducer from './reducers/favorite.reducer';
import photoReducer from '../containers/Photos/photos.reducer';
import searchReducer from '../containers/Search/search.reducer';
import memberReducer from '../containers/Members/members.reducer';
import generalSettingsReducer from './reducers/generalSettings.reducer';

export default combineReducers({
    groups: groupReducer,
    albums: albumReducer,
    members: memberReducer,
    photos: photoReducer,
    favorites: favoriteReducer,
    search: searchReducer,
    general_settings: generalSettingsReducer,
    list_settings: listSettingsReducer,
    checker: checkReducer,
    checker_members: checkMemberReducer
});
