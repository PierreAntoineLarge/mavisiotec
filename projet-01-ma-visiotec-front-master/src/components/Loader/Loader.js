/* eslint-disable import/no-extraneous-dependencies */
import './loader.scss';
import 'animate.css';
import { useNavigate } from 'react-router-dom';
import visiotecLogo from '../../assets/visiotec-logo.png';

const Loader = () => {
  const navigate = useNavigate();

  const handleCloseLoader = () => {
    navigate('/');
  };

  return (
    <div className="loader-overlay">
      <div>
        <button type="button" className="close-button" onClick={handleCloseLoader}>
          <span className="cross">&times;</span>
        </button>
      </div>
      <div className="loader animate__animated animate__rotateIn animate__flip animate__infinite ">
        <img src={visiotecLogo} alt="Logo Ma Visiotec" />
      </div>
    </div>
  );
};

export default Loader;
