import { useSelector } from 'react-redux';
import { useState } from 'react';
import All from './AllList/allList';
import ToWatch from './ToWatchList/towatchList';
import Finished from './finishedList/finishedList';
import InProgress from './InProgessList/inProgressList';
import './mesfilms.scss';

const MesFilms = () => {
  const movieList = useSelector((state) => state.userList.movieMyList);
  const [selectedMovie, setSelectedMovie] = useState('All');
  const idUser = useSelector((state) => state.subscribe.idUser);

  let filteredList = [];
  if (Array.isArray(movieList)) {
    filteredList = movieList;
  }

  return (
    <div className="myFilms--container flow">
      <h1>Mes Films</h1>
      <div>
        <ul className="status--container">
          <li className={`status--item ${selectedMovie === 'All' ? 'selected' : ''}`}>
            <button type="button" onClick={() => setSelectedMovie('All')}>All</button>
          </li>
          <li className={`status--item ${selectedMovie === 'All' ? 'selected' : ''}`}>
            <button type="button" onClick={() => setSelectedMovie('A voir')}>A voir</button>
          </li>
          <li className={`status--item ${selectedMovie === 'All' ? 'selected' : ''}`}>
            <button type="button" onClick={() => setSelectedMovie('En cours')}>En cours</button>
          </li>
          <li className={`status--item fini-item ${selectedMovie === 'All' ? 'selected' : ''}`}>
            <button type="button" onClick={() => setSelectedMovie('Fini')}>Fini</button>
          </li>
          <li className={`status--item favoris-item ${selectedMovie === 'Favorite' ? 'selected' : ''}`}>
            <button type="button" onClick={() => setSelectedMovie('Favorite')}>Favoris</button>
          </li>
        </ul>
        {selectedMovie === 'All' && <All moviesList={filteredList} idUser={idUser} />}
        {selectedMovie === 'A voir' && <ToWatch moviesList={filteredList.filter((movie) => movie.status === 'A voir')} idUser={idUser} />}
        {selectedMovie === 'En cours' && <InProgress moviesList={filteredList.filter((movie) => movie.status === 'En cours')} idUser={idUser} />}
        {selectedMovie === 'Fini' && <Finished moviesList={filteredList.filter((movie) => movie.status === 'Fini')} idUser={idUser} />}
        {selectedMovie === 'Favorite' && <Finished moviesList={filteredList.filter((movie) => movie.favoriteStatus === true)} idUser={idUser} />}
      </div>
    </div>
  );
};

export default MesFilms;
