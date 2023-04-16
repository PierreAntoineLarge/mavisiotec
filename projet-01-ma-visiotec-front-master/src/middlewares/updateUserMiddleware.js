import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validateFieldsDelete, validateFieldsUpdate } from '../validation/formValidation';
import { ToastSuccess, ToastError } from '../data/ToastOption';
import { UPDATE_USER_URL, DELETE_USER } from '../data/ApiUrl';
import {
  SUBMIT_ACCOUNT,
  DELETE_ACCOUNT,
  LOG_OUT,
  emptyOldPassword,
} from '../actions/log';

const updateUserMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case SUBMIT_ACCOUNT: {
      const {
        Newemail,
        Newpassword,
        NewsecondPassword,
        oldPassword,
      } = store.getState().updateUser;
      const registerErrors = validateFieldsUpdate(
        Newemail,
        Newpassword,
        NewsecondPassword,
        oldPassword,
      );
      if (registerErrors.length) {
        registerErrors.forEach((error) => {
          toast.error(error, {
            ...ToastError,
            className: 'toast-error',
          });
        });
      }
      else {
        axios.put(
          UPDATE_USER_URL,
          {
            pseudo: store.getState().updateUser.Newnickname,
            email: store.getState().updateUser.Newemail,
            password: store.getState().updateUser.Newpassword,
            oldPassword: store.getState().updateUser.oldPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${store.getState().subscribe.token}`,
            },
          },
        )
          .then((response) => {
            if ((Newemail || Newpassword) && response.status === 200) {
              store.dispatch({ type: LOG_OUT });
              toast.success('Votre compte a été mis à jour avec succès', { ...ToastSuccess, className: 'toast-success' });
            }
            else if (response.status === 200) {
              store.dispatch(emptyOldPassword());
              toast.success('Votre pseudo a été mis à jour avec succès', { ...ToastSuccess, className: 'toast-success' });
            }
            // console.log(response.data);
          })
          .catch((error) => {
            toast.error('Une erreur s\'est produite lors de la mise à jour de votre compte', { ...ToastError, className: 'toast-error' });
            console.error(error);
          });
      }
      break;
    }
    case DELETE_ACCOUNT: {
      const {
        password,
      } = store.getState().subscribe;
      const registerErrorsForm = validateFieldsDelete(password);
      if (registerErrorsForm.length) {
        registerErrorsForm.forEach((error) => {
          toast.error(error, {
            ...ToastError,
            className: 'toast-error',
          });
        });
      }
      else {
      // https://stackoverflow.com/questions/51069552/axios-delete-request-with-request-body-and-headers
        axios.delete(
          DELETE_USER,
          {
            headers: {
              Authorization: `Bearer ${store.getState().subscribe.token}`,
            },
            data: {
              password: store.getState().subscribe.password,
            },
          },
        )
          .then((response) => {
            if (response.status === 200) {
              store.dispatch({ type: LOG_OUT });
              toast.success('Votre compte a été supprimé avec succès', { ...ToastSuccess, className: 'toast-success' });
            }
          })
          .catch((error) => {
            toast.error('Une erreur s\'est produite lors de la suppression de votre compte', { ...ToastError, className: 'toast-error' });
            console.error(error);
          });
      }
      break;
    }
    default:
      next(action);
  }
};

export default updateUserMiddleware;
