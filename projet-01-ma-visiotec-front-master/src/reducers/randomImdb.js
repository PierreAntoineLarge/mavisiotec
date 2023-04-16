import {
  SAVE_RANDOM_MOVIES,
  SET_STATE_LOADER_RANDOM,
  SAVE_RANDOM_SERIES,
  SAVE_TOP_RATED_MOVIES,
  SAVE_TOP_RATED_SERIES,
} from '../actions/random';

const initialState = {
  randomMovies: [],
  randomSeries: [],
  topMovies: [],
  topSeries: [],
  isLoaded: false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_STATE_LOADER_RANDOM:
      return {
        ...state,
        isLoaded: action.isLoaded,
      };
    case SAVE_RANDOM_MOVIES:
      console.log('Movies', action.payload);
      return {
        ...state,
        randomMovies: action.payload,
        isLoaded: true,
      };
    case SAVE_RANDOM_SERIES:
      // console.log('Series', action.payload);
      return {
        ...state,
        randomSeries: action.payload,
        isLoaded: true,
      };
    case SAVE_TOP_RATED_MOVIES:
      console.log('MoviesTop', action.topRatedMovies);
      return {
        ...state,
        topMovies: action.topRatedMovies,
      };
    case SAVE_TOP_RATED_SERIES:
      console.log('SerieTop', action.topRatedMovies);
      return {
        ...state,
        topSeries: action.topRatedSeries,
      };
    default:
      return state;
  }
};

export default reducer;
