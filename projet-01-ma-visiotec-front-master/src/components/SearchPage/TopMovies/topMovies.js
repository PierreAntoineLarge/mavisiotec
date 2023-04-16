import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchTopRatedMovies } from '../../../actions/random';
import CardMovie from '../CardMovie';

const TopMovies = () => {
  const dispatch = useDispatch();
  const getTopMovies = useSelector((state) => state.randomImdb.topMovies);
  console.log(getTopMovies);

  useEffect(() => {
    dispatch(fetchTopRatedMovies());
  }, []);

  return (
    <div>
      <div>
        <h2>Top films</h2>
        <p>Si vous n'avez pas d'idée de film à regarder,
          voici une selection des films les mieux notés sur IMDB.
        </p>
      </div>
      <div className="media-group">
        {getTopMovies && getTopMovies.map((result) => (
          <CardMovie key={result.externalId} {...result} />
        ))}
      </div>
    </div>
  );
};

export default TopMovies;
