/* eslint-disable react/prop-types */
import './card.scss';
// import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { postSerieToList } from '../../../actions/search';

const CardSeries = ({
  // Path of the result's poster
  // eslint-disable-next-line camelcase
  poster_path,
  // Result's French name
  name,
  id,
  title,
  externalId,
  details,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const userId = useSelector((state) => state.subscribe.idUser);
  const type = useSelector((state) => state.search.type);
  const dispatch = useDispatch();
  const isFavorite = useSelector((state) => state.search.isFavorite);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (buttonRef.current && !buttonRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  let dropdownClass = 'watchlist-dropdown flow';
  let imgClass = 'poster-img';
  let ariaExpanded = 'false';
  if (isOpen) {
    dropdownClass += ' watchlist-dropdown--open';
    imgClass += ' blur';
    ariaExpanded = 'true';
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const ExternalId = externalId;

  const lastSeasons = 1;
  // It's for the last episode user has whatched
  const lastEpisode = 1;
  // TODO à revoir
  // const journey = {};
  const arrayJourney = [];

  // eslint-disable-next-line array-callback-return
  for (let index = 0; index < details.seasons.length; index += 1) {
    arrayJourney[index] = details.seasons[index].episode_count;
  }

  // eslint-disable-next-line camelcase
  const image = poster_path;

  return (
    // this condition gets rid of the movie if it comes without picture
    // image && (
    <div className="media-element">
      <Link className="media-link" to={`/resume/${type}/${id}`}>
        <div className="poster">
          {(!image && (
            <div className="no-image">
              <p>
                Image non disponible
              </p>
            </div>
          ))}
          {(image && (
            <img
              className={imgClass}
              src={`https://image.tmdb.org/t/p/w342${image}`}
              alt={name}
            />
          ))}
        </div>
      </Link>
      <button
        ref={buttonRef}
        className="watchlist"
        type="button"
        aria-controls="watchlist-options"
        aria-expanded={ariaExpanded}
        onClick={toggleMenu}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            id="Symbols"
            fill="none"
            fillRule="evenodd"
            stroke="none"
            strokeWidth="1"
          >
            <g id="plus/Source" fill="#FFF">
              <polygon
                id="Page-1"
                points="4.367 0 4.367 4.367 0 4.367 0 7.633 4.367 7.633 4.367 12 7.634 12 7.634 7.633 12 7.633 12 4.367 7.634 4.367 7.634 0"
              />
            </g>
          </g>
        </svg>
        <span className="watchlist-text">Ajouter</span>
      </button>
      <div className={dropdownClass}>
        <button
          className="to-see"
          type="button"
          onClick={() => dispatch(postSerieToList(userId, id, name, image, isFavorite, 'A voir', lastEpisode, lastSeasons, arrayJourney, ExternalId))}
        >
          A voir
        </button>
        <button
          className="watching"
          type="button"
          onClick={() => dispatch(postSerieToList(userId, id, name, poster_path, isFavorite, 'En cours', lastEpisode, lastSeasons, arrayJourney, ExternalId))}
        >
          En cours
        </button>
        <button
          className="seen-it"
          type="button"
          onClick={() => dispatch(postSerieToList(userId, id, name, poster_path, isFavorite, 'Fini', lastEpisode, lastSeasons, arrayJourney, ExternalId))}
        >
          Fini
        </button>
      </div>
      <h2 className="title">{name}{title}</h2>
      {/* <h2 className="title">{movie.title}</h2> */}

      {/* <article className="card"> */}

      {/* 'https://image.tmdb.org/t/p/w500' is the URL to add previous the poster_path */}
      {/* The other path is 'https://image.tmdb.org/t/p/original' */}

      {/* <div className="card-content"> */}

      {/* TODO For Movies, it's 'title'. I don't find how to change it now  */}

      {/* <h2 className="card-title">{name}</h2>
      <p className="card-desc">Résumé : {overview}</p>
      <div>
        <ul> */}

      {/* the join between media's genre_ids and id's name from state (listGenreTv)  */}

      {/* </ul>
      </div> */}
      {/* TODO Faire le lien vers la fiche du média */}
      {/* <Link to={`/resume/${type}/${id}`} onClick={() => dispatch(setStateLoader(false))}
      className="card-link"><strong>Voir la fiche</strong></Link>
    </div>
  </article> */}

    </div>
  );
};

// Card.propTypes = {
//   poster_path: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   id: PropTypes.number.isRequired,
//   overview: PropTypes.string.isRequired,
//   // genre_ids: PropTypes.array.isRequired,
// };

export default CardSeries;
