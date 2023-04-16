/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import MovieListItem from '../MovieListItem/movieListItem';
import './all_list.scss';

const All = ({ moviesList, idUser }) => {
  const dispatch = useDispatch();

  return (
    <div>
      {Array.isArray(moviesList) && moviesList.length > 0 ? (
        <ul>
          {moviesList.map((item, index) => (
            <MovieListItem
              // eslint-disable-next-line react/no-array-index-key
              key={`${index}-${Math.random()}`}
              item={item}
              idUser={idUser}
              dispatch={dispatch}
            />
          ))}
        </ul>
      ) : (
        <div>Aucun films trouvés</div>
      )}
    </div>
  );
};

export default All;
