// === action types

export const UPDATE_SETTINGS_FIELD = 'UPDATE_SETTINGS_FIELD';
export const updateSettingsField = (identifier, newValue) => ({
  type: UPDATE_SETTINGS_FIELD,
  identifier: identifier,
  value: newValue,
});

export const SUBMIT_SUBSCRIBE = 'SUBMIT_SUBSCRIBE';
export const submitSubscribe = () => ({
  type: SUBMIT_SUBSCRIBE,
});

export const SUBMIT_LOGGIN = 'SUBMIT_LOGGIN';
export const submitLoggin = () => ({
  type: SUBMIT_LOGGIN,
});

export const RESET_PASSWORD = 'RESET_PASSWORD';
export const resetPassword = (email) => ({
  type: RESET_PASSWORD,
  email: email,
});

export const IS_LOGGED = 'IS_LOGGED';
export const isLogged = (token, isLog) => ({
  type: IS_LOGGED,
  token: token,
  isLogged: isLog,
});

export const LOG_OUT = 'LOG_OUT';
export const logOut = () => ({
  type: LOG_OUT,
});

export const IS_REGISTED = 'IS_REGISTED';
export const isRegisted = () => ({
  type: IS_REGISTED,
});

export const UPDATE_DECODED_TOKEN = 'UPDATE_DECODED_TOKEN';
export const updateDecodedToken = (decodedToken) => ({
  type: UPDATE_DECODED_TOKEN,
  decodedToken: decodedToken,
});

// actions for the update account page.

export const UPDATE_ACCOUNT_FIELD = 'UPDATE_ACCOUNT_FIELD';
export const updateAccountField = (identifier, newValue) => ({
  type: UPDATE_ACCOUNT_FIELD,
  identifier: identifier,
  value: newValue,
});

export const SUBMIT_ACCOUNT = 'SUBMIT_ACCOUNT';
export const submitAccount = () => ({
  type: SUBMIT_ACCOUNT,
});

export const DELETE_ACCOUNT = 'DELETE_ACCOUNT';
export const deleteAccount = () => ({
  type: DELETE_ACCOUNT,
});

export const PROFIL_USER = 'PROFIL_USER';
export const profilUser = () => ({
  type: PROFIL_USER,
});

export const GET_USER_ID = 'GET_USER_ID';
export const getUserId = (email, id, pseudo) => ({
  type: GET_USER_ID,
  email: email,
  id: id,
  pseudo: pseudo,
});

export const SUBMIT_FORM_CONTACT = 'SUBMIT_FORM_CONTACT';
export const submitFormContact = () => ({
  type: SUBMIT_FORM_CONTACT,
});

export const EMPTY_OLD_PASSWORD_FIELD = 'EMPTY_OLD_PASSWORD_FIELD';
export const emptyOldPassword = () => ({
  type: EMPTY_OLD_PASSWORD_FIELD,
});
