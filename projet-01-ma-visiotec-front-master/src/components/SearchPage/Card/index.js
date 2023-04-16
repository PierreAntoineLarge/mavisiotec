/* eslint-disable react/prop-types */
import './card.scss';
// import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { postMovieToList, postSerieToList } from '../../../actions/search';

const Card = ({
  // Path of the result's poster
  // eslint-disable-next-line camelcase
  poster_path,
  // Result's French name
  name,
  id,
  title,
  externalId,
  // Result's overview
  // overview,
  // Result's genre ids. Must be cross with genre list from the API
  // genre_ids,

}) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const type = useSelector((state) => state.search.type);
  const userId = useSelector((state) => state.subscribe.idUser);
  const isFavorite = useSelector((state) => state.search.isFavorite);
  const dispatch = useDispatch();

  // posterCard code
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

  function handleStatus(button) {
    if (button === 'A voir' && type === 'movie') {
      dispatch(postMovieToList(userId, externalId, title, poster_path, 'A voir', id));
    }
    else if (button === 'En cours' && type === 'movie') {
      dispatch(postMovieToList(userId, externalId, title, poster_path, 'En cours', id));
    }
    else if (button === 'Fini' && type === 'movie') {
      dispatch(postMovieToList(userId, externalId, title, poster_path, 'Fini', id));
    }
    else if (button === 'A voir' && type === 'tv') {
      dispatch(postSerieToList(userId, externalId, name, poster_path, isFavorite, 'A voir', id));
    }
    else if (button === 'En cours' && type === 'tv') {
      dispatch(postSerieToList(userId, externalId, name, poster_path, 'En cours', id));
    }
    else if (button === 'Fini' && type === 'tv') {
      dispatch(postSerieToList(userId, externalId, name, poster_path, 'Fini', id));
    }
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
          onClick={() => handleStatus('A voir')}
        >
          A voir
        </button>
        <button
          className="watching"
          type="button"
          onClick={() => handleStatus('En cours')}
        >
          En cours
        </button>
        <button
          className="seen-it"
          type="button"
          onClick={() => handleStatus('Fini')}
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

export default Card;
