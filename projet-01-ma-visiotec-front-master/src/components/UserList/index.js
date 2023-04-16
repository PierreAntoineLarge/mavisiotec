/* eslint-disable max-len */
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
/* eslint-disable no-nested-ternary */
import MesFilms from './MesFilms/MesFilms';
import MesJeuxVideos from './MesJeuxVideos/MesJeuxVideos';
import MesSeries from './MesSeries/MesSeries';
import MesLivres from './MesLivres/MesLivres';
import './userlist.scss';
import { getMovieFromList, getSerieFromList } from '../../actions/userList';

const MesListes = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovieFromList());
    dispatch(getSerieFromList());
    window.scrollTo(0, 0);
  }, []);
  const { selected } = useParams();
  const getComponent = () => {
    switch (selected) {
      case 'films':
        return <MesFilms />;
      case 'series':
        return <MesSeries />;
      case 'jeux':
        return <MesJeuxVideos />;
      case 'livres':
        return <MesLivres />;
      default:
        return null;
    }
  };

  return (
    <div className="container">
      {getComponent()}
    </div>
  );
};
export default MesListes;
