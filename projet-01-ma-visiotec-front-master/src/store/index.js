import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
// import reducer from 'src/reducers/subscribeReducer';
// on importe src/reducers/index.js
import reducer from 'src/reducers';
// eslint-disable-next-line import/no-extraneous-dependencies
// import filterActions from '../middlewares/filterActions';
import userMiddleware from '../middlewares/userMiddleware';
import searchMiddleware from '../middlewares/searchMiddleware';
import updateUserMiddleware from '../middlewares/updateUserMiddleware';
import listUserMiddleware from '../middlewares/listUserMiddleware';
import randomImdbMiddleware from '../middlewares/randomImdbMiddleware';

// une autre façon d'intégrer redux-devtools-extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
  applyMiddleware(
    // filterActions,
    userMiddleware,
    updateUserMiddleware,
    searchMiddleware,
    listUserMiddleware,
    randomImdbMiddleware,
  ),
);

const store = createStore(reducer, enhancers);

export default store;
