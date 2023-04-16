import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitSubscribe, updateSettingsField } from '../../actions/log';
import Field from '../Field';

import './subscribeform.scss';

const SubscribeForm = () => {
  const nicknameValue = useSelector((state) => state.subscribe.nickname);
  const emailValue = useSelector((state) => state.subscribe.email);
  const passwordValue = useSelector((state) => state.subscribe.password);
  const secondPasswordValue = useSelector((state) => state.subscribe.secondPassword);
  const popUpMessageValue = useSelector((state) => state.subscribe.popUpMessage);
  const isRegisted = useSelector((state) => state.subscribe.isRegisted);
  const [isPasswordVisibleSeconde, setIsPasswordVisibleSeconde] = useState(false);
  const [isPasswordVisibleFirst, setIsPasswordVisibleFirst] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isClicked && isRegisted) {
      navigate('/connexion');
    }
  }, [isClicked, isRegisted, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsClicked(true);
    dispatch(submitSubscribe());
  };
  // TODO Remplacer <Link to="/"> par une image mais laisser le lien
  return (
    <div className="container">
      <div className="sign-up-wrapper flow">
        <h1>S'inscrire</h1>
        <form
          className="sign-up-form"
          onSubmit={handleSubmit}
        >
          <Field
            identifier="nickname"
            placeholder="Pseudo"
            // label="Pseudo"
            type="text"
            value={nicknameValue}
            changeField={(identifier, newValue) => {
              const action = updateSettingsField(identifier, newValue);
              dispatch(action);
            }}
          />
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
              // label="Mot de passe"
              type={isPasswordVisibleFirst ? 'text' : 'password'}
              value={passwordValue}
              changeField={(identifier, newValue) => {
                const action = updateSettingsField(identifier, newValue);
                dispatch(action);
              }}
            />
            <i
              className={`fa-solid fa-${isPasswordVisibleFirst ? 'eye-slash' : 'eye'}`}
              onClick={() => setIsPasswordVisibleFirst(!isPasswordVisibleFirst)}
              style={{ cursor: 'pointer' }}
            />
          </div>
          <div className="second-password-form">
            <Field
              identifier="secondPassword"
              placeholder="Confirmation du mot de passe"
              // label="Mot de passe de confirmation"
              type={isPasswordVisibleSeconde ? 'text' : 'password'}
              value={secondPasswordValue}
              changeField={(identifier, newValue) => {
                const action = updateSettingsField(identifier, newValue);
                dispatch(action);
              }}
            />
            <i
              className={`fa-solid fa-${isPasswordVisibleSeconde ? 'eye-slash' : 'eye'}`}
              onClick={() => setIsPasswordVisibleSeconde(!isPasswordVisibleSeconde)}
              style={{ cursor: 'pointer' }}
            />
          </div>
          <button type="submit" className="sign-up-button">Valider</button>
        </form>
        <p className="popUpMessage">{popUpMessageValue}</p>
      </div>
    </div>
  );
};

export default SubscribeForm;
