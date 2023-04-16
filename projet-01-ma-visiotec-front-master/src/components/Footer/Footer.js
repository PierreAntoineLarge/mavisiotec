import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isLogged, updateDecodedToken } from '../../actions/log';
import './footer.scss';
import { BACK_OFFICE_ROUTE } from '../../data/ApiUrl';

const Footer = () => {
  const decodedToken = useSelector((state) => state.subscribe.decodedToken);
  const hasAdminRole = decodedToken?.roles?.includes('ROLE_ADMIN');
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const hasdecodedToken = jwtDecode(token);
      dispatch(updateDecodedToken(hasdecodedToken));
      dispatch(isLogged(hasdecodedToken.pseudo, hasdecodedToken.username, token, true));
    }
  }, []);

  return (
    <footer className="primary-footer">
      <div className="container">
        <div className="footer-wrapper">
          <nav className="footer-nav">
            <ul className="footer-nav-list">
              <li>
                <Link className="nav-list-link" to="/cgu">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link className="nav-list-link" to="/contact">
                  Contact
                </Link>
              </li>
              {hasAdminRole && (
              <li>
                <Link className="nav-list-link" to={BACK_OFFICE_ROUTE} target="_blank" rel="noreferrer noopener">
                  Back-Office
                </Link>
              </li>
              )}
            </ul>
          </nav>
          <p>
            Team Visiotech 2023
          </p>
          <p>
            creative commons rights &copy;
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
