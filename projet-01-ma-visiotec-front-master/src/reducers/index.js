import { combineReducers } from 'redux';

import buttonsReducer from './buttons';
import subscribeReducer from './subscribe';
import searchReducer from './search';
import updateUser from './updateUser';
import randomImdb from './randomImdb';
import navListCategory from './navListCategory';
import userList from './userList';

// un reducer principal qui combine les autres (le store veut un seul reducer)
const rootReducer = combineReducers({
  // nom du tiroir: reducer qui s'occupe de ce tiroir
  buttons: buttonsReducer,
  subscribe: subscribeReducer,
  search: searchReducer,
  updateUser: updateUser,
  randomImdb: randomImdb,
  navList: navListCategory,
  userList: userList,
});

export default rootReducer;
