import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validateFields, validateFieldsContact } from '../validation/formValidation';
import { ToastSuccess, ToastError } from '../data/ToastOption';
import {
  CONTACT_FORM,
  LOGIN_URL,
  REGISTER_URL,
  RESET_PASSWORD_API,
  USER_PROFIL,
} from '../data/ApiUrl';
import {
  SUBMIT_LOGGIN,
  SUBMIT_SUBSCRIBE,
  IS_REGISTED,
  UPDATE_DECODED_TOKEN,
  isLogged,
  RESET_PASSWORD,
  PROFIL_USER,
  getUserId,
  SUBMIT_FORM_CONTACT,
} from '../actions/log';

const userMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case SUBMIT_LOGGIN:
      console.log(LOGIN_URL);
      axios.post(
        LOGIN_URL,
        {
          username: store.getState().subscribe.email,
          password: store.getState().subscribe.password,
        },
      )
        .then((response) => {
          if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            toast.success('Vous êtes connecté !', {
              ...ToastSuccess,
              className: 'toast-success',
            });
            const actionToDispatch = isLogged(
              response.data.token,
              response.data.logged,
            );
            store.dispatch(actionToDispatch);
            console.log(response.data);
            const { token } = response.data;
            const decodedToken = jwtDecode(token);
            console.log(decodedToken);
            store.dispatch({ type: UPDATE_DECODED_TOKEN, decodedToken });
            // checkTokenExpiration(store);
          }
          console.log(response);
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 401) {
              toast.error('Identifiants incorrects !', {
                ...ToastError,
                className: 'toast-error',
              });
            }
            else if (error.response.status === 500) {
              toast.error('Désolé, une erreur interne s\'est produite sur notre serveur. Nous nous excusons pour les désagréments causés et faisons tout notre possible pour résoudre le problème dans les plus brefs délais. Veuillez réessayer ultérieurement ', {
                ...ToastError,
                className: 'toast-error',
              });
            }
            else {
              toast.error('Erreur de connexion !', {
                ...ToastError,
                className: 'toast-error',
              });
            }
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
          else if (error.request) {
            toast.error('Problème de connexion, veuillez vérifier votre connexion internet et réessayer', {
              ...ToastError,
              className: 'toast-error',
            });
            console.log(error.request);
          }
          else {
            console.log('Error', error.message);
          }
          console.log(error.config);
        });
      break;
    case SUBMIT_SUBSCRIBE: {
      const {
        nickname,
        email,
        password,
        secondPassword,
      } = store.getState().subscribe;
      const registerErrors = validateFields(nickname, email, password, secondPassword);
      if (registerErrors.length) {
        registerErrors.forEach((error) => {
          toast.error(error, {
            ...ToastError,
            className: 'toast-error',
          });
        });
      }
      else {
        axios.post(
          REGISTER_URL,
          {
            username: store.getState().subscribe.nickname,
            pseudo: store.getState().subscribe.nickname,
            email: store.getState().subscribe.email,
            password: store.getState().subscribe.password,
          },
        )
          .then((response) => {
            if (response.status === 201) {
              toast.success('Inscription réussie !', { ...ToastSuccess, className: 'toast-success' });
              console.log(response);
              store.dispatch({ type: IS_REGISTED, isRegisted: true });
            }
            else {
              toast.error('Erreur lors de l\'inscription !', { ...ToastError, className: 'toast-error' });
            }
          })
          .catch((error) => {
            if (error.response.status === 400) {
              toast.error('Erreur de validation !', { ...ToastError, className: 'toast-error' });
            }
            else {
              toast.error('Erreur lors de l\'inscription !', { ...ToastError, className: 'toast-error' });
            }
            console.log(error);
          });
      }
      break;
    }
    case RESET_PASSWORD:
      axios.post(
        RESET_PASSWORD_API,
        {
          email: store.getState().subscribe.email,
        },
      )
        .then((response) => {
          if (response.status === 200) {
            toast.success('Veuillez consulter votre boite mail.', { ...ToastSuccess, className: 'toast-success' });
            console.log(response);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    case SUBMIT_FORM_CONTACT: {
      const {
        nickname,
        email,
        formValue,
      } = store.getState().subscribe;
      const registerErrorsForm = validateFieldsContact(nickname, email, formValue);
      if (registerErrorsForm.length) {
        registerErrorsForm.forEach((error) => {
          toast.error(error, {
            ...ToastError,
            className: 'toast-error',
          });
        });
      }
      else {
        axios
          .post(
            CONTACT_FORM,
            {
              pseudo: store.getState().subscribe.nickname,
              email: store.getState().subscribe.email,
              message: store.getState().subscribe.formValue,
            },
          )
          .then((response) => {
            if (response.status === 200) {
              toast.success(
                'Nous avons bien reçu votre message. Nous vous répondrons dans les plus brefs délais. Merci :)',
                { ...ToastSuccess, className: 'toast-success' },
              );
              console.log(response);
            }
          })
          .catch((error) => {
            toast.error('Un probléme est survenu, nous en sommes désolé et nous vous invitons à rééssayer plus tard.', {
              ...ToastError,
              className: 'toast-error',
            });
            console.log(error);
          });
      }
      break;
    }
    case PROFIL_USER:
      axios
        .get(
          USER_PROFIL,
          {
            headers: {
              Authorization: `Bearer ${store.getState().subscribe.token}`,
            },
          },
        )
        .then((response) => {
          const actionToDispatch = getUserId(
            response.data.email,
            response.data.id,
            response.data.pseudo,
          );
          store.dispatch(actionToDispatch);
          console.log('ca marche', response.data);
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
          else if (error.request) {
            console.log(error.request);
          }
          else {
            console.log('Error', error.message);
          }
          console.log(error.config);
        });
      break;
    default:
      next(action);
  }
};

export default userMiddleware;
