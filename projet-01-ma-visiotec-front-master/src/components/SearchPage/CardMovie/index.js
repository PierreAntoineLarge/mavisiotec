/* eslint-disable react/prop-types */
import './cardmovie.scss';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { postMovieToList } from '../../../actions/search';

const CardMovie = ({
  // Path of the result's poster
  // eslint-disable-next-line camelcase
  poster_path,
  name,
  id,
  title,
  externalId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const isFavorite = useSelector((state) => state.search.isFavorite);
  const userId = useSelector((state) => state.subscribe.idUser);
  const type = useSelector((state) => state.search.type);
  const dispatch = useDispatch();

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

  //

  // eslint-disable-next-line camelcase
  const image = poster_path;

  return (
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
          onClick={() => dispatch(postMovieToList(userId, externalId, title, poster_path, isFavorite, 'A voir', id))}
        >
          A voir
        </button>
        <button
          className="watching"
          type="button"
          onClick={() => dispatch(postMovieToList(userId, externalId, title, poster_path, isFavorite, 'En cours', id))}
        >
          En cours
        </button>
        <button
          className="seen-it"
          type="button"
          onClick={() => dispatch(postMovieToList(userId, externalId, title, poster_path, isFavorite, 'fini', id))}
        >
          Fini
        </button>
      </div>
      <h2 className="title">{name}{title}</h2>
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

export default CardMovie;
