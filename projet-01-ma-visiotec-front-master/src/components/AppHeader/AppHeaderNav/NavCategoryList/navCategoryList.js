/* eslint-disable no-nested-ternary */
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  setSelectedFilms,
  setSelectedJeux,
  setSelectedLivres,
  setSelectedSeries,
} from '../../../../actions/navListCat';
import './navcategorylist.scss';

function NavCategoryList() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.buttons.isMobileNavOpen);

  let cssClassForNavList = 'nav-list';
  if (isOpen) {
    cssClassForNavList += ' menu-toggle-button--open';
  }
  // attention pour que la classe active opére il faut que les routes soient diffentes.
  // dans ce cas précis un :slug sur la route fixe 2 problémes en meme temps.
  return (
    <nav className="primary-nav">
      <ul
        className={cssClassForNavList}
        data-visible="false"
      >
        <li className="underlines" key="films">
          <NavLink
            to="/list/films"
            onClick={() => dispatch(setSelectedFilms())}
            className={({ isActive }) => (
              isActive ? 'nav-list-link active' : 'nav-list-link'
            )}
          >
            Mes Films
          </NavLink>
        </li>
        <li className="underlines" key="series">
          <NavLink
            to="/list/series"
            onClick={() => dispatch(setSelectedSeries())}
            className={({ isActive }) => (
              isActive ? 'nav-list-link active' : 'nav-list-link'
            )}
          >
            Mes Séries
          </NavLink>
        </li>
        <li className="underlines" key="jeu">
          <NavLink
            to="/list/jeux"
            onClick={() => dispatch(setSelectedJeux())}
            className={({ isActive }) => (
              isActive ? 'nav-list-link active' : 'nav-list-link'
            )}
          >
            Mes Jeux Vidéos
          </NavLink>
        </li>
        <li className="underlines" key="livres">
          <NavLink
            to="/list/livres"
            onClick={() => dispatch(setSelectedLivres())}
            className={({ isActive }) => (
              isActive ? 'nav-list-link active' : 'nav-list-link'
            )}
          >
            Mes Livres
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavCategoryList;
