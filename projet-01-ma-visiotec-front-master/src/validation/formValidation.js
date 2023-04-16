// import jwtDecode from 'jwt-decode';
// import { toast } from 'react-toastify';
// import { isLogged } from '../actions/log';
// import { ToastError } from '../data/ToastOption';
import 'react-toastify/dist/ReactToastify.css';

/* export const checkTokenExpiration = (store) => {
  const token = localStorage.getItem('token');
  console.log('la verification à été effectué');
  if (token) {
    const decodedToken = jwtDecode(token);
    const expirationTime = decodedToken.exp;
    console.log(expirationTime);
    const currentTime = new Date().getTime();
    console.log(currentTime);
    if (expirationTime < currentTime) {
      // Token expiré, déconnectez l'utilisateur
      store.dispatch(isLogged('', '', null, false));
      localStorage.removeItem('token');
      toast.error('Votre session a expiré, veuillez vous reconnecter', {
        ...ToastError,
        className: 'toast-error',
      });
    }
    else {
      setInterval(() => {
        checkTokenExpiration();
      }, 3600);
    }
  }
}; */

export const validateFields = (nickname, email, password, secondPassword) => {
  // eslint-disable-next-line prefer-const
  let errors = [];

  if (!nickname) {
    errors.push('Le pseudo est requis');
  }
  if (!email) {
    errors.push('L\'email est requis');
  }
  else if (!/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(email)) {
    errors.push('L\'email n\'est pas valide. Exemple : nom@domaine.com');
  }
  if (!password) {
    errors.push('Le mot de passe est requis');
  }
  if (!secondPassword) {
    errors.push('La confirmation du mot de passe est requise');
  }
  if (password !== secondPassword) {
    errors.push('Les mots de passe doivent être identiques');
  }
  if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,15}$/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins 1 majuscule, 1 minuscule, 1 chiffre, entre 8 et 15 caractères et un caractère spécial');
  }
  return errors;
};

export const validateFieldsUpdate = (Newemail, Newpassword, NewsecondPassword, oldPassword) => {
  // eslint-disable-next-line prefer-const
  let errors = [];

  if (Newemail) {
    if (!/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(Newemail)) {
      errors.push('L\'email n\'est pas valide. Exemple : nom@domaine.com');
    }
  }
  if (Newpassword) {
    if (!NewsecondPassword) {
      errors.push('La confirmation du mot de passe est requise');
    }
    if (Newpassword !== NewsecondPassword) {
      errors.push('Les mots de passe doivent être identiques');
    }
    if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,15}$/.test(Newpassword)) {
      errors.push('Le mot de passe doit contenir au moins 1 majuscule, 1 minuscule, 1 chiffre, entre 8 et 15 caractères et un caractère spécial');
    }
  }
  if (!oldPassword) {
    errors.push('Le mot de passe est requis');
  }
  return errors;
};

export const validateFieldsContact = (nickname, email, formValue) => {
  // eslint-disable-next-line prefer-const
  let errors = [];

  if (!nickname) {
    errors.push('Le pseudo est requis');
  }
  if (!email) {
    errors.push('L\'email est requis');
  }
  else if (!/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(email)) {
    errors.push('L\'email n\'est pas valide. Exemple : nom@domaine.com');
  }
  if (!formValue) {
    errors.push('Vous devez utiliser le formulaire');
  }
  return errors;
};

export const validateFieldsDelete = (password) => {
  // eslint-disable-next-line prefer-const
  let errors = [];
  if (!password) {
    errors.push('Le mot de passe est requis');
  }
  return errors;
};
