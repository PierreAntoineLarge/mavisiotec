import axios from 'axios';
import {
  FETCH_RANDOM_MOVIES,
  FETCH_RANDOM_SERIES,
  saveRandomMovies,
  saveRandomSerie,
  saveTopRatedMovies,
  FETCH_TOP_RATED_MOVIES,
  saveTopRatedSeries,
  FETCH_TOP_RATED_SERIES,
} from '../actions/random';

const getRandomImdb = (store) => (next) => (action) => {
  const seenMovieIds = {};
  switch (action.type) {
    case FETCH_RANDOM_MOVIES: {
      // boucle pour faire 200 requetes à l'api
      const moviePromises = [];
      for (let i = 1; i <= 200; i += 1) {
        // ajout de chaque requete à la liste de promesses
        moviePromises.push(axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=901710c058c1ae1271c782a0d4587f4f&language=fr-FR&sort_by=vote&include_adult=false&include_video=false&page=${i}`));
      }
      // console.log(moviePromises);
      // attente de la fin de toutes les promesses
      Promise.all(moviePromises)
        .then((responses) => {
          // console.log(responses);
          // reponses est un tableau de 200 promeses avec 200 object qui contiennent chacune
          // un tableau de films data.results
          let movieData = [];
          // boucle sur toutes les responses de chaque requete
          responses.forEach((response) => {
            // on boucle sur chaque response de chaque responses pour venir vérifier chaque film
            // s'il contient bien un poster et un overview
            // puis de ce la on vérifie s'ils n'ont pas le meme id. Pour ce faire on a créé un objet
            // si le code voit pour la premiere fois cette id il le range dans l'objet seenMovieIds
            // syntaxe à retenir : objet[clé] les crochet permettent d'accéder a un élément
            // d'un objet.
            // puis il push les movies true dans la tableau moviedata.
            response.data.results.forEach((movie) => {
              if (movie.poster_path && movie.overview) {
                if (!seenMovieIds[movie.id]) {
                  // console.log(seenMovieIds);
                  seenMovieIds[movie.id] = true;
                  movieData.push(movie);
                }
              }
            });
          });
          // trie les films avec .sort de maniere aleatoire et ne garde que 100 films avec .slice
          movieData = movieData.sort(() => Math.random()).slice(0, 120);
          store.dispatch(saveRandomMovies(movieData));
        })
        .catch((error) => {
          console.log(error);
        });
    }
      break;
    case FETCH_RANDOM_SERIES: {
      const seriePromises = [];
      for (let i = 1; i <= 200; i += 1) {
        seriePromises.push(axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=901710c058c1ae1271c782a0d4587f4f&language=fr-FR&sort_by=vote&include_adult=false&include_video=false&page=${i}`));
      }
      Promise.all(seriePromises)
        .then((responses) => {
          let serieData = [];
          responses.forEach((response) => {
            serieData = serieData.concat(response.data.results
              .filter((serie) => serie.poster_path
              && serie.overview));
          });
          serieData = serieData.sort(() => Math.random()).slice(0, 120);
          store.dispatch(saveRandomSerie(serieData));
        })
        .catch((error) => {
          console.log(error);
        });
    }
      break;
    case FETCH_TOP_RATED_MOVIES: {
      const seenMovieId = {};
      const moviePromises = [];
      for (let i = 1; i <= 50; i += 1) {
        moviePromises.push(axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=901710c058c1ae1271c782a0d4587f4f&language=fr-FR&sort_by=vote_average.desc&vote_count.gte=10000&include_adult=false&include_video=false&page=${i}&page_size=50`));
      }
      Promise.all(moviePromises)
        .then((responses) => {
          let movieData = [];
          const movieDataPromises = [];
          responses.forEach((response) => {
            response.data.results.forEach((movie) => {
              if (movie.poster_path && movie.overview) {
                if (!seenMovieId[movie.id]) {
                  seenMovieId[movie.id] = true;
                  movieData.push(movie);
                }
              }
            });
          });
          const externalIds = new Set();
          movieData.forEach((movie) => {
            movieDataPromises.push(axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/external_ids?api_key=901710c058c1ae1271c782a0d4587f4f&language=fr-FR`)
              .then((response) => {
                if (!externalIds.has(response.data.imdb_id)) {
                  movie.externalId = response.data.imdb_id;
                  externalIds.add(response.data.imdb_id);
                }
              }));
            movieDataPromises.push(axios.get(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=901710c058c1ae1271c782a0d4587f4f&language=fr-FR`)
              .then((response) => {
                movie.details = response.data;
              }));
          });
          Promise.all(movieDataPromises)
            .then(() => {
              movieData = movieData.sort(() => Math.random()).slice(0, 250);
              store.dispatch(saveTopRatedMovies(movieData));
            });
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    }
    case FETCH_TOP_RATED_SERIES: {
      const seenSerieId = {};
      const seriePromises = [];
      for (let i = 1; i <= 50; i += 1) {
        seriePromises.push(axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=901710c058c1ae1271c782a0d4587f4f&language=fr-FR&sort_by=vote_average.desc&vote_count.gte=1200&include_adult=false&include_video=false&page=${i}&page_size=50`));
      }
      Promise.all(seriePromises)
        .then((responses) => {
          let serieData = [];
          const serieDataPromises = [];
          responses.forEach((response) => {
            response.data.results.forEach((serie) => {
              if (serie.poster_path && serie.overview) {
                if (!seenSerieId[serie.id]) {
                // console.log(seenserieId);
                  seenSerieId[serie.id] = true;
                  serieData.push(serie);
                }
              }
            });
          });
          const externalIds = new Set();
          serieData.forEach((serie) => {
            serieDataPromises.push(axios.get(`https://api.themoviedb.org/3/tv/${serie.id}/external_ids?api_key=901710c058c1ae1271c782a0d4587f4f&language=fr-FR`)
              .then((response) => {
                if (!externalIds.has(response.data.imdb_id)) {
                  serie.externalId = response.data.imdb_id;
                  externalIds.add(response.data.imdb_id);
                }
              }));
            serieDataPromises.push(axios.get(`https://api.themoviedb.org/3/tv/${serie.id}?api_key=901710c058c1ae1271c782a0d4587f4f&language=fr-FR`)
              .then((response) => {
                serie.details = response.data;
              }));
          });
          Promise.all(serieDataPromises)
            .then(() => {
              serieData = serieData.sort(() => Math.random()).slice(0, 250);
              store.dispatch(saveTopRatedSeries(serieData));
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
      break;
    default:
  }
  next(action);
};

export default getRandomImdb;
