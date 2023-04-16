
/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import { resetIdAndType } from '../../../actions/search';
import { fetchRandomMovies, fetchRandomSeries, setStateLoaderRandom } from '../../../actions/random';
import { logOut, profilUser } from '../../../actions/log';
import PosterCard from '../../PosterCard/PosterCard';
import PosterCardSeries from '../../PosterCard/PosterCardSeries/posterCardSeries';
// import PreviousListUser from './PreviousListUser/previousListUser';
import { ToastError } from '../../../data/ToastOption';
import 'react-toastify/dist/ReactToastify.css';
// eslint-disable-next-line import/no-extraneous-dependencies
// import finger from '../../../assets/finger.png';
// import mapMarker from '../../../assets/map-marker.png';
import 'animate.css';
import './homepageuser.scss';

function HomePageUser() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [displayedSeries, setDisplayedSeries] = useState([]);
  const dispatch = useDispatch();
  const isLoaded = useSelector((state) => state.randomImdb.isLoaded);
  const nickname = useSelector((state) => state.subscribe.nickname);
  //  const selected = useSelector((state) => state.navList.selected);
  const isLogged = useSelector((state) => state.subscribe.isLogged);
  const getrandomMovies = useSelector((state) => state.randomImdb.randomMovies);
  const getrandomSeries = useSelector((state) => state.randomImdb.randomSeries);

  const checkTokenExpiration = () => {
    const token = localStorage.getItem('token');
    console.log('la verification à été effectué');
    if (token) {
      const decodedToken = jwtDecode(token);
      const expirationTime = decodedToken.exp * 1000;
      const currentTime = new Date().getTime();
      console.log(`Expiration time: ${expirationTime}`);
      console.log(`Current time: ${currentTime}`);
      if (expirationTime < currentTime) {
        // Token expiré, déconnectez l'utilisateur
        console.log('Token expiré');
        dispatch(logOut());
        localStorage.removeItem('token');
        toast.error('Votre session a expiré, veuillez vous reconnecter', {
          ...ToastError,
          className: 'toast-error',
        });
      }
      else {
        setInterval(() => {
          checkTokenExpiration();
        }, 3600001);
      }
    }
  };

  useEffect(() => {
    dispatch(resetIdAndType());
  }, [dispatch]);

  useEffect(() => {
    if (isLogged) {
      dispatch(profilUser());
      checkTokenExpiration();
    }
    else if (!isLogged) {
      navigate('/');
    }
  }, [isLogged, dispatch]);

  useEffect(() => {
    dispatch(fetchRandomMovies());
    dispatch(fetchRandomSeries());
  }, [dispatch]);

  const [isAnimated, setIsAnimated] = useState(true);
  const [pause, setPause] = useState(false);

  const handleMouseEnter = () => {
    setIsAnimated(false);
  };

  const handleMouseLeave = () => {
    setIsAnimated(true);
  };

  //  useEffect met à jour les films et series affichees
  useEffect(() => {
    // si les films et les series sont charges et que le chargement est termine
    if (getrandomMovies && isLoaded) {
      // determine les films affichés en decoupant le tableau pour garder que 4 élements à afficher
      setDisplayedMovies(getrandomMovies.slice(currentIndex, currentIndex + 6));
      // le  chargement est termine
      dispatch(setStateLoaderRandom(true));
      // on vient gerer la rotation des films au rendu du composant
      // intervalle pour faire defiler les films
      let intervalId = null;
      const startInterval = () => {
        // on represente dans l'argument la valeur precedente de l'index
        intervalId = setInterval(() => {
          setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex + 6 >= getrandomMovies.length ? 0 : prevIndex + 6;
            setDisplayedMovies(getrandomMovies.slice(newIndex, newIndex + 6));
            return newIndex;
          });
          // on execute la fonction toutes les 5 secondes
        }, 7000);
      };
      // retourne une fonction pour nettoyer l'intervalle lorsque le composant refait un rendu
      const stopInterval = () => clearInterval(intervalId);
      if (!pause) {
        startInterval();
      }
      return () => {
        stopInterval();
        intervalId = null;
      };
    }
  }, [getrandomMovies, pause]);

  // calcule un nouvel index en bouclant lorsque la fin du tableau est atteint
  // on commence avec currentIndex vaut 0 et on lui ajoute 4. On dit à gtm tu prends
  // les 4 premiers élément donc ca commence de gtm[0] à [3].
  // puis on met en place une intervalle avec d'abord preIndex qui vaut 0 à quoi on ajoute 4.
  // (si cette addition ne dépasse ou vaut 99 sinon on retourne à 0).
  // car getrandomMovies.slice(newIndex, newIndex + 4) vaut l'élement 0, +1 + 4 qui suivent
  // donc 0,1,2,3,4 mais par 5 (0, 1+4=1,2,3,4,5)
  // car le sous-tableau de slice n'inclue pas le dernier élément
  // ca je sais pas pourquoi c'est comme ca...
  // donc newIndex vaut 4 donc displayMovie vaut [4 , 7]
  // etc de sorte qu'on commence par affiché l'index 0,1,2,3. puis
  // 4 à 7 et cela toutes les 5 secondes.
  // mise à jour de currentIndex avec setCurrentIndex.

  useEffect(() => {
    if (getrandomSeries && isLoaded) {
      setDisplayedSeries(getrandomSeries.slice(currentIndex, currentIndex + 6));
      dispatch(setStateLoaderRandom(true));

      let intervalId = null;
      const startInterval = () => {
        intervalId = setInterval(() => {
          setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex + 6 >= getrandomSeries.length ? 0 : prevIndex + 6;
            setDisplayedSeries(getrandomSeries.slice(newIndex, newIndex + 6));
            return newIndex >= getrandomSeries.length ? 0 : newIndex;
          });
        }, 7000);
      };
      const stopInterval = () => clearInterval(intervalId);

      if (!pause) {
        startInterval();
      }
      return () => {
        stopInterval();
        intervalId = null;
      };
    }
  }, [getrandomSeries, isLoaded, pause]);

  return (
    <div className="container flow">
      <div className="first-content flow">
        <div className="h1-img">
          <h1>Hello {nickname}</h1>
          {/* <img className="map-marker-img" src={mapMarker} alt="icon" /> */}
        </div>
        {/* <p>
          Retrouve ici ta liste de médias
        </p> */}
        {/* <div>
          <PreviousListUser />
        </div> */}
        {/* <h2>OUPS !</h2>
        <p>Ta visiothèque est vide.</p>
        <div className="list-text-icon">
          <p>Recherche un média <br />et ajoute-le dans ta liste</p>
          <img className="finger-img" src={finger} alt="icon" />
        </div> */}
      </div>
      <div className="movies-grid flow">
        <h2>Connaissez vous ces films ?</h2>
        <ul
          className="media-group user"
          onMouseEnter={() => {
            handleMouseEnter(); setPause(true);
          }}
          onMouseLeave={() => {
            handleMouseLeave(); setPause(false);
          }}
        >
          {displayedMovies.map((movie) => (
          // this condition gets rid of the movie if it comes without picture
            <li
              key={movie.id}
              className={`${isAnimated ? 'animate__animated animate__bounceInLeft animate__infinite animate__repeat-1' : ''}`}
            >
              <PosterCard movie={movie} />
            </li>
          ))}
        </ul>
      </div>
      <div className="container flow">
        <h2>Connaissez vous ces séries ?</h2>
        <ul
          className="media-group user"
          onMouseEnter={() => {
            handleMouseEnter(); setPause(true);
          }}
          onMouseLeave={() => {
            handleMouseLeave(); setPause(false);
          }}
        >
          {displayedSeries.map((series) => (
            // this condition gets rid of the series if it comes without picture
            <li
              key={series.id}
              className={`${isAnimated ? 'animate__animated animate__bounceInRight animate__infinite animate__repeat-1' : ''}`}
            >
              <PosterCardSeries series={series} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HomePageUser;
