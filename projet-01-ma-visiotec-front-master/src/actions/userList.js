// === action types

export const GET_MOVIE_FROM_LIST = 'GET_MOVIE_FROM_LIST';
export const SAVE_LIST_MOVIES = 'SAVE_LIST_MOVIES';
export const GET_SERIES_FROM_LIST = 'GET_SERIES_FROM_LIST';
export const SAVE_LIST_SERIES = 'SAVE_LIST_SERIES';
export const FIND_ID_FROM_EXTERNAL_SERIE = 'FIND_ID_FROM_EXTERNAL_SERIE';
export const FIND_ID_FROM_EXTERNAL_MOVIE = 'FIND_ID_FROM_EXTERNAL_MOVIE';
export const DELETE_SERIE_FROM_LIST = 'DELETE_SERIE_FROM_LIST';
export const DELETE_MOVIE_FROM_LIST = 'DELETE_MOVIE_FROM_LIST';
export const ADD_MOVIE_FROM_HOMEPAGE = 'ADD_MOVIE_FROM_HOMEPAGE';

export const getMovieFromList = () => ({
  type: GET_MOVIE_FROM_LIST,
});

export const saveListMovie = (results) => ({
  type: SAVE_LIST_MOVIES,
  results: results,
});

export const getSerieFromList = () => ({
  type: GET_SERIES_FROM_LIST,
});

export const saveListSeries = (results) => ({
  type: SAVE_LIST_SERIES,
  results: results,
});

export const findIdFromExternalSerie = (idExternal) => ({
  type: FIND_ID_FROM_EXTERNAL_SERIE,
  idExternal: idExternal,
});

export const findIdFromExternalMovie = (idExternal) => ({
  type: FIND_ID_FROM_EXTERNAL_MOVIE,
  idExternal: idExternal,
});

export const deleteSerieFromList = (idUser, idExternal) => ({
  type: DELETE_SERIE_FROM_LIST,
  idUser: idUser,
  idExternal: idExternal,
});

export const deleteMovieFromList = (idUser, idExternal) => ({
  type: DELETE_MOVIE_FROM_LIST,
  idUser: idUser,
  idExternal: idExternal,
});

export const addMovieFromHomepage = (id, mediaStatus, favorite) => ({
  type: ADD_MOVIE_FROM_HOMEPAGE,
  id: id,
  mediaStatus: mediaStatus,
  favorite: favorite,
});
