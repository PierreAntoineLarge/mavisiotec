// import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchFavoriteStatusSerie, postSerieToList, clearDataMedia } from '../../../actions/search';
import './resumeserie.scss';

// eslint-disable-next-line react/prop-types
const ResumeSerie = ({ statusSerie, isfavoriteSerie }) => {
  const dispatch = useDispatch();
  // TODO Change userId from token
  const dataMedia = useSelector((state) => state.search.data_media);
  const id = useSelector((state) => state.search.id_media);
  const ExternalId = useSelector((state) => state.search.external_id_media);
  const title = dataMedia.name;
  const picture = dataMedia.poster_path;
  const userId = useSelector((state) => state.subscribe.idUser);
  console.log(dataMedia);
  // console.log(userId);
  // It's for the last season user has whatched
  const lastSeasons = 1;
  // It's for the last episode user has whatched
  const lastEpisode = 1;
  // TODO à revoir
  // const journey = {};
  const arrayJourney = [];

  // eslint-disable-next-line array-callback-return
  for (let index = 0; index < dataMedia.seasons.length; index += 1) {
    arrayJourney[index] = dataMedia.seasons[index].episode_count;
  }
  // console.log(arrayJourney);

  const dateString = dataMedia.first_air_date;
  const date = new Date(dateString);
  const yearFirstAirDate = date.getFullYear();

  const dateStringLast = dataMedia.last_air_date;
  const lastDate = new Date(dateStringLast);
  const yearLastAirDate = lastDate.getFullYear();

  // TODO A faire un tri au dessus
  const isFavorite = useSelector((state) => state.search.isFavorite);
  // let whatStatus = '';
  // if (dataMedia.in_production) {
  //   whatStatus = 'En cours de diffusion';
  // } else if (dataMedia.Canceled) {
  //   whatStatus = 'Annulé';
  // }
  // const onAir = dataMedia.in_production && 'En cours de diffusion';
  // const canceled = dataMedia.canceled && 'Annulé';

  // const dataEpisodes = useSelector((state) => state.search.data_episodes);

  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch(fetchEpisodesData(id));
  //   }, 1000);
  // }, [id]);

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      dispatch(clearDataMedia());
    };
  }, [dispatch]);

  const image = dataMedia.poster_path;

  // const backdrop = dataMedia.backdrop_path;
  const backgroundImage = 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3))';

  // TODO lastEpisode and lastSeasons is user's position in his watching
  return (
    <div className="container">
      <Link to="/search">Retour à la recherche</Link>
      <div className="media-page series flow" style={{ backgroundImage }}>
        <div className="media-grid">
          <div className="title-and-buttons flow">
            <h1>{dataMedia.name}</h1>
            <div className="list-buttons">
              <button
                className={statusSerie === 'A voir' ? 'list-button--selected' : 'list-button '}
                type="button"
                onClick={() => dispatch(postSerieToList(userId, ExternalId, title, picture, isFavorite, 'A voir', lastEpisode, lastSeasons, arrayJourney, id))}
              >
                A Voir
              </button>
              <button
                className={statusSerie === 'En cours' ? 'list-button--selected' : 'list-button '}
                type="button"
                onClick={() => dispatch(postSerieToList(userId, ExternalId, title, picture, isFavorite, 'En cours', lastEpisode, lastSeasons, arrayJourney, id))}
              >
                En cours
              </button>
              {/* TODO Has to change dataMedia.id to dataMedia.imdb_id */}
              <button
                className={statusSerie === 'Fini' ? 'list-button--selected' : 'list-button '}
                type="button"
                onClick={() => dispatch(postSerieToList(userId, ExternalId, title, picture, isFavorite, 'Fini', lastEpisode, lastSeasons, arrayJourney, id))}
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
              <img src={`https://image.tmdb.org/t/p/w500${dataMedia.poster_path}`} alt={`affiche de ${dataMedia.name}`} />
            ))}
            <div className="favorite-and-status">
              <button
                className={isfavoriteSerie === true ? 'favorite-button--selected' : 'favorite-button '}
                type="button"
                onClick={() => dispatch(fetchFavoriteStatusSerie(id, !isFavorite))}
              >
                Favori
              </button>
              <p className={`status status--${dataMedia.status}`}>{dataMedia.status}</p>
            </div>
            <div className="genre-wrapper">
              {dataMedia.genres.map((genre) => (
                // in case where we would like to apply a style to each genre
                <div key={genre.id} className={`genre--item genre--item__${genre.name}`}>
                  <p>{genre.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="sinopsis flow">
            <p>{dataMedia.overview}</p>
          </div>
          <div className="info">
            {/* <h3>Page du site :</h3>
            <p>{dataMedia.name}</p> */}
            <div className="nb-of-seasons">
              <p><strong>{dataMedia.number_of_seasons} Saisons</strong></p>
              <p><strong>{dataMedia.number_of_episodes} épisodes</strong></p>
            </div>
            <div className="date">
              {/* <h3>Date de diffusion du premier épisode :</h3> */}
              <p>({yearFirstAirDate})</p>
              {/* <h3>Date de diffusion du dernier épisode :</h3> */}
              <p>({yearLastAirDate})</p>
              {/* <p>{`Episode ${dataMedia.last_episode_to_air.episode_number}
              - Saison ${dataMedia.last_episode_to_air.season_number}
              le ${dataMedia.last_air_date}`}</p> */}
            </div>
          </div>
        </div>
        {/* List of seasons */}
        <h2>Saisons</h2>
        <div className="season-wrapper">
          {/* season 1 */}
          {dataMedia.seasons.map((season) => (
            <div key={season.id}>
              <div className="season-item flow">
                <h3>{season.name}</h3>
                {(!season.poster_path && (
                  <div className="no-image">
                    <p>
                      Image non disponible
                    </p>
                  </div>
                ))}
                {(season.poster_path && (
                <img src={`https://image.tmdb.org/t/p/w342${season.poster_path}`} alt={`Poster ${season.name}`} />
                ))}
              </div>
              {/* <ul>
                <li>Ici épisodes</li>
              </ul> */}
            </div>
          ))}
          {/* <ul>
            <li>
              episode + title + overview
            </li>
          </ul> */}
        </div>
        {/* <div className="episodeContain">
          <h2>Episodes :</h2>
        </div> */}
        {/* total of episode + during */}
        {/* calcul of how long the serie is during */}

        <h2>Fiche technique</h2>
        {/* producer actors etc... */}

        {/* <div className="creator--container">
          {dataMedia.created_by.map((creator) => (
            <div key={creator.id} className="creator--item">
              <h3>{creator.name}</h3>
              <img src={`https://image.tmdb.org/t/p/w500${creator.profile_path}`} alt={creator.name} />
            </div>
          ))}
        </div> */}
        <div className="company-wrapper">
          {dataMedia.production_companies.map((compagnie) => (
            // todo hide this div with the condition because it takes place even if is empty
            <div value={compagnie.id} key={compagnie.id}>
              <div className="company-item flow">
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

export default ResumeSerie;
