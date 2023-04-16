import {
  SAVE_DATA_MEDIA,
  SAVE_GENRES_MOVIE,
  SAVE_GENRES_TV,
  SAVE_RESULTS,
  SET_ID_MEDIA,
  SET_STATE_TYPE,
  UPDATE_SEARCH_FIELD,
  SET_STATE_LOADER,
  SAVE_EPISODES_DATA,
  RESET_SEARCH,
  RESET_ID_AND_TYPE,
  SET_EXTERNAL_ID_MEDIA,
  CLEAR_DATA_MEDIA,
} from '../actions/search';

const initialState = {
  // Cuntain user's search. Has to contain a name of a series or movie
  searchValue: '',
  // type of the media to search
  type: 'tv',
  // contain results of the search
  list: [],
  // contain ids and name of TV show's genres
  list_genres_tv: [],
  // contain ids and name of Movie's genres
  list_genres_movie: [],
  // contain one id for the resume page
  id_media: 0,
  // contain one id for the resume page
  external_id_media: '',
  // contain data for one media
  data_media: [],
  // contain data for one media
  data_episodes: [],
  // show if call to API is done
  isLoaded: false,
  // status to show if this media is favorite
  isFavorite: false,
};

// eslint-disable-next-line consistent-return
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_SEARCH_FIELD: {
      if (action.identifier === 'search') {
        return {
          ...state,
          searchValue: action.value,
        };
      }
      break;
    }
    case RESET_SEARCH:
      return {
        ...state,
        searchValue: '',
        // list: [],
      };

    case SAVE_RESULTS:
      return {
        ...state,
        list: action.results,
        searchValue: '',
      };

    case SAVE_GENRES_TV:
      return {
        ...state,
        list_genres_tv: action.results,
      };

    case SAVE_GENRES_MOVIE:
      return {
        ...state,
        list_genres_movie: action.results,
      };

    case SET_STATE_TYPE:
      return {
        ...state,
        type: action.media,
      };

      /*-----------------
      About ResumePage - call API
      -----------------*/
    case SET_STATE_LOADER:
      return {
        ...state,
        isLoaded: action.isLoaded,
      };

    case SET_ID_MEDIA:
      return {
        ...state,
        id_media: action.id,
      };

    case RESET_ID_AND_TYPE:
      return {
        ...state,
        id_media: action.payload.id_media,
        type: action.payload.type,
        isLoaded: action.payload.isLoaded,
        data_media: action.payload.data_media,
      };

    case SAVE_DATA_MEDIA:
      return {
        ...state,
        data_media: action.results,
        // data are saved, so we say loading is over
        isLoaded: true,
      };

    case SAVE_EPISODES_DATA:
      return {
        ...state,
        data_episodes: action.results,
        isLoaded: true,
      };

    case SET_EXTERNAL_ID_MEDIA:
      return {
        ...state,
        external_id_media: action.externalId,
      };

    case CLEAR_DATA_MEDIA:
      return {
        ...state,
        data_media: {},
        isLoaded: false,
        id_media: 0,
        type: 'tv',

      };
    default:
      return state;
  }
};

export default reducer;
