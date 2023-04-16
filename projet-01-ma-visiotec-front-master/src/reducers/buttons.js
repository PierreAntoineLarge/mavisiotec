import {
  TOGGLE_MOBILE_NAV_OPEN,
  MOBILE_NAV_CLOSE,
  TOGGLE_SEARCH_BUTTON_OPEN,
  SEARCH_BUTTON_CLOSE,
  TOGGLE_PROFILE_USER_BUTTON_OPEN,
  PROFILE_USER_BUTTON_CLOSE,
  TOGGLE_WATCHLIST_DROPDOWN,
  WATCHLIST_DROPDOWN_CLOSE,
} from '../actions/buttons';

export const initialState = {
  // it says if the mobile menu is open or not
  isMobileNavOpen: false,
  // it says if the mobile search menu is open or not
  isSearchButtonOpen: false,
  // it says if the profile user menu is open or not
  isProfileUserButtonOpen: false,
  // it says if the  profile menu is open or not
  isWatchlistDropdownOpen: false,
};

// eslint-disable-next-line arrow-body-style
const buttons = (state = initialState, action = {}) => {
  switch (action.type) {
    case TOGGLE_MOBILE_NAV_OPEN:
      return {
        ...state,
        isMobileNavOpen: !state.isMobileNavOpen,
      };

    case MOBILE_NAV_CLOSE:
      return {
        ...state,
        isMobileNavOpen: false,
      };

    case TOGGLE_SEARCH_BUTTON_OPEN:
      return {
        ...state,
        isSearchButtonOpen: !state.isSearchButtonOpen,
      };

    case SEARCH_BUTTON_CLOSE:
      return {
        ...state,
        isSearchButtonOpen: false,
      };

    case TOGGLE_PROFILE_USER_BUTTON_OPEN:
      return {
        ...state,
        isProfileUserButtonOpen: !state.isProfileUserButtonOpen,
      };

    case PROFILE_USER_BUTTON_CLOSE:
      return {
        ...state,
        isProfileUserButtonOpen: false,
      };

    case TOGGLE_WATCHLIST_DROPDOWN:
      return {
        ...state,
        isWatchlistDropdownOpen: !state.isWatchlistDropdownOpen,
      };

    case WATCHLIST_DROPDOWN_CLOSE:
      return {
        ...state,
        isWatchlistDropdownOpen: false,
      };

    default:
      return state;
  }
};

export default buttons;
