// import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

// import { Link } from 'react-router-dom';

import './moviecollection.scss';

const MovieCollection = () => {
  const dataMedia = useSelector((state) => state.search.data_media);

  return (
    <div>
      <div className="saga-grid">
        <div className="title-and-text">
          <h2>Appartient à la saga :</h2>
          <p>{dataMedia.belongs_to_collection.name}</p>
        </div>
        <img src={`https://image.tmdb.org/t/p/w500${dataMedia.belongs_to_collection.poster_path}`} alt={`affiche de ${dataMedia.belongs_to_collection.name}`} />
        <div className="date">
          <h3>Date de diffusion</h3>
          <p>{dataMedia.release_date}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCollection;
