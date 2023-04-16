export const SERVER = 'http://alban-regolo.vpnuser.lan:8000/';
// export const SERVER = 'http://pierre-antoine-large.vpnuser.lan:8000/';
// road for log user
export const LOGIN_URL = `${SERVER}api/login_check`;
// road for subscription user
export const REGISTER_URL = `${SERVER}addUser`;
// road for get favorite of a user
export const FAVORITE_URL = `${SERVER}api/favorite`;
export const LIST_URL = `${SERVER}api/list`;
export const LIST_URL_FILM = `${SERVER}api/list/film`;
export const LIST_URL_SERIE = `${SERVER}api/list/series`;
export const GET_LIST_FILM = `${SERVER}api/list/mes_films`;
export const GET_LIST_SERIE = `${SERVER}api/list/mes_series`;
export const DELETE_MOVIE_LIST = `${SERVER}api/delete/movie/`;
export const DELETE_SERIE_LIST = `${SERVER}api/delete/serie/`;
export const UPDATE_USER_URL = `${SERVER}api/updateUser`;
export const DELETE_USER = `${SERVER}api/deleteUser`;
export const USER_PROFIL = `${SERVER}api/getUser`;
export const RESET_PASSWORD_API = `${SERVER}resetPassword`;
export const CONTACT_FORM = `${SERVER}contactForm`;

export const BACK_OFFICE_ROUTE = `${SERVER}back/users`;
export const BACK_OFFICE = `${SERVER}back/users`;
