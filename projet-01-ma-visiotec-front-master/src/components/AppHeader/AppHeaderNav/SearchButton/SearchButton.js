import './search-button.scss';
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setStateType } from '../../../../actions/search';
import { toggleSearchButtonOpen, SearchButtonClose } from '../../../../actions/buttons';

const SearchButton = () => {
  const isOpen = useSelector((state) => state.buttons.isSearchButtonOpen);
  const dispatch = useDispatch();

  let cssClass = 'search-button';
  let ariaExpanded = 'false';
  if (isOpen) {
    cssClass += ' search-button--open';
    ariaExpanded = 'true';
  }

  const buttonRef = useRef();
  useEffect(() => {
    const handler = (event) => {
      if (!buttonRef.current.contains(event.target)) {
        dispatch(SearchButtonClose());
      }
    };
    document.addEventListener('click', handler);

    return () => {
      document.removeEventListener('click', handler);
    };
  }, []);

  // const handleSearch(type) {
  //   dispatch(setStateType(type),
  //   dispatch(saveResults('')),};

  return (
    <button
      ref={buttonRef}
      className={cssClass}
      aria-controls="search-navigation"
      aria-expanded={ariaExpanded}
      type="button"
      onClick={() => {
        dispatch(toggleSearchButtonOpen());
      }}
    >
      <div className="search-icon-and-text">
        <svg
          className="search-button-icon"
          viewBox="0 0 640 512"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" />
        </svg>
        <p>
          Recherche un media
        </p>
      </div>
      <nav>
        <ul className="search-button-list">
          <li>
            <Link className="nav-list-link" to="/search" onClick={() => dispatch(setStateType('tv'))}>
              Recherche une serie
            </Link>
          </li>
          <li>
            <Link className="nav-list-link" to="/search" onClick={() => dispatch(setStateType('movie'))}>
              Recherche un film
            </Link>
          </li>
          <li>
            <Link className="nav-list-link" to="#">
              Recherche un JeuxVideo
            </Link>
          </li>
          <li>
            <Link className="nav-list-link" to="#">
              Recherche un Livre
            </Link>
          </li>
        </ul>
      </nav>
    </button>
  );
};

export default SearchButton;
