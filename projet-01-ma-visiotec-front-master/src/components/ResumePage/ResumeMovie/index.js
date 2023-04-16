// import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchFavoriteStatusMovie, postMovieToList, clearDataMedia } from '../../../actions/search';
import MovieCollection from './MovieCollection';
import './resumemovie.scss';

/*
  Plan de route:
  - L'imDB id est présent d'office pour les films donc envoyé la requête vanille (mettre sécurité ?)
  - L'appel à l'API doit avoir 4 éléments paramètrable :
      * "user" Userid= 16
  TODO Futur : à décrypter du token
      * "movies" imDB id
      * "favorites" false ou true
      * "status" "A voir" "En cours" "Fini"
  - Pour chaque boutton, faire l'appel en modifiant le contenu du JSON

*/
// eslint-disable-next-line react/prop-types
const ResumeMovie = ({ statusMovie, isfavoriteMovie }) => {
  const dispatch = useDispatch();
  // TODO Change userId from token
  const userId = useSelector((state) => state.subscribe.idUser);
  const dataMedia = useSelector((state) => state.search.data_media);
  const id = useSelector((state) => state.search.id_media);
  // const mediaType = useSelector((state) => state.search.type);
  // const isLoaded = useSelector((state) => state.search.isLoaded);
  const isFavorite = useSelector((state) => state.search.isFavorite);
  const image = dataMedia.poster_path;

  // useeffect to clean the state, because we cant switch between a resumeserie and
  // movie if we dont clean the state before.
  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      dispatch(clearDataMedia());
    };
  }, [dispatch]);

  const backdrop = dataMedia.backdrop_path;
  const backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(https://image.tmdb.org/t/p/original${backdrop})`;

  return (
    <div className="container">
      <Link to="/search">Retour à la recherche</Link>
      <div className="media-page flow" style={{ backgroundImage }}>
        <div className="media-grid">
          <div className="title-and-buttons flow">
            <h1>{dataMedia.title}</h1>
            <div className="list-buttons">
              <button
                className={statusMovie === 'A voir' ? 'list-button--selected' : 'list-button '}
                type="button"
                onClick={() => dispatch(postMovieToList(userId, dataMedia.imdb_id, dataMedia.title, dataMedia.poster_path, isFavorite, 'A voir', dataMedia.id))}
              >
                A Voir
              </button>
              <button
                className={statusMovie === 'En cours' ? 'list-button--selected' : 'list-button '}
                type="button"
                onClick={() => dispatch(postMovieToList(userId, dataMedia.imdb_id, dataMedia.title, dataMedia.poster_path, isFavorite, 'En cours', dataMedia.id))}
              >
                En cours
              </button>
              {/* TODO Has to change dataMedia.id to dataMedia.imdb_id */}
              <button
                className={statusMovie === 'Fini' ? 'list-button--selected' : 'list-button '}
                type="button"
                onClick={() => dispatch(postMovieToList(userId, dataMedia.imdb_id, dataMedia.title, dataMedia.poster_path, isFavorite, 'Fini', dataMedia.id))}
              >
                Fini
              </button>
            </div>
          </div>
          <div className="img-and-genre flow">
            {(!image && (
              <div className="no-image">
                <p>
                  Image non disponible
                </p>
              </div>
            ))}
            {(image && (
              <img src={`https://image.tmdb.org/t/p/w500${dataMedia.poster_path}`} alt={`affiche de ${dataMedia.title}`} />
            ))}
            <div className="favorite-and-status">
              <button
                className={isfavoriteMovie === true ? 'favorite-button--selected' : 'favorite-button '}
                type="button"
                onClick={() => dispatch(fetchFavoriteStatusMovie(id, !isFavorite))}
              >
                Favori
              </button>
              <p className={`status status--${dataMedia.status}`}>{dataMedia.status}</p>
            </div>
            <div className="genre-wrapper">
              {dataMedia.genres.map((genre) => (
                // genre--item__${genre.name} in case where we would like to apply a style
                // to each genre
                <div key={genre.id} className={`genre--item genre--item__${genre.name}`}>
                  <p>{genre.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="sinopsis flow">
            <p>{dataMedia.tagline}</p>
            <p>{dataMedia.overview}</p>
          </div>
        </div>
        {dataMedia.belongs_to_collection && (
          <div className="saga">
            <MovieCollection />
          </div>
        )}
        <h2>Fiche technique</h2>
        {/* producer actors etc... */}
        {/* <h3>Entreprises</h3> */}
        {/* <div className="company-wrapper">
          {dataMedia.production_companies.map((compagnie) => (
            <div value={compagnie.id} key={compagnie.id} className="company-item flow">
              <p>{compagnie.name}</p>
              <div className="img-bg">
                <img src={`https://image.tmdb.org/t/p/w500${compagnie.logo_path}`} alt={compagnie.name} />
              </div>
            </div>
          ))}
        </div> */}

        {/* <div className="company-wrapper">
          {dataMedia.production_companies.map((compagnie) => (
            <div value={compagnie.id} key={compagnie.id} className="company-item flow">
              <p>{compagnie.name}</p>
              <div className="img-bg">
                {compagnie.logo_path && (
                  <img src={`https://image.tmdb.org/t/p/w500${compagnie.logo_path}`} alt={compagnie.name} />
                )}
              </div>
            </div>
          ))}
        </div> */}

        <div className="company-wrapper">
          {dataMedia.production_companies.map((compagnie) => (
            <div value={compagnie.id} key={compagnie.id}>
              <div className="company-item flow">
                <p>{compagnie.name}</p>
                {!compagnie.logo_path && (
                  <div className="no-image">
                    <p>
                      Image non disponible
                    </p>
                  </div>
                )}
                {compagnie.logo_path && (
                  <img src={`https://image.tmdb.org/t/p/w342${compagnie.logo_path}`} alt={compagnie.name} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeMovie;
