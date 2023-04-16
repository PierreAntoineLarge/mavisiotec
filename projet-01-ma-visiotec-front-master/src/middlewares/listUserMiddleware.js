import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { toast } from 'react-toastify';
import { ToastError, ToastSuccess } from '../data/ToastOption';
import {
  fetchMedia,
  FIND_EXTERNAL_ID_EPISODE_SERIE,
  FIND_EXTERNAL_ID_SERIE,
  postMovieToList,
  POST_MOVIE_TO_LIST,
  POST_SERIE_TO_LIST,
  setExternalIdMedia,
} from '../actions/search';
import {
  DELETE_MOVIE_LIST,
  DELETE_SERIE_LIST,
  GET_LIST_FILM,
  GET_LIST_SERIE,
  LIST_URL_FILM,
  LIST_URL_SERIE,
} from '../data/ApiUrl';
import {
  ADD_MOVIE_FROM_HOMEPAGE,
  DELETE_MOVIE_FROM_LIST,
  DELETE_SERIE_FROM_LIST,
  FIND_ID_FROM_EXTERNAL_MOVIE,
  FIND_ID_FROM_EXTERNAL_SERIE,
  getMovieFromList,
  getSerieFromList,
  GET_MOVIE_FROM_LIST,
  GET_SERIES_FROM_LIST,
  saveListMovie,
  saveListSeries,
} from '../actions/userList';
// searchValue = the name of the serie
// type = movie, tv show etc...
//     axios.get(`https://api.themoviedb.org/3/search/${type}?api_key=901710c058c1ae1271c782a0d4587f4f&language=vf-FR&page=1&query=${searchValue}&include_adult=false`)
/**
 * Function to search in the API
 * @param {string} param0 searchValue : name of the media
 * @param {string} param1 type : movie or tv
 */
const listUserMiddleware = (store) => (next) => (action) => {
  // console.log('on a intercepté une action dans le middleware userMiddleware: ', action);
  // console.log(store.getState().subscribeReducer.isLogged);
  // console.log(store.getState().search.searchValue);
  // console.log(`https://api.themoviedb.org/3/search/${store.getState().search.type}?api_key=901710c058c1ae1271c782a0d4587f4f&language=vf-FR&page=1&query=${store.getState().search.searchValue}&include_adult=false`);
  switch (action.type) {
    case POST_MOVIE_TO_LIST:
      // Send request to the API
      console.log('POST_MOVIE_TO_LIST triggered');
      console.log({
        user: action.userId,
        movies: action.mediaId,
        title: action.mediaTitle,
        picture: action.pictureUrl,
        favorites: action.isFavorite,
        status: action.mediaStatus,
        // TODO later change synopsis to id
        synopsis: action.synopsis,
      });
      axios.post(
        LIST_URL_FILM,
        {
          user: action.userId,
          movies: action.mediaId,
          title: action.mediaTitle,
          picture: action.pictureUrl,
          favorites: action.isFavorite,
          status: action.mediaStatus,
          // TODO later change synopsis to id
          synopsis: action.synopsis,
        },
        {
          headers: {
            Authorization: `Bearer ${store.getState().subscribe.token}`,
          },
        },
      )
        .then((response) => {
          // console.log(response.data.results);
          if (response.status === 200) {
            toast.success('Le film a été rajouté à votre liste', { ...ToastSuccess, className: 'toast-success' });
          }
          store.dispatch(getMovieFromList());
        })
        .then((response) => {
          // console.log(response.data.results);
          if (response.status === 200) {
            toast.success('Le film a été rajouté à votre liste', { ...ToastSuccess, className: 'toast-success' });
          }
          store.dispatch(getMovieFromList());
        })
        .catch((error) => {
          console.log(error);
          // toast.error('Désolé, l\'ajout de ce film n\'a pas abouti ',
          //  { ...ToastError, className: 'toast-error' });
        });
      break;
    case POST_SERIE_TO_LIST:
      // Send request to the API
      console.log(action.mediaStatus);
      // console.log(Object.toString(action.journey));
      console.log({
        user: action.userId,
        series: action.mediaId,
        title: action.title,
        picture: action.picture,
        favorites: action.isFavorite,
        status: action.mediaStatus,
        last_episodes: action.lastEpisode,
        last_seasons: action.lastSeasons,
        journey: action.journey,
        synopsis: action.synopsis,
      });
      axios.post(
        LIST_URL_SERIE,
        {
          user: action.userId,
          series: action.mediaId,
          title: action.title,
          picture: action.picture,
          favorites: action.isFavorite,
          status: action.mediaStatus,
          // last_episode and last_seasons is user's position in his watching
          last_episodes: action.lastEpisode,
          last_seasons: action.lastSeasons,
          journey: action.journey,
          // TODO later change synopsis to id
          synopsis: action.synopsis,
        },
        {
          headers: {
            Authorization: `Bearer ${store.getState().subscribe.token}`,
          },
        },
      )
        .then((response) => {
          // console.log(response.data.results);
          if (response.status === 200) {
            toast.success('La série a été rajouté à votre liste', { ...ToastSuccess, className: 'toast-success' });
          }
          store.dispatch(getSerieFromList());
        })
        .catch((error) => {
          console.log(error);
          // toast.error('Désolé, l\'ajout de cette série n\'a pas abouti ', 
          //  { ...ToastError, className: 'toast-error' });
        });
      break;
    case FIND_ID_FROM_EXTERNAL_MOVIE:
      axios.get(`https://api.themoviedb.org/3/find/${action.idExternal}?api_key=901710c058c1ae1271c782a0d4587f4f&language=fr-FR&external_source=imdb_id`)
        .then((response) => {
          console.log(response);
          // TODO Ajouter fonction  setStateLoader(true); ?
          // TODO <Redirect to={`/resume/movie/${response.data}`} sélectionner id
        })
        .catch((error) => {
          console.log(error);
          toast.error('Désolé, il semblerai que les informations concernant ce média ne sont pas disponible', { ...ToastError, className: 'toast-error' });
        });
      break;
    case FIND_ID_FROM_EXTERNAL_SERIE:
      axios.get(`https://api.themoviedb.org/3/find/${action.idExternal}?api_key=901710c058c1ae1271c782a0d4587f4f&language=fr-FR&external_source=tvdb_id`)
        .then((response) => {
          console.log(response.data.tv_results[0].id);
          const navigate = useNavigate();
          React.useEffect(() => {
            navigate(`/resume/tv/${response.data.tv_results[0].id}`);
          });
          // console.log(`/resume/tv/${response.data.tv_results[0].id}`);
          // TODO Ajouter fonction  setStateLoader(true); ?
          // browserHistory.push(`/resume/tv/${response.data.tv_results[0].id}`);
          // navigate(`/resume/tv/${response.data.tv_results[0].id}`);
        })
        .catch((error) => {
          console.log(error);
          toast.error('Désolé, il semblerai que les informations concernant ce média ne sont pas disponible', { ...ToastError, className: 'toast-error' });
        });
      break;
    case FIND_EXTERNAL_ID_SERIE:
      axios.get(`https://api.themoviedb.org/3/tv/${action.mediaId}/external_ids?api_key=901710c058c1ae1271c782a0d4587f4f&language=fr-FR`)
        .then((response) => {
          // console.log(response.data.tvdb_id);
          store.dispatch(setExternalIdMedia(response.data.tvdb_id));
          // TODO Ajouter fonction  setStateLoader(true); ?
        })
        .catch((error) => {
          console.log(error);
          toast.error('Désolé, il semblerai que les informations concernant ce média ne sont pas disponible', { ...ToastError, className: 'toast-error' });
        });
      break;
    case FIND_EXTERNAL_ID_EPISODE_SERIE:
      axios.get(`https://api.themoviedb.org/3/tv/${action.serieId}/season/${action.seasonNumber}/episode/${action.episodeNumber}/external_ids?api_key=901710c058c1ae1271c782a0d4587f4f&language=fr-FR`)
        .then((response) => {
          console.log(response);
          // TODO Ajouter fonction  setStateLoader(true); ?
        })
        .catch((error) => {
          console.log(error);
          // toast.error('Désolé, il semblerai que les informations concernant ce média ne sont pas 
          //  disponible', { ...ToastError, className: 'toast-error' });
        });
      break;
    case GET_MOVIE_FROM_LIST:
      console.log('GET_MOVIE_FROM_LIST déclenché');
      // Send request to the API
      console.log({ user: store.getState().subscribe.idUser });
      axios.get(
        GET_LIST_FILM,
        {
          headers: {
            Authorization: `Bearer ${store.getState().subscribe.token}`,
          },
        },
        {
          user: store.getState().subscribe.idUser,
        },
      )
        .then((responses) => {
          console.log(responses);
          console.log('Film results are saved in state');
          store.dispatch(saveListMovie(responses.data));
          console.log(responses.data);
        })
        .catch((error) => {
          console.log(error);
          toast.error('Désolé, l\'affichage des films n\'a pas abouti ', { ...ToastError, className: 'toast-error' });
        });
      break;

    case GET_SERIES_FROM_LIST:
      console.log('GET_SERIES_FROM_LIST déclenché');
      // Send request to the API
      axios.get(
        GET_LIST_SERIE,
        {
          headers: {
            Authorization: `Bearer ${store.getState().subscribe.token}`,
          },
        },
      )
        .then((responses) => {
          console.log('TV Show results are saved in state');
          store.dispatch(saveListSeries(responses.data));
          console.log(responses.data);
        })
        .catch((error) => {
          console.log(error);
          toast.error('Désolé, l\'affichage des séries n\'a pas abouti ', { ...ToastError, className: 'toast-error' });
        });
      break;
    case DELETE_MOVIE_FROM_LIST:
      console.log(`DELETE_MOVIE_FROM_LIST déclenché pour le média ${action.idExternal}`);
      // pour le média ${} Send request to the API
      console.log(`${DELETE_MOVIE_LIST}${action.idExternal}`);
      console.log({
        user: action.idUser,
        movies: action.idExternal,
      });
      // console.log(`Authorization: Bearer ${store.getState().subscribe.token}`);
      axios.delete(
        `${DELETE_MOVIE_LIST}${action.idExternal}`,
        {
          headers: {
            Authorization: `Bearer ${store.getState().subscribe.token}`,
          },
        },
        {
          data: {
            user: action.idUser,
            // synopsis: `${action.idExternal}`,
          },
        },
      )
        .then((responses) => {
          console.log(responses);
          console.log('Movie has been deleted from user\'s list');
          // console.log(responses);
        })
        .catch((error) => {
          console.log(error);
          toast.error('Désolé, la suppression du film n\'a pas abouti ', { ...ToastError, className: 'toast-error' });
        });
      break;
    case DELETE_SERIE_FROM_LIST:
      console.log(`DELETE_SERIE_FROM_LIST déclenché pour le média ${action.idExternal}`);
      // Send request to the API
      console.log(`${DELETE_SERIE_LIST}${action.idExternal}`);
      console.log({
        user: action.idUser,
        series: action.idExternal,
      });
      axios.delete(
        `${DELETE_SERIE_LIST}${action.idExternal}`,
        {
          headers: {
            Authorization: `Bearer ${store.getState().subscribe.token}`,
          },
        },
        {
          user: action.idUser,
          // series: action.idExternal,
        },
      )
        .then((responses) => {
          console.log('TV Show has been deleted from user\'s list');
          console.log(responses);
        })
        .catch((error) => {
          console.log(error);
          toast.error('Désolé, la suppression de la série n\'a pas abouti ', { ...ToastError, className: 'toast-error' });
        });
      break;
    case ADD_MOVIE_FROM_HOMEPAGE:
      // Send request to the API
      console.log('ADD_MOVIE_FROM_HOMEPAGE déclenché');
      store.dispatch(fetchMedia('movie', action.id));
      console.log(
        store.getState().subscribe.idUser,
        store.getState().search.data_media.imdb_id,
        store.getState().search.data_media.title,
        store.getState().search.data_media.poster_path,
        action.favorite,
        action.mediaStatus,
        store.getState().search.data_media.id,
      )
        .then((response) => {
          console.log(response);
          store.dispatch(
            postMovieToList(
              store.getState().subscribe.idUser,
              store.getState().search.data_media.imdb_id,
              store.getState().search.data_media.title,
              store.getState().search.data_media.poster_path,
              action.favorite,
              action.mediaStatus,
              store.getState().search.data_media.id,
            ),
          );
        })
        .catch((error) => {
          console.log(error);
          toast.error('Désolé, l\'ajout de ce film n\'a pas abouti ', { ...ToastError, className: 'toast-error' });
        });
      break;
    default:
  }
  next(action);
};
export default listUserMiddleware;
