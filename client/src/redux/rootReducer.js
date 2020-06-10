// Core
import {combineReducers} from 'redux';
// Reducers
import {albumReducer} from '../containers/Albums/albums.reducer';
import {groupReducer} from '../containers/Groups/groups.reducer';
import {listSettingsReducer} from './reducers/listSettingsReducer';
import {checkerReducer} from './reducers/checkerReducer';
import {checkGroupReducer} from '../containers/CheckGroup/checkGroup.reducer';
import {checkMemberReducer} from '../containers/CheckMember/checkMember.reducer';
import {favoriteReducer} from './reducers/favorite.reducer';
import {photoReducer} from '../containers/Photos/photos.reducer';
import {searchReducer} from '../containers/Search/search.reducer';
import {memberReducer} from '../containers/Members/members.reducer';
import {generalSettingsReducer} from './reducers/generalSettings.reducer';

export default combineReducers({
    groups: groupReducer,
    albums: albumReducer,
    members: memberReducer,
    photos: photoReducer,
    favorites: favoriteReducer,
    search: searchReducer,
    general_settings: generalSettingsReducer,
    list_settings: listSettingsReducer,
    checker: checkerReducer,
    check_groups: checkGroupReducer,
    check_members: checkMemberReducer,
});
