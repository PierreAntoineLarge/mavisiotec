import './pagenotfound.scss';
import { Link } from 'react-router-dom';

const PageNotFound = () => (
  <div className="page-not-found">
    {/* <h1><span className="animate__animated animate__backInDown animate__repeat-1">404</span><span> - Page Not Found</span></h1> */}
    <h1> <span className="hi">404</span> - Page Not Found</h1>
    <p>La page que vous recherchez n'existe pas ou a été déplacée.</p>
    <Link id="error-back-menu" to="/" className="button">Retour à l'accueil</Link>
  </div>
);

export default PageNotFound;
