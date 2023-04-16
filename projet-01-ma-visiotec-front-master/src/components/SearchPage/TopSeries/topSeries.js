import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchTopRatedSeries } from '../../../actions/random';
import CardSeries from '../CardSerie';

const TopSeries = () => {
  const dispatch = useDispatch();
  const getTopSeries = useSelector((state) => state.randomImdb.topSeries);

  useEffect(() => {
    dispatch(fetchTopRatedSeries());
  }, []);

  return (
    <div>
      <div>
        <h2>Top Séries</h2>
        <p>Si vous n'avez pas d'idée de série à regarder,
          voici une selection des séries les mieux notés sur IMDB.
        </p>
      </div>
      <div className="media-group">
        {getTopSeries ? getTopSeries.map((result) => (
          <CardSeries
            key={result.externalId}
            {...result}
            // saisons={result.details.saisons}
            // episode={result.details.saisons[index].episode_count}
          />
        )) : <div>Loading...</div>}
      </div>
    </div>
  );
};

export default TopSeries;
