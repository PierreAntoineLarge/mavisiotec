/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { postMovieToList } from '../../../../actions/search';
import { deleteMovieFromList } from '../../../../actions/userList';

const MovieListItem = ({ item, idUser, dispatch }) => {
  const [selectedStatus, setSelectedStatus] = useState(item.status);
  const [selectedFavoris, setSelectedFavoris] = useState(item.favoriteStatus);
  const [showItem, setShowItem] = useState(true);

  function handleSubmit(submit) {
    submit.preventDefault();
    dispatch(postMovieToList(
      idUser,
      item.idfilm,
      item.title,
      item.picture,
      selectedFavoris,
      selectedStatus,
      item.synopsis,
    ));
  }

  function handleDelete(id) {
    dispatch(deleteMovieFromList(idUser, id));
    setShowItem(false);
  }

  return (
    showItem && (
    <li key={item.idfilm} className="myList--item">
      <Link to={`/resume/movie/${item.synopsis}`}>
        <img src={`https://image.tmdb.org/t/p/w500${item.picture}`} alt="Poster du film" />
      </Link>
      <div className="content flow">
        <div className="myList--data flow">
          <h2>{item.title}</h2>
          <time dateTime={item.date}>{item.date}</time>
        </div>
        <div className="myList--favorite">
          <i className={selectedFavoris ? 'fa-solid fa-star' : 'fa-regular fa-star'} onClick={() => setSelectedFavoris(!selectedFavoris)}> </i>
        </div>
        <div
          className="myList--delete"
          onClick={() => {
            if (!window.confirm(<div className="message">Êtes-vous sûr de vouloir supprimer ce film de votre liste?</div>)) {
              return;
            }
            handleDelete(item.idfilm);
          }}
        >
          <i className="fa-solid fa-trash"> </i>
        </div>
        <div className="myList--status">
          <button type="button" className={selectedStatus === 'A voir' ? 'statusButton selected' : 'statusButton'} onClick={() => setSelectedStatus('A voir')}>A voir</button>
          <button type="button" className={selectedStatus === 'En cours' ? 'statusButton selected' : 'statusButton'} onClick={() => setSelectedStatus('En cours')}>En cours</button>
          <button type="button" className={selectedStatus === 'Fini' ? 'statusButton selected' : 'statusButton'} onClick={() => setSelectedStatus('Fini')}>Fini</button>
        </div>
        <form
          action="submit"
          onSubmit={(submit) => handleSubmit(submit)}
        >
          <div className="myList--validation-movie">
            <i className="fa-regular fa-circle-check" onClick={(submit) => handleSubmit(submit)}> </i>
          </div>
        </form>
      </div>
    </li>
    )
  );
};

export default MovieListItem;
