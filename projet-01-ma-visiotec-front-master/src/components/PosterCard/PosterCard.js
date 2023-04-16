/* eslint-disable react/prop-types */
import './poster-card.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { addMovieFromHomepage } from '../../actions/userList';
// import { toast } from 'react-toastify';
// import { ToastSuccess } from '../../../../data/ToastOption';
function PosterCard({ movie }) {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.subscribe.isLogged);
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  // const userId = useSelector((state) => state.subscribe.idUser);

  // fonction qui ouvre le menu au clic sur ajouter
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // fonction pour fermer le menu si on clique autre part.
  // si au click on click sur ajouter ou pas on passe open à false.
  const handleClickOutside = (event) => {
    if (buttonRef.current && !buttonRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // on vient poser un ecouteur sur le click quand le composant est monté
  // qui appel handleClickOuside au click.
  // puis return permet au demontage du composant de supprimer l'ecouteur d'evenement.
  // tableau vide pour a react : tu fais cet effet qu'une seule fois au montage du composant et
  // pas à chaque mise à jour.
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  let dropdownClass = 'watchlist-dropdown flow';
  let imgClass = 'poster-img';
  let ariaExpanded = 'false';
  if (isOpen) {
    dropdownClass += ' watchlist-dropdown--open';
    imgClass += ' blur';
    ariaExpanded = 'true';
  }

  const image = movie.poster_path;

  return (
    <div className="media-element">
      <Link to={isLogged ? `/resume/movie/${movie.id}` : '/subscribe'} className="media-link">
        <div className="poster">
          {(!image && (
            <div className="no-image">
              <p>
                Image non disponible
              </p>
            </div>
          ))}
          {(image && (
          <img className={imgClass} src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} alt="poster movie" />
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
          onClick={() => dispatch(addMovieFromHomepage(movie.id, 'A voir', false))}
        >
          A voir
        </button>
        <button
          className="watching"
          type="button"
        >
          En cours
        </button>
        <button
          className="seen-it"
          type="button"
        >
          Fini
        </button>
      </div>
      <h3 className="title">
        {movie.title}
      </h3>
    </div>
  );
}

export default PosterCard;
