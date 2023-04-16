/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import SerieListItem from '../SerieListItem/serieListItem';
import './towatchlist.scss';

const ToWatch = ({ seriesList, idUser }) => {
  const dispatch = useDispatch();
  // console.log(seriesList);
  // console.log(idUser);

  return (
    <div>
      {Array.isArray(seriesList) && seriesList.length > 0 ? (
        <ul>
          {seriesList.map((item, index) => (
            <SerieListItem
              // eslint-disable-next-line react/no-array-index-key
              key={`${index}-${Math.random()}`}
              item={item}
              idUser={idUser}
              dispatch={dispatch}
            />
          ))}
        </ul>
      ) : (
        <div>Aucunes séries trouvées</div>
      )}
    </div>
  );
};

export default ToWatch;
