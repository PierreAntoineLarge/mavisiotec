/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';
import {
  fetchEpisodesData,
  // fetchGenresMovie,
  // fetchGenresTv,
  fetchMedia,
  findExternalIdSerie,
  setIdMedia,
  // setStateLoader,
  setStateType,
} from '../../actions/search';
import Loader from '../Loader/Loader';
import ResumeSerie from './ResumeSerie';
import ResumeMovie from './ResumeMovie';
import './resumepage.scss';

// eslint-disable-next-line consistent-return,
const ResumePage = ({
  statusSerie,
  isfavoriteSerie,
  statusMovie,
  isfavoriteMovie,
}) => {
  const dispatch = useDispatch();
  // id come from the URL
  const { type, id } = useParams();
  // get the id and put in the State.
  const isLoaded = useSelector((state) => state.search.isLoaded);
  // const [currentType, setCurrentType] = useState(type);
  // const [currentId, setCurrentId] = useState(id);
  // Useless for now
  /* useEffect(() => {
    dispatch(fetchGenresTv());
    dispatch(fetchGenresMovie());
  }, []);
  */

  useEffect(() => {
    dispatch(setStateType(type));
    dispatch(setIdMedia(id));
    dispatch(findExternalIdSerie(id));
    // if (!isLoaded) {
    dispatch(fetchMedia(type, id));
    const fetchEpisodes = () => dispatch(fetchEpisodesData(id));
    setTimeout(fetchEpisodes, 1000);
    window.scrollTo(0, 0);
    // }
  }, []);

  if (!isLoaded) {
    return <Loader />;
  }

  switch (type) {
    case 'tv':
      return <ResumeSerie statusSerie={statusSerie} isfavoriteSerie={isfavoriteSerie} />;
    case 'movie':
      return <ResumeMovie statusMovie={statusMovie} isfavoriteMovie={isfavoriteMovie} />;
    default:
      return null;
  }
};

export default ResumePage;
