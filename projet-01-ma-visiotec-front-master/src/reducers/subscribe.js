import {
  SUBMIT_LOGGIN,
  SUBMIT_SUBSCRIBE,
  UPDATE_SETTINGS_FIELD,
  IS_LOGGED,
  IS_REGISTED,
  LOG_OUT,
  UPDATE_DECODED_TOKEN,
  RESET_PASSWORD,
  GET_USER_ID,
  SUBMIT_FORM_CONTACT,
} from '../actions/log';

const initialState = {
  idUser: '',
  // nickname's user when he's log in
  nickname: '',
  // contain of email field
  email: '',
  // contain of password field
  password: '',
  // contain of password field to confirm first password
  secondPassword: '',
  // Status about the user if he's registed
  isRegisted: false,
  // Status about the user if he's log in
  isLogged: false,
  // Contain pop up message
  popUpMessage: '',
  // token value
  token: '',
  // object contain user information send from the token
  decodedToken: {},
  // value text of form contact
  formValue: '',
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_SETTINGS_FIELD:
      if (action.identifier === 'email') {
        return {
          ...state,
          email: action.value,
        };
      }
      if (action.identifier === 'nickname') {
        return {
          ...state,
          nickname: action.value,
        };
      }
      if (action.identifier === 'form') {
        return {
          ...state,
          formValue: action.value,
        };
      }
      if (action.identifier === 'password') {
        return {
          ...state,
          password: action.value,
        };
      }
      return {
        ...state,
        secondPassword: action.value,
      };
    case SUBMIT_SUBSCRIBE: {
      let popUpMessage = '';
      // Check if the nickname field is empty
      if (!state.nickname) {
        popUpMessage = 'Le pseudo est requis';
      }
      // Check if the email field is empty
      else if (!state.email) {
        popUpMessage = 'L\'email est requis';
      }
      // Check if the email is in valid format
      else if (!/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(state.email)) {
        popUpMessage = 'L\'email n\'est pas valide. Exemple : nom@domaine.com';
      }
      // Check if the password field is empty
      else if (!state.password) {
        popUpMessage = 'Le mot de passe est requis';
      }
      // Check if the confirm password field is empty
      else if (!state.secondPassword) {
        popUpMessage = 'La confirmation du mot de passe est requise';
      }
      // Check if the passwords entered are identical
      else if (state.password !== state.secondPassword) {
        popUpMessage = 'Les mots de passe doivent être identiques';
        state.password = '';
      }
      // Check if the password contains at least 1 uppercase letter, 1 lowercase letter,
      // 1 digit, 8 characters and a special character
      else if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,15}$/.test(state.password)) {
        popUpMessage = 'Le mot de passe doit contenir au moins 1 majuscule, 1 minuscule, 1 chiffre, entre 8 et 15 caractères et un caractère spécial';
      }
      // Return the new state which contains the success or error message and
      // the user's register status
      return {
        ...state,
        isRegisted: !popUpMessage,
        popUpMessage,
      };
    }
    case IS_REGISTED:
      return {
        ...state,
        isRegisted: action.isRegisted,
      };
    case IS_LOGGED: {
      const getToken = localStorage.getItem('token');
      return {
        ...state,
        isLogged: true,
        token: getToken,
      };
    }
    case GET_USER_ID:
      return {
        ...state,
        email: action.email,
        idUser: action.id,
        nickname: action.pseudo,
      };
    case SUBMIT_LOGGIN: {
      const token = localStorage.getItem('token');
      if (token) {
        return {
          ...state,
          isLogged: true,
          isRegisted: true,
        };
      }
      return state;
    }
    case UPDATE_DECODED_TOKEN:
      return {
        ...state,
        decodedToken: action.decodedToken,
        isLogged: true,
        isRegisted: true,
        password: '',
        email: '',
      };
    case LOG_OUT:
      localStorage.removeItem('token');
      return {
        ...state,
        idUser: '',
        isLogged: false,
        token: '',
        nickname: '',
        email: '',
        password: '',
        secondPassword: '',
        decodedToken: {},
        oldPassword: '',
      };
    case RESET_PASSWORD:
      return {
        ...state,
        email: action.email,
      };
    case SUBMIT_FORM_CONTACT:
      return {
        ...state,
        formValue: '',
        pseudo: '',
        email: '',
      };
    default:
      return state;
  }
};

export default reducer;
