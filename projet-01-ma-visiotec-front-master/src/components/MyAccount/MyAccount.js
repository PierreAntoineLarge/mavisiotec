import { useSelector, useDispatch } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-responsive-modal/styles.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Modal } from 'react-responsive-modal';
import {
  updateAccountField,
  updateSettingsField,
  submitAccount,
  deleteAccount,
} from '../../actions/log';
import Field from '../Field';

import './myaccount.scss';

const MyAccount = () => {
  const nicknameValue = useSelector((state) => state.subscribe.nickname);
  const emailValue = useSelector((state) => state.subscribe.email);
  const newnicknameValue = useSelector((state) => state.updateUser.Newnickname);
  const newemailValue = useSelector((state) => state.updateUser.Newemail);
  const newpasswordValue = useSelector((state) => state.updateUser.Newpassword);
  const newsecondPasswordValue = useSelector((state) => state.updateUser.NewsecondPassword);
  const oldPassword = useSelector((state) => state.updateUser.oldPassword);
  const passwordValue = useSelector((state) => state.subscribe.password);
  const isLogged = useSelector((state) => state.subscribe.isLogged);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isPasswordVisibleDelete, setIsPasswordVisibleDelete] = useState(false);
  const [isPasswordVisibleOld, setIsPasswordVisibleOld] = useState(false);
  const [isPasswordVisibleSeconde, setIsPasswordVisibleSeconde] = useState(false);
  const [isPasswordVisibleFirst, setIsPasswordVisibleFirst] = useState(false);
  const onOpenModal = () => setOpenModal(true);
  const onCloseModal = () => setOpenModal(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDeleteAccount = () => {
    setDeleteModalOpen(true);
    onOpenModal();
  };

  const confirmDeleteAccount = () => {
    setDeleteModalOpen(false);
    dispatch(deleteAccount());
    onCloseModal();
  };

  useEffect(() => {
    if (!isLogged) {
      navigate('/');
    }
    if (!isLogged && submitClicked) {
      navigate('/connexion');
    }
  }, [isLogged, submitClicked, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!deleteModalOpen) {
      setSubmitClicked(true);
      dispatch(submitAccount());
    }
  };

  return (
    <div className="container">
      <div className="my-account-wrapper flow">
        <h1>Mon compte</h1>
        <form
          className="my-account-form"
          onSubmit={handleSubmit}
        >
          <p className="text">Pseudo : {nicknameValue}</p>
          <Field
            identifier="nickname"
            placeholder={nicknameValue}
            // label="Pseudo"
            type="text"
            value={newnicknameValue}
            changeField={(identifier, newValue) => {
              const action = updateAccountField(identifier, newValue);
              dispatch(action);
            }}
          />
          <p className="text">Email : {emailValue}</p>
          <Field
            identifier="email"
            placeholder={emailValue}
            // label="E-mail"
            value={newemailValue}
            changeField={(identifier, newValue) => {
              const action = updateAccountField(identifier, newValue);
              dispatch(action);
            }}
          />
          <div className="first-password-form">
            <Field
              identifier="password"
              placeholder="Mot de passe"
              // label="Mot de passe"
              type={isPasswordVisibleFirst ? 'text' : 'password'}
              value={newpasswordValue}
              changeField={(identifier, newValue) => {
                const action = updateAccountField(identifier, newValue);
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
              value={newsecondPasswordValue}
              changeField={(identifier, newValue) => {
                const action = updateAccountField(identifier, newValue);
                dispatch(action);
              }}
            />
            <i
              className={`fa-solid fa-${isPasswordVisibleSeconde ? 'eye-slash' : 'eye'}`}
              onClick={() => setIsPasswordVisibleSeconde(!isPasswordVisibleSeconde)}
              style={{ cursor: 'pointer' }}
            />
          </div>
          <p className="text">Veuillez rentrer votre mot de passe actuel afin de vous identifier:</p>
          <div className="old-password-form">
            <Field
              identifier="oldPassword"
              placeholder="mot de passe actuel"
              type={isPasswordVisibleOld ? 'text' : 'password'}
              value={oldPassword}
              changeField={(identifier, newValue) => {
                const action = updateAccountField(identifier, newValue);
                dispatch(action);
              }}
            />
            <i
              className={`fa-solid fa-${isPasswordVisibleOld ? 'eye-slash' : 'eye'}`}
              onClick={() => setIsPasswordVisibleOld(!isPasswordVisibleOld)}
              style={{ cursor: 'pointer' }}
            />
          </div>
          <button className="my-account-button" type="submit">Enregistrer</button>
          <div>
            <button className="delete-account" type="button" onClick={handleDeleteAccount}>Supprimer Mon Compte</button>
            <Modal open={openModal} onClose={onCloseModal}>
              <h2>Etes vous sûr de vouloir supprimer votre compte et toutes vos données ?</h2>
              <form onSubmit={confirmDeleteAccount} className="my-account-form-modal">
                <div className="modal-password-form">
                  <Field
                    identifier="password"
                    placeholder="Mot de passe"
                    type={isPasswordVisibleDelete ? 'text' : 'password'}
                    value={passwordValue}
                    changeField={(identifier, newValue) => {
                      const action = updateSettingsField(identifier, newValue);
                      dispatch(action);
                    }}
                  />
                  <i
                    className={`fa-solid fa-${isPasswordVisibleDelete ? 'eye-slash' : 'eye'}`}
                    onClick={() => setIsPasswordVisibleDelete(!isPasswordVisibleDelete)}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
                <button type="submit">Confirmer la suppression</button>
                <button type="button" onClick={onCloseModal}>ANNULER</button>
              </form>
            </Modal>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyAccount;
