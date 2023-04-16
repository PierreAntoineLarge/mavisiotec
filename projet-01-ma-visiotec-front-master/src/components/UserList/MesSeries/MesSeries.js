import { useSelector } from 'react-redux';
import { useState } from 'react';
import All from './AllList/allList';
import ToWatch from './ToWatchList/towatchList';
import Finished from './finishedList/finishedList';
import InProgress from './InProgessList/inProgressList';
import './meseries.scss';

const MesSeries = () => {
  const seriesList = useSelector((state) => state.userList.serieMyList);
  // console.log(seriesList);
  const [selected, setSelected] = useState('All');
  const idUser = useSelector((state) => state.subscribe.idUser);

  let filteredList = [];
  if (Array.isArray(seriesList)) {
    filteredList = seriesList;
  }

  return (
    <div className="mySeries--container flow">
      <h1>Mes séries</h1>
      <div>
        <ul className="status--container">
          <li className={`status--item ${selected === 'All' ? 'selected' : ''}`}>
            <button type="button" onClick={() => setSelected('All')}>All</button>
          </li>
          <li className={`status--item ${selected === 'A voir' ? 'selected' : ''}`}>
            <button type="button" onClick={() => setSelected('A voir')}>A voir</button>
          </li>
          <li className={`status--item ${selected === 'En cours' ? 'selected' : ''}`}>
            <button type="button" onClick={() => setSelected('En cours')}>En cours</button>
          </li>
          <li className={`status--item fini-item ${selected === 'Fini' ? 'selected' : ''}`}>
            <button type="button" onClick={() => setSelected('Fini')}>Fini</button>
          </li>
          <li className={`status--item favoris-item ${selected === 'Favorite' ? 'selected' : ''}`}>
            <button type="button" onClick={() => setSelected('Favorite')}>Favoris</button>
          </li>
        </ul>
        {selected === 'All' && <All seriesList={filteredList} idUser={idUser} />}
        {selected === 'A voir' && <ToWatch seriesList={filteredList.filter((serie) => serie.status === 'A voir')} idUser={idUser} />}
        {selected === 'En cours' && <InProgress seriesList={filteredList.filter((serie) => serie.status === 'En cours')} idUser={idUser} />}
        {selected === 'Fini' && <Finished seriesList={filteredList.filter((serie) => serie.status === 'Fini')} idUser={idUser} />}
        {selected === 'Favorite' && <Finished seriesList={filteredList.filter((serie) => serie.favoriteStatus === true)} idUser={idUser} />}
      </div>
    </div>
  );
};

export default MesSeries;
