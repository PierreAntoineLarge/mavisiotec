import './app-header-nav.scss';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import visiotecMobileLogo from '../../../assets/visiotec-logo.png';
import NavCategoryList from './NavCategoryList/navCategoryList';

import MobileNavToggle from './MobileNavToggle/MobileNavToggle';
import SearchButton from './SearchButton/SearchButton';
import ProfileUserButton from './ProfileUserButton/ProfileUserButton';

function AppHeaderNav() {
  const isLoggedValue = useSelector((state) => state.subscribe.isLogged);

  return (
    <div className="nav-wrapper">
      <div className="logo-and-nav">
        <Link className="logo-link" to="/">
          <div id="styledimg"> </div>
          {/* <img className="logo-img" src={visiotecMobileLogo} alt="Logo Ma Visiotec" /> */}
        </Link>
        {isLoggedValue && (
          <NavCategoryList />
        )}
      </div>
      <div className="icons">
        {isLoggedValue && (
          <SearchButton />
        )}
        <ProfileUserButton />
        {isLoggedValue && (
          <MobileNavToggle />
        )}
      </div>
    </div>
  );
}

export default AppHeaderNav;
