/* eslint-disable react/prop-types */
import '../poster-card.scss';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { ToastSuccess } from '../../../../data/ToastOption';

function PosterCardSeries({ series }) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (buttonRef.current && !buttonRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

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

  return (
    <div className="media-element">
      <Link to={`/resume/tv/${series.id}`} className="media-link">
        <div className="poster">
          <img className={imgClass} src={`https://image.tmdb.org/t/p/w342${series.poster_path}`} alt="#" />
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
        {series.name}
      </h3>
    </div>
  );
}

export default PosterCardSeries;
