/* eslint-disable no-nested-ternary */
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  fetchGenresTv,
  fetchGenresMovie,
  submitSearch,
  updateSearchField,
  setStateType,
  saveResults,
} from '../../actions/search';

import './searchpage.scss';
import Field from '../Field';
import Card from './Card';
import TopMovies from './TopMovies/topMovies';
import TopSeries from './TopSeries/topSeries';

// == Composant
const SearchPage = () => {
  const dispatch = useDispatch();
  // Search's Value
  const searchValue = useSelector((state) => state.search.searchValue);
  // State 'list'
  const list = useSelector((state) => state.search.list);
  const type = useSelector((state) => state.search.type);
  let typeOfMedia = 'série';
  let seriesClassButton = 'series-search-button';
  let moviesClassButton = 'movies-search-button';
  if (type === 'tv') {
    typeOfMedia = 'séries';
    seriesClassButton += ' selected';
  }
  else if (type === 'movie') {
    typeOfMedia = 'films';
    moviesClassButton += ' selected';
  }

  useEffect(() => {
    dispatch(fetchGenresTv());
    dispatch(fetchGenresMovie());
    dispatch(saveResults([]));
  }, [type]);

  return (
    <div className="container">
      <div className="search-page-wrapper flow">
        <h1>
          Recherchez des {typeOfMedia}
        </h1>
        <div className="search-list-buttons">
          <button
            className={seriesClassButton}
            type="button"
            onClick={() => dispatch(setStateType('tv'))}
          >
            Séries
          </button>
          <button
            className={moviesClassButton}
            type="button"
            onClick={() => dispatch(setStateType('movie'))}
          >
            Films
          </button>
        </div>
        <form
          className="search-form"
          onSubmit={(event) => {
            event.preventDefault();
            dispatch(submitSearch());
          }}
        >
          <div className="search-bar">
            <Field
              identifier="search"
              placeholder="Faire votre recherche"
              // label="search"
              value={searchValue}
              changeField={(identifier, newValue) => {
                const action = updateSearchField(identifier, newValue);
                dispatch(action);
              }}
            />
            <svg
              className="search-page-button-icon"
              viewBox="0 0 640 512"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" />
            </svg>
          </div>
        </form>
        <div className="media-group">
          {list.length > 0 ? (
            list.map((result) => (
              <Card key={result.id} {...result} />
            ))
          ) : type === 'movie' ? (
            <TopMovies />
          ) : <TopSeries />}
        </div>
      </div>
    </div>
  );
};

// == Export
export default SearchPage;
