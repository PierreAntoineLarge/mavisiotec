// == Import
import jwtDecode from 'jwt-decode';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isLogged, profilUser, updateDecodedToken } from '../../actions/log';
import AppHeader from '../AppHeader';
import HomePage from '../HomePage';
import LogginForm from '../LogginForm';
import SubscribeForm from '../SubscribeForm';
import Footer from '../Footer/Footer';
import Contact from '../Footer/Contact/Contact';
import CGU from '../Footer/CGU/CGU';
import SearchPage from '../SearchPage';
import MyAccount from '../MyAccount/MyAccount';
import PageNotFound from '../PageNotFound/PageNotFound';
import ResumePage from '../ResumePage';
import './styles.scss';
import MesListes from '../UserList';
// import Loader from '../Loader/Loader';

// == Composant
function App() {
  const serieListUser = useSelector((state) => state.userList.serieMyList);
  const movieListUser = useSelector((state) => state.userList.movieMyList);
  const id = useSelector((state) => state.search.id_media);
  const [selectedStatusSerie, setSelectedStatusSerie] = useState('');
  const [selectedFavorisSerie, setSelectedFavorisSerie] = useState('');
  const [selectedStatusMovie, setSelectedStatusMovie] = useState('');
  const [selectedFavorisMovie, setSelectedFavorisMovie] = useState('');
  // const isLoaded = useSelector((state) => state.search.isLoaded);
  const hasLogged = useSelector((state) => state.subscribe.isLogged);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      dispatch(updateDecodedToken(decodedToken));
      dispatch(isLogged(token, true));
      dispatch(profilUser());
    }
  }, []);

  let filteredList = [];
  if (Array.isArray(serieListUser)) {
    filteredList = serieListUser;
  }

  useEffect(() => {
    const selectedSerieStatus = filteredList.find((serie) => serie.synopsis === id);
    if (selectedSerieStatus) {
      setSelectedStatusSerie(selectedSerieStatus.status);
    }
    const selectedSerie = filteredList.find((serie) => serie.synopsis === id);
    if (selectedSerie) {
      setSelectedFavorisSerie(selectedSerieStatus.favoriteStatus);
    }

    return () => {
      setSelectedFavorisSerie(null);
      setSelectedStatusSerie(null);
    };
  }, [serieListUser, id]);

  let filteredListMovie = [];
  if (Array.isArray(movieListUser)) {
    filteredListMovie = movieListUser;
  }

  // useeffect pour retrouver le status d'un film ou d'une série n'importe ou dans le site.
  useEffect(() => {
    const selectedMovieStatus = filteredListMovie.find((movie) => movie.synopsis === id);
    if (selectedMovieStatus) {
      setSelectedStatusMovie(selectedMovieStatus.status);
    }
    const selectedMovie = filteredListMovie.find((movie) => movie.synopsis === id);
    if (selectedMovie) {
      setSelectedFavorisMovie(selectedMovieStatus.favoriteStatus);
    }

    return () => {
      setSelectedFavorisMovie(null);
      setSelectedStatusMovie(null);
    };
  }, [movieListUser, id]);

  return (
    <div className="app">
      <AppHeader />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {hasLogged && <Route path="/list/:selected" element={<MesListes />} />}
          <Route path="/subscribe" element={<SubscribeForm />} />
          <Route path="/connexion" element={<LogginForm />} />
          <Route path="/mon-profil" element={<MyAccount />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cgu" element={<CGU />} />
          {hasLogged && <Route path="/search" element={<SearchPage />} />}
          {hasLogged && <Route path="/resume/:type/:id" element={<ResumePage statusSerie={selectedStatusSerie} statusMovie={selectedStatusMovie} isfavoriteSerie={selectedFavorisSerie} isfavoriteMovie={selectedFavorisMovie} />} />}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer />
      { /* <Loader /> */ }
    </div>
  );
}

// == Export
export default App;
