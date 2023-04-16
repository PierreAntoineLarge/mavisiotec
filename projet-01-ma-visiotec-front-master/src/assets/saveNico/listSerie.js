// import { useSelector, useDispatch } from 'react-redux';
// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { deleteSerieFromList } from '../../../actions/userList';
// import { postSerieToList } from '../../../actions/search';
// import './meseries.scss';

// const MesSeries = () => {
//   const dispatch = useDispatch();
//   // const seriesList = useSelector((state) => state.userList.serieMyList);
//   const [selected, setSelected] = useState('All');
//   const idUser = useSelector((state) => state.subscribe.idUser);
//   const mySerie = [
//     {
//       id: 270701,
//       status: 'En cours',
//       favoriteStatus: false,
//       last_episode: 2,
//       last_season: 5,
//       picture: '/g31ZPZSjv8ySPbclyYZZU50XhZy.jpg',
//       title: 'Steven Universe',
//       date: '2022',
//       synopsis: '61175',
//       journey: {
//         1: 10,
//         2: 12,
//         3: 13,
//         4: 14,
//         5: 15,
//       },
//     },
//     {
//       id: 176941,
//       status: 'A voir',
//       favoriteStatus: true,
//       last_episode: 4,
//       last_season: 4,
//       picture: '/iyfSdeZeAqj2farduoh5bvnZC5k.jpg',
//       title: 'Sherlock',
//       date: '2020',
//       synopsis: '19885',
//       journey: {
//         1: 10,
//         2: 12,
//         3: 13,
//         4: 14,
//         5: 15,
//       },
//     },
//     {
//       id: 319531,
//       status: 'En cours',
//       favoriteStatus: false,
//       last_episode: 3,
//       last_season: 2,
//       picture: '/8ZGT8RdjNOczejJMfqFw97BdPOR.jpg',
//       title: 'Lastman',
//       date: '2021',
//       synopsis: '68888',
//       journey: {
//         1: 10,
//         2: 12,
//         3: 13,
//         4: 14,
//         5: 15,
//       },
//     },
//     {
//       id: 76156,
//       status: 'Fini',
//       favoriteStatus: false,
//       last_episode: 8,
//       last_season: 9,
//       picture: '/u1z05trCA7AuSuDhi365grwdos1.jpg',
//       title: 'Scrubs',
//       date: '2011',
//       synopsis: '4556',
//       journey: {
//         1: 10,
//         2: 12,
//         3: 13,
//         4: 14,
//         5: 15,
//         6: 20,
//       },
//     },
//   ];

//   const handleFilter = (status) => {
//     setSelected(status);
//   };

//   const handleDelete = (serieId) => {
//     // TODO Message ne s'affiche pas. Peut être supprimer les balises ?
//     if (!window.confirm(<div className="message">Êtes-vous sûr de vouloir supprimer cette série de votre liste?</div>)) {
//       return;
//     }
//     dispatch(deleteSerieFromList(idUser, serieId));
//   };

//   const handleUpdate = () => {
//     dispatch(postSerieToList());
//   };

//   return (
//     <>
//       <div className="mySeries--container">
//         <h1>Mes séries</h1>
//         <div>
//           <ul className="status--container">
//             <li className="status--item">
//               <button type="button" onClick={() => handleFilter('All')}>All</button>
//             </li>
//             <li className="status--item">
//               <button type="button" onClick={() => handleFilter('A voir')}>A voir</button>
//             </li>
//             <li className="status--item">
//               <button type="button" onClick={() => handleFilter('En cours')}>En cours</button>
//             </li>
//             <li className="status--item">
//               <button type="button" onClick={() => handleFilter('Fini')}>Fini</button>
//             </li>
//           </ul>
//         </div>
//       </div>
//       <div>
//         {Array.isArray(mySerie) && mySerie.length > 0 ? (
//           <ul>
//             {mySerie.filter((item) => selected === 'All' || item.status === selected).map((item) => {
//               const [selectedSeason, setSelectedSeason] = useState(item.last_season);
//               const [selectedEpisode, setSelectedEpisode] = useState(item.last_episode);
//               const [selectedStatus, setSelectedStatus] = useState(item.status);
//               const [selectedFavoris, setSelectedFavoris] = useState(item.isFavorite);
//               // eslint-disable-next-line no-unused-vars
//               const [initialValues, setInitialValues] = useState({
//                 last_season: item.last_season,
//                 last_episode: item.last_episode,
//               });

//               const handleReload = () => {
//                 setSelectedSeason(initialValues.last_season);
//                 setSelectedEpisode(initialValues.last_episode);
//               };

//               const handleSeasonChange = (e) => {
//                 setSelectedSeason(e.target.value);
//               };

//               const handleEpisodeChange = (e) => {
//                 setSelectedEpisode(e.target.value);
//               };

//               const handleStatusChange = (e) => {
//                 setSelectedStatus(e.target.value);
//               };

//               const handleFavorisChange = (e) => {
//                 setSelectedFavoris(e.target.checked);
//               };

//               const handleSubmit = (e) => {
//                 e.preventDefault();
//                 handleUpdate({
//                   ...item,
//                   last_season: selectedSeason,
//                   last_episode: selectedEpisode,
//                   status: selectedStatus,
//                   favoriteStatus: selectedFavoris,
//                 });
//               };
//               return (
//                 <li key={item.id} className="myList--item">
//                   <Link to={`/resume/tv/${item.synopsis}`}>
//                     <img src={`https://image.tmdb.org/t/p/w500${item.picture}`} alt="Poster de la série" />
//                   </Link>
//                   <div className="myList--data">
//                     <h3>{item.title}</h3>
//                     <time dateTime={item.date}>{item.date}</time>
//                   </div>
//                   <form
//                     action="submit"
//                     onSubmit={(submit) => handleSubmit(submit)}
//                   >
//                     <div className="myList--status">
//                       <button type="button" className={selectedStatus === 'A voir' ? 'statusButton selected' : 'statusButton'} onClick={() => handleStatusChange('A voir')}>A voir</button>
//                       <button type="button" className={selectedStatus === 'En cours' ? 'statusButton selected' : 'statusButton'} onClick={() => handleStatusChange('En cours')}>En cours</button>
//                       <button type="button" className={selectedStatus === 'Fini' ? 'statusButton selected' : 'statusButton'} onClick={() => handleStatusChange('Fini')}>Fini</button>
//                       <div className="myList--favorite">
//                         <i className={selectedFavoris ? 'fa-solid fa-star' : 'fa-regular fa-star'} onClick={() => handleFavorisChange(!selectedFavoris)}> </i>
//                       </div>
//                     </div>
//                     <div className="myList--range">
//                       <label
//                         className="myList--range--episode"
//                         htmlFor="episode"
//                       >
//                         Episode:
//                         {selectedEpisode}/{item.journey[selectedSeason]}
//                       </label>
//                       <input
//                         className="myList--range--episode--input"
//                         type="range"
//                         name="episode"
//                         min="1"
//                         max={item.journey[selectedSeason]}
//                         value={selectedEpisode}
//                         onChange={(event) => handleEpisodeChange(event.target.value)}
//                       />
//                       <label
//                         className="myList--range--season"
//                         htmlFor="season"
//                       >
//                         Saison:
//                         {selectedSeason}/{item.journey.length - 1}
//                       </label>
//                       <input
//                         className="myList--range--season--input"
//                         type="range"
//                         id="season"
//                         name="season"
//                         min="1"
//                         max={item.journey.length - 1}
//                         value={selectedSeason}
//                         onChange={(event) => {
//                           handleSeasonChange(event.target.value);
//                           handleEpisodeChange(1);
//                         }}
//                       />
//                     </div>
//                     <div className="myList--validation">
//                       <i className="fa-regular fa-circle-check" onClick={(submit) => handleSubmit(submit)}> </i>
//                     </div>
//                   </form>
//                   <div className="myList--reload">
//                     <i className="fa-solid fa-rotate" onClick={handleReload}> </i>
//                   </div>
//                   <div
//                     className="myList--delete"
//                     onClick={handleDelete(item.id)}
//                   >
//                     <i className="fa-solid fa-trash"> </i>
//                   </div>
//                 </li>
//               );
//             })}
//           </ul>
//         ) : (
//           <div>Aucunes séries trouvées</div>
//         )}
//       </div>
//     </>
//   );
// };

// export default MesSeries;
