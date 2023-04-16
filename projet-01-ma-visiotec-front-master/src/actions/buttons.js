// === action types

export const TOGGLE_MOBILE_NAV_OPEN = 'TOGGLE_MOBILE_NAV_OPEN';
export const MOBILE_NAV_CLOSE = 'MOBILE_NAV_CLOSE';
export const TOGGLE_SEARCH_BUTTON_OPEN = 'TOGGLE_SEARCH_BUTTON_OPEN';
export const SEARCH_BUTTON_CLOSE = 'SEARCH_BUTTON_CLOSE';
export const TOGGLE_PROFILE_USER_BUTTON_OPEN = 'TOGGLE_PROFILE_USER_BUTTON_OPEN';
export const PROFILE_USER_BUTTON_CLOSE = 'PROFILE_USER_BUTTON_CLOSE';
export const TOGGLE_WATCHLIST_DROPDOWN = 'TOGGLE_WATCHLIST_DROPDOWN';
export const WATCHLIST_DROPDOWN_CLOSE = 'WATCHLIST_DROPDOWN_CLOSE';

// primary navigation buttons
export const toggleMobileNavOpen = () => ({
  type: TOGGLE_MOBILE_NAV_OPEN,
});

export const mobileNavClose = () => ({
  type: MOBILE_NAV_CLOSE,
});

export const toggleSearchButtonOpen = () => ({
  type: TOGGLE_SEARCH_BUTTON_OPEN,
});

export const SearchButtonClose = () => ({
  type: SEARCH_BUTTON_CLOSE,
});

export const toggleProfileUserButtonOpen = () => ({
  type: TOGGLE_PROFILE_USER_BUTTON_OPEN,
});

export const ProfileUserButtonClose = () => ({
  type: PROFILE_USER_BUTTON_CLOSE,
});

// media cards buttons
export const toggleWatchlistDropdown = () => ({
  type: TOGGLE_WATCHLIST_DROPDOWN,
});

export const watchlistDropdownClose = () => ({
  type: WATCHLIST_DROPDOWN_CLOSE,
});
