import axios from 'axios';
// import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ToastError } from '../data/ToastOption';
import {
  // FETCH_EPISODES_DATA,
  FETCH_FAVORITE_STATUS_MOVIE,
  FETCH_FAVORITE_STATUS_SERIE,
  FETCH_GENRES_MOVIE,
  FETCH_GENRES_TV,
  FETCH_MEDIA,
  saveDataMedia,
  // saveEpisodesData,
  saveGenreMovie,
  saveGenreTv,
  saveResults,
  SUBMIT_SEARCH,
} from '../actions/search';
import { FAVORITE_URL } from '../data/ApiUrl';
// searchValue = the name of the serie
// type = movie, tv show etc...
//     axios.get(`https://api.themoviedb.org/3/search/${type}?api_key=901710c058c1ae1271c782a0d4587f4f&language=vf-FR&page=1&query=${searchValue}&include_adult=false`)
/**
 * Function to search in the API
 * @param {string} param0 searchValue : name of the media
 * @param {string} param1 type : movie or tv
 */

const searchMiddleware = (store) => (next) => (action) => {
  // console.log('on a intercepté une action dans le middleware userMiddleware: ', action);
  // console.log(store.getState().subscribeReducer.isLogged);
  // console.log(store.getState().search.searchValue);
  // console.log(`https://api.themoviedb.org/3/search/${store.getState().search.type}?api_key=901710c058c1ae1271c782a0d4587f4f&language=vf-FR&page=1&query=${store.getState().search.searchValue}&include_adult=false`);
  switch (action.type) {
    case SUBMIT_SEARCH:
      // Send request to the API
      axios.get(`https://api.themoviedb.org/3/search/${store.getState().search.type}?api_key=901710c058c1ae1271c782a0d4587f4f&language=fr-FR&page=1&query=${store.getState().search.searchValue}&include_adult=false`)
        .then((response) => {
          // console.log(response.data.results);
          store.dispatch(saveResults(response.data.results));
        })
        .catch((error) => {
          console.log(error);
          toast.error('Désolé, cette recherche n\'a rien donné ', { ...ToastError, className: 'toast-error' });
        });

      break;

    case FETCH_GENRES_TV:
      // Send request to the API
      axios.get('https://api.themoviedb.org/3/genre/tv/list?api_key=901710c058c1ae1271c782a0d4587f4f&language=fr-FR')
        .then((response) => {
        // console.log(response.data.genres);
        // We send genres's id to the state to use them later
          store.dispatch(saveGenreTv(response.data.genres));
        })
        .catch((error) => {
          console.log(error);
        });

      break;

    case FETCH_GENRES_MOVIE:
      axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=901710c058c1ae1271c782a0d4587f4f&language=fr-FR')
        .then((response) => {
        // console.log(response.data.genres);
        // We send genres's id to the state to use them later
          store.dispatch(saveGenreMovie(response.data.genres));
          // setStateLoader(true);
        })
        .catch((error) => {
          console.log(error);
        });

      break;

    case FETCH_MEDIA:
      console.log('FETCH_MEDIA DÉCLENCHÉ');
      // console.log(`https://api.themoviedb.org/3/${store.getState().search.type}/${store.getState().search.id_media}?api_key=901710c058c1ae1271c782a0d4587f4f&language=fr-FR`);
      axios.get(`https://api.themoviedb.org/3/${action.typeMedia}/${action.id}?api_key=901710c058c1ae1271c782a0d4587f4f&language=fr-FR`)
        .then((response) => {
          // console.log(response);
          store.dispatch(saveDataMedia(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    /* Mauvais utilisation de useSelector... On n'utilise pas de hook react dans un middleware car
       on separe le middleware du store... le middleware envoie au store est pas le contraire.
       Du coup cela créait l'erreur dans la console d'un invalide hook call.
       Message à David : il serait mieux d'utiliser dans ce cas les props dans le composant
       Pour les recuperer ici. avec un props.data
    case FETCH_EPISODES_DATA: {
      console.log('FETCH_EPISODES_DATA déclenché');
      const allSeasons = [];
      const dataMedia = useSelector((state) => state.search.data_media);
      for (let i = 0; i < dataMedia.seasons.length; i += 1) {
        // each request are add to promise list
        // ajout de chaque requete à la liste de promesses
        allSeasons.push(axios.get(`https://api.themoviedb.org/3/tv/${action.id}/season/${i}?api_key=901710c058c1ae1271c782a0d4587f4f&language=fr-FR`));
      }

      Promise.all(allSeasons)
        .then((responses) => {
          let episodeData = [];
          console.log(responses);
          // loop reponses for each request
          responses.forEach((response) => {
            episodeData = episodeData.concat(response.data);
          });
          console.log(episodeData);
          store.dispatch(saveEpisodesData(episodeData));
        })
        .catch((error) => {
          console.log(error);
        });
    }
      break; */
    case FETCH_FAVORITE_STATUS_SERIE:
      console.log('FETCH_FAVORITE_STATUS_SERIE has been activated');
      axios.post(
        FAVORITE_URL,
        {
          user: 16,
          series: action.id,
          favorites: action.isFavorite,
        },
      )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    case FETCH_FAVORITE_STATUS_MOVIE:
      console.log('FETCH_FAVORITE_STATUS_MOVIE has been activated');
      axios.post(
        FAVORITE_URL,
        {
          user: 16,
          movies: action.id,
          favorites: action.isFavorite,
        },
      )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    default:
  }

  next(action);
};

export default searchMiddleware;
