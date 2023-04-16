// === action types

// change of one of fields of subscribe
export const UPDATE_SEARCH_FIELD = 'UPDATE_SEARCH_FIELD';
export const RESET_SEARCH = 'RESET_SEARCH';
export const SUBMIT_SEARCH = 'SUBMIT_SEARCH';
export const SAVE_RESULTS = 'SAVE_RESULTS';
export const FETCH_GENRES_TV = 'FETCH_GENRES_TV';
export const FETCH_GENRES_MOVIE = 'FETCH_GENRES_MOVIE';
export const SAVE_GENRES_TV = 'SAVE_GENRES_TV';
export const SAVE_GENRES_MOVIE = 'SAVE_GENRES_MOVIE';
export const SET_STATE_TYPE = 'SET_STATE_TYPE';
/* ----------------------
To show information for one media
----------------------- */
export const SET_STATE_LOADER = 'SET_STATE_LOADER';
export const FETCH_MEDIA = 'FETCH_MEDIA';
export const SET_ID_MEDIA = 'SET_ID_MEDIA';
export const SAVE_DATA_MEDIA = 'SAVE_DATA_MEDIA';
export const FETCH_EPISODES_DATA = 'FETCH_EPISODES_DATA';
export const SAVE_EPISODES_DATA = 'SAVE_EPISODES_DATA';
export const SET_STATE_FAVORITE = 'SET_STATE_FAVORITE';
export const FETCH_FAVORITE_STATUS_SERIE = 'FETCH_FAVORITE_STATUS_SERIE';
export const FETCH_FAVORITE_STATUS_MOVIE = 'FETCH_FAVORITE_STATUS_MOVIE';
/* ----------------------
To send informations to BDD about "Ma liste"
----------------------- */
export const POST_MOVIE_TO_LIST = 'POST_MOVIE_TO_LIST';
export const POST_SERIE_TO_LIST = 'POST_SERIE_TO_LIST';
export const FIND_EXTERNAL_ID_SERIE = 'FIND_EXTERNAL_ID_SERIE';
export const FIND_EXTERNAL_ID_EPISODE_SERIE = 'FIND_EXTERNAL_ID_EPISODE_SERIE';
export const SET_EXTERNAL_ID_MEDIA = 'SET_EXTERNAL_ID_MEDIA';

export const updateSearchField = (identifier, newValue) => ({
  type: UPDATE_SEARCH_FIELD,
  identifier: identifier,
  value: newValue,
});

export const resetSearch = () => ({
  type: RESET_SEARCH,
});

export const submitSearch = () => ({
  type: SUBMIT_SEARCH,
});

export const saveResults = (results) => ({
  type: SAVE_RESULTS,
  results: results,
});

export const fetchGenresTv = () => ({
  type: FETCH_GENRES_TV,
});

export const fetchGenresMovie = () => ({
  type: FETCH_GENRES_MOVIE,
});

export const saveGenreTv = (results) => ({
  type: SAVE_GENRES_TV,
  results: results,
});

export const saveGenreMovie = (results) => ({
  type: SAVE_GENRES_MOVIE,
  results: results,
});

export const setStateType = (typeOfMedia) => ({
  type: SET_STATE_TYPE,
  media: typeOfMedia,
});

/* ----------------------
To show information for one media
----------------------- */
export const setStateLoader = (isLoaded) => ({
  type: SET_STATE_LOADER,
  isLoaded: isLoaded,
});

export const setIdMedia = (id) => ({
  type: SET_ID_MEDIA,
  id: id,
});

export const fetchMedia = (typeMedia, id) => ({
  type: FETCH_MEDIA,
  typeMedia: typeMedia,
  id: id,
});

export const saveDataMedia = (results) => ({
  type: SAVE_DATA_MEDIA,
  results: results,
});

export const fetchEpisodesData = (id) => ({
  type: FETCH_EPISODES_DATA,
  id: id,
});

export const saveEpisodesData = (results) => ({
  type: SAVE_EPISODES_DATA,
  results: results,
});

export const setStateFavorite = (isFavorite) => ({
  type: SET_STATE_FAVORITE,
  isFavorite: isFavorite,
});

export const fetchFavoriteStatusSerie = (id, isFavorite) => ({
  type: FETCH_FAVORITE_STATUS_SERIE,
  id: id,
  isFavorite: isFavorite,
});

export const fetchFavoriteStatusMovie = (id, isFavorite) => ({
  type: FETCH_FAVORITE_STATUS_MOVIE,
  id: id,
  isFavorite: isFavorite,
});

/* ----------------------
To send informations to BDD about "Ma liste"
----------------------- */

export const postMovieToList = (
  userId,
  mediaId,
  mediaTitle,
  pictureUrl,
  isFavorite,
  mediaStatus,
  synopsis,
) => ({
  type: POST_MOVIE_TO_LIST,
  userId: userId,
  mediaId: mediaId,
  mediaTitle: mediaTitle,
  pictureUrl: pictureUrl,
  isFavorite: isFavorite,
  mediaStatus: mediaStatus,
  // TODO later change synopsis to id
  synopsis: synopsis,
});

export const postSerieToList = (
  userId,
  mediaId,
  title,
  picture,
  isFavorite,
  mediaStatus,
  lastEpisode,
  lastSeasons,
  journey,
  synopsis,
) => ({
  type: POST_SERIE_TO_LIST,
  userId: userId,
  mediaId: mediaId,
  title: title,
  picture: picture,
  isFavorite: isFavorite,
  mediaStatus: mediaStatus,
  lastEpisode: lastEpisode,
  lastSeasons: lastSeasons,
  journey: journey,
  // TODO later change synopsis to id
  synopsis: synopsis,
});

export const findExternalIdSerie = (mediaId) => ({
  type: FIND_EXTERNAL_ID_SERIE,
  mediaId: mediaId,
});

export const findExternalIdEpisodeSerie = (serieId, seasonNumber, episodeNumber) => ({
  type: FIND_EXTERNAL_ID_EPISODE_SERIE,
  serieId: serieId,
  seasonNumber: seasonNumber,
  episodeNumber: episodeNumber,
});

export const setExternalIdMedia = (externalId) => ({
  type: SET_EXTERNAL_ID_MEDIA,
  externalId: externalId,
});

export const GET_MOVIE_FROM_LIST = 'GET_MOVIE_FROM_LIST';
export const getMovieFromList = () => ({
  type: GET_MOVIE_FROM_LIST,
});

export const RESET_ID_AND_TYPE = 'RESET_ID_AND_TYPE';
export const resetIdAndType = () => ({
  type: 'RESET_ID_AND_TYPE',
  payload: {
    id_media: null,
    type: null,
    isLoaded: false,
    data_media: null,
  },
});

export const CLEAR_DATA_MEDIA = 'CLEAR_DATA_MEDIA';
export const clearDataMedia = () => ({
  type: CLEAR_DATA_MEDIA,
});
