import { SAVE_LIST_MOVIES, SAVE_LIST_SERIES } from '../actions/userList';

const initialState = {
  // Contain json movie from user's list
  movieMyList: [],
  // Contain json tv shows from user's list
  serieMyList: [],
};

// eslint-disable-next-line consistent-return
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_LIST_MOVIES:
      return {
        ...state,
        movieMyList: action.results,
      };
    case SAVE_LIST_SERIES:
      return {
        ...state,
        serieMyList: action.results,
      };
    default:
      return state;
  }
};

export default reducer;
