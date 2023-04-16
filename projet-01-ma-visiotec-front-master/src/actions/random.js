export const FETCH_RANDOM_MOVIES = 'FETCH_RANDOM_MOVIES';
export const fetchRandomMovies = () => ({
  type: FETCH_RANDOM_MOVIES,
});

export const SAVE_RANDOM_MOVIES = 'SAVE_RANDOM_MOVIES';
export const saveRandomMovies = (randomMovies) => ({
  type: SAVE_RANDOM_MOVIES,
  payload: randomMovies,
});

export const FETCH_RANDOM_SERIES = 'FETCH_RANDOM_SERIES';
export const fetchRandomSeries = () => ({
  type: FETCH_RANDOM_SERIES,
});

export const SAVE_RANDOM_SERIES = 'SAVE_RANDOM_SERIES';
export const saveRandomSerie = (randomSeries) => ({
  type: SAVE_RANDOM_SERIES,
  payload: randomSeries,
});

export const SET_STATE_LOADER_RANDOM = 'SET_STATE_LOADER_RANDOM';
export const setStateLoaderRandom = (isLoaded) => ({
  type: SET_STATE_LOADER_RANDOM,
  isLoaded: isLoaded,
});

export const SAVE_TOP_RATED_MOVIES = 'SAVE_TOP_RATED_MOVIES';
export const saveTopRatedMovies = (topRatedMovies) => ({
  type: SAVE_TOP_RATED_MOVIES,
  topRatedMovies: topRatedMovies,
});

export const FETCH_TOP_RATED_MOVIES = 'FETCH_TOP_RATED_MOVIES';
export const fetchTopRatedMovies = () => ({
  type: FETCH_TOP_RATED_MOVIES,
});

export const SAVE_TOP_RATED_SERIES = 'SAVE_TOP_RATED_SERIES';
export const saveTopRatedSeries = (topRatedSeries) => ({
  type: SAVE_TOP_RATED_SERIES,
  topRatedSeries: topRatedSeries,
});

export const FETCH_TOP_RATED_SERIES = 'FETCH_TOP_RATED_SERIES';
export const fetchTopRatedSeries = () => ({
  type: FETCH_TOP_RATED_SERIES,
});
