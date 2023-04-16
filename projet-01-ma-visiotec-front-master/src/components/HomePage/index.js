import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isLogged, updateDecodedToken } from '../../actions/log';
import HomePageUser from './HomePageUser/homePageUser';
import HomePageVisitor from './HomePageVisitor/homePageVisitor';
import './HomePageVisitor/homepage-visitor.scss';

// eslint-disable-next-line consistent-return
const HomePage = () => {
  const hasLogged = useSelector((state) => state.subscribe.isLogged);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      dispatch(updateDecodedToken(decodedToken));
      dispatch(isLogged(decodedToken.pseudo, decodedToken.username, token, true));
    }
    window.scrollTo(0, 0);
  }, []);
  switch (hasLogged) {
    case true:
      return <HomePageUser />;
    case false:
      return <HomePageVisitor />;
    default:
  }
};

export default HomePage;
