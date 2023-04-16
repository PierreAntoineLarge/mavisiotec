// eslint-disable-next-line import/no-extraneous-dependencies
import { Modal } from 'react-responsive-modal';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-responsive-modal/styles.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  submitLoggin,
  updateSettingsField,
  resetPassword,
} from '../../actions/log';
import Field from '../Field';
import './logginform.scss';

const LogginForm = () => {
  const emailValue = useSelector((state) => state.subscribe.email);
  const passwordValue = useSelector((state) => state.subscribe.password);
  const popUpMessageValue = useSelector((state) => state.subscribe.popUpMessage);
  const isLogged = useSelector((state) => state.subscribe.isLogged);
  const [isClicked, setIsClicked] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isClicked && isLogged) {
      navigate('/');
    }
  }, [isClicked, isLogged, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsClicked(true);
    dispatch(submitLoggin());
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleResetPassword = (event) => {
    event.preventDefault();
    dispatch(resetPassword());
    handleCloseModal();
  };

  // TODO Remplacer <Link to="/"> par une image mais laisser le lien
  return (
    <div className="container">
      <div className="log-in-wrapper flow">
        <h1>Se connecter</h1>
        <form className="log-in-form" onSubmit={handleSubmit}>
          <Field
            identifier="email"
            placeholder="Votre e-mail"
            // label="E-mail"
            value={emailValue}
            changeField={(identifier, newValue) => {
              const action = updateSettingsField(identifier, newValue);
              dispatch(action);
            }}
          />
          <div className="first-password-form">
            <Field
              identifier="password"
              placeholder="Mot de passe"
              type={isPasswordVisible ? 'text' : 'password'}
              value={passwordValue}
              changeField={(identifier, newValue) => {
                const action = updateSettingsField(identifier, newValue);
                dispatch(action);
              }}
            />
            <i
              className={`fa-solid fa-${isPasswordVisible ? 'eye-slash' : 'eye'}`}
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              style={{ cursor: 'pointer' }}
            />
          </div>
          <div className="form-buttons flow">
            <button type="submit" className="log-in-button">Valider</button>
            <button type="button" className="password-lost-button" onClick={handleOpenModal}>Mot de passe oublié ?</button>
          </div>
        </form>
        <p className="sign-up-text">pas encore inscrit ?</p>
        <Link to="/subscribe" className="sign-up-link">S'inscrire</Link>

        <Modal open={openModal} onClose={handleCloseModal}>
          <h2>Veuillez entrer votre adresse e-mail pour réinitialiser votre mot de passe.</h2>
          <form
            className="myaccount-form"
            onSubmit={handleResetPassword}
          >
            <Field
              identifier="email"
              placeholder="Votre e-mail"
              value={emailValue}
              changeField={(identifier, newValue) => {
                const action = updateSettingsField(identifier, newValue);
                dispatch(action);
              }}
            />
          </form>
          <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Fermer</button>
          <button type="submit" className="btn btn-primary" onClick={handleResetPassword}>Envoyer un lien de réinitialisation</button>
        </Modal>
        <p className="popUpMessage">{popUpMessageValue}</p>
      </div>
    </div>
  );
};

export default LogginForm;
