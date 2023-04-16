import {
  UPDATE_ACCOUNT_FIELD,
  SUBMIT_ACCOUNT,
  DELETE_ACCOUNT,
  EMPTY_OLD_PASSWORD_FIELD,
} from '../actions/log';

const initialState = {
  // nickname's user when he's log in
  Newnickname: '',
  // contain of email field
  Newemail: '',
  // contain of password field
  Newpassword: '',
  // contain of password field to confirm first e-mail
  NewsecondPassword: '',
  // password actuel
  oldPassword: '',
  // Contain pop up message
  popUpMessage: '',
  // object contain user information send from the token
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_ACCOUNT_FIELD:
      if (action.identifier === 'email') {
        return {
          ...state,
          Newemail: action.value,
        };
      }
      if (action.identifier === 'nickname') {
        return {
          ...state,
          Newnickname: action.value,
        };
      }
      if (action.identifier === 'password') {
        return {
          ...state,
          Newpassword: action.value,
        };
      }
      if (action.identifier === 'oldPassword') {
        return {
          ...state,
          oldPassword: action.value,
        };
      }
      return {
        ...state,
        NewsecondPassword: action.value,
      };
    case SUBMIT_ACCOUNT: {
      let popUpMessage = '';

      if (state.Newemail) {
        if (!/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(state.Newemail)) {
          popUpMessage = ('L\'email n\'est pas valide. Exemple : nom@domaine.com');
        }
      }
      else if (state.Newpassword) {
        if (!state.NewsecondPassword) {
          popUpMessage = ('La confirmation du mot de passe est requise');
        }
        if (state.Newpassword !== state.NewsecondPassword) {
          popUpMessage = ('Les mots de passe doivent être identiques');
        }
        if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,15}$/.test(state.Newpassword)) {
          popUpMessage = ('Le mot de passe doit contenir au moins 1 majuscule, 1 minuscule, 1 chiffre, entre 8 et 15 caractères et un caractère spécial');
        }
      }
      // If all conditions are met, update the user
      else {
        popUpMessage = 'Les modifications ont été prise en compte';
      }
      // Return the new state which contains the success or error message and
      // the user's register status
      return {
        ...state,
        isRegisted: !popUpMessage,
        popUpMessage,
      };
    }
    case DELETE_ACCOUNT: {
      let popUpMessage = '';
      popUpMessage = 'Votre compte a été supprimé avec succès';
      return {
        ...state,
        isLogged: false,
        isRegisted: false,
        popUpMessage,
        password: '',
      };
    }
    case EMPTY_OLD_PASSWORD_FIELD:
      return {
        ...state,
        oldPassword: '',
      };
    default:
      return state;
  }
};

export default reducer;
