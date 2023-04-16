import {
  SET_SELECTED_FILMS,
  SET_SELECTED_SERIES,
  SET_SELECTED_JEUX,
  SET_SELECTED_LIVRES,
} from '../actions/navListCat';

const initialState = {
  selected: '',
};

const selectedReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_SELECTED_FILMS:
      return {
        ...state,
        selected: action.payload,
      };
    case SET_SELECTED_SERIES:
      return {
        ...state,
        selected: action.payload,
      };
    case SET_SELECTED_JEUX:
      return {
        ...state,
        selected: action.payload,
      };
    case SET_SELECTED_LIVRES:
      return {
        ...state,
        selected: action.payload,
      };
    default:
      return state;
  }
};

export default selectedReducer;
