import './homepage-visitor.scss';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-responsive-carousel/lib/styles/carousel.min.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import { useEffect, useState } from 'react';
import { fetchRandomMovies, setStateLoaderRandom } from '../../../actions/random';
import PosterCard from '../../PosterCard/PosterCard';
import presentationFonctionnalites from '../../../assets/presentationFonctionnalites.jpg';
import banniere from '../../../assets/banniere.jpg';

// == Composant
function HomePageVisitor() {
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const isLoaded = useSelector((state) => state.randomImdb.isLoaded);
  const getrandomMovies = useSelector((state) => state.randomImdb.randomMovies);
  // const getrandomSeries = useSelector((state) => state.randomImdb.randomSeries);

  useEffect(() => {
    dispatch(fetchRandomMovies());
  }, [dispatch]);

  useEffect(() => {
    if (getrandomMovies && isLoaded) {
      dispatch(setStateLoaderRandom(true));
      // console.log(getrandomMovies);
    }
  }, [getrandomMovies, isLoaded]);

  function handlePrevious() {
    setCurrentIndex((prevIndex) => (prevIndex - 12 + getrandomMovies.length)
    % getrandomMovies.length);
  }

  function handleNext() {
    // le modulo rentre le reste de preindex+14 par la longuer de getRandom Movies
    // comme ca arrivé a la fin du tableau il donnera pile le bon nombre pour pas dépasser
    // le tableau. Dans tout les cas j'ai fais en sorte qu'on est un tableau qui soit un multiple
    // de 14 soit 140 éléments.
    setCurrentIndex((prevIndex) => (prevIndex + 12) % getrandomMovies.length);
  }

  const dataj = getrandomMovies && getrandomMovies.slice(currentIndex, currentIndex + 12);

  const data = [
    {
      id: 1,
      image: banniere,
      // title: '"ghhhhhhhh"',
      // text: '"jjjjjjjjjjjjjjjjjjj"',
    },
    {
      id: 2,
      image: presentationFonctionnalites,
      // Information for overlay
      // title: 'Présentation des fonctionnalités',
      // text: '"ce que presente cette image"',
    },
  ];
  return (
    <>
      <div className="container flow">
        <h1>
          Bienvenue sur votre marque-page numérique.
        </h1>
        <div>
          <Carousel
            className="smaller"
            autoPlay
            interval={5000}
            infiniteLoop
            showIndicators={false}
            showStatus={false}
            showArrows
            // thumbWidth={60}
            showThumbs={false}
          >
            {data.map((slide) => (
              <div key={slide.id}>
                <img src={slide.image} alt="" />
                <div className="overlay">
                  <h2 className="overlay-title">
                    {slide.title}
                  </h2>
                  <p className="overlay-text">
                    {slide.text}
                  </p>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
      <div className="wrapper">
        <div className="container flow">
          <div className="cta">
            <div className="cta-content flow">
              <h2>Tous vos médias en un seul endroit</h2>
              <p>
                Trouvez vos films, séries, jeux vidéos, livres... et enregistrez-les dans vos
                listes. regroupez-les pour savoir ou vous en êtes dans votre série préférée,
                ou les films que vous voulez voir, ou bien les livres que vous avez lu.
              </p>
            </div>
            <div className="cta-buttons">
              <Link className="btn" to="/connexion">
                Connexion
              </Link>
              <Link className="btn" to="/subscribe">
                Inscription
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="controls">
        <i onClick={handlePrevious} type="button" className="control--previous sticky fa-solid fa-circle-chevron-left" />
        <i onClick={handleNext} type="button" className="control--next sticky fa-solid fa-circle-chevron-right" />
      </div>
      <div className="container flow media">
          <ul className="media-group">
            {dataj.map((movie) => (
              // this condition gets rid of the movie if it comes without picture
              <li key={movie.id}>
                <PosterCard movie={movie} />
              </li>
            ))}
          </ul>
      </div>
    </>
  );
}

// == Export
export default HomePageVisitor;
