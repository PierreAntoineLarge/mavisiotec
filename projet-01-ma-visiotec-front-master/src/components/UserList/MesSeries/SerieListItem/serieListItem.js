/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { postSerieToList } from '../../../../actions/search';
import { deleteSerieFromList } from '../../../../actions/userList';

const SerieListIdem = ({ item, idUser, dispatch }) => {
  const [selectedSeason, setSelectedSeason] = useState(item.last_season);
  const [selectedEpisode, setSelectedEpisode] = useState(item.last_episode);
  const [selectedStatus, setSelectedStatus] = useState(item.status);
  const [selectedFavoris, setSelectedFavoris] = useState(item.favoriteStatus);
  const [showItem, setShowItem] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [initialValues, setInitialValues] = useState({
    last_season: item.last_season,
    last_episode: item.last_episode,
  });

  const handleReload = () => {
    setSelectedSeason(initialValues.last_season);
    setSelectedEpisode(initialValues.last_episode);
  };

  function handleSubmit(submit) {
    submit.preventDefault();
    dispatch(postSerieToList(
      idUser,
      item.id,
      item.title,
      item.picture,
      selectedFavoris,
      selectedStatus,
      selectedEpisode,
      selectedSeason,
      item.journey,
      item.synopsis,
    ));
  }

  function handleDelete(id) {
    dispatch(deleteSerieFromList(idUser, id));
    // Mettre à jour l'état local pour masquer la série supprimée
    setShowItem(false);
  }

  return (
    showItem && (
    <li key={item.id} className="myList--item">
      <Link to={`/resume/tv/${item.synopsis}`}>
        <img src={`https://image.tmdb.org/t/p/w500${item.picture}`} alt="Poster de la série" />
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
            if (!window.confirm(<div className="message">Êtes-vous sûr de vouloir supprimer cette série de votre liste?</div>)) {
              return;
            }
            handleDelete(item.id);
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
          <div className="myList--range flow">
            <label
              className="myList--range--episode"
              htmlFor="episode"
            >
              Episode:
              {selectedEpisode}/{item.journey[selectedSeason]}
            </label>
            <input
              className="myList--range--episode--input"
              type="range"
              name="episode"
              min="1"
              max={item.journey[selectedSeason]}
              value={selectedEpisode}
              onChange={(event) => setSelectedEpisode(event.target.value)}
            />
            <label
              className="myList--range--season"
              htmlFor="season"
            >
              Saison:
              {selectedSeason}/{item.journey.length - 1}
            </label>
            <input
              className="myList--range--season--input"
              type="range"
              id="season"
              name="season"
              min="0"
              max={item.journey.length - 1}
              value={selectedSeason}
              onChange={(event) => {
                setSelectedSeason(event.target.value);
                setSelectedEpisode(1);
              }}
            />
          </div>
          <div className="myList--reload">
            <i className="fa-solid fa-rotate" onClick={handleReload}> </i>
          </div>
          <div className="myList--validation">
            <i className="fa-regular fa-circle-check" onClick={(submit) => handleSubmit(submit)}> </i>
          </div>
        </form>
      </div>
    </li>
    )
  );
};

export default SerieListIdem;
