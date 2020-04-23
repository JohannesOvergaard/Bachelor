const INITIAL_STATE = {
  user: {},
  loggedIn: false,
  settings: [],
  checkmarks: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        loggedIn: true,
        settings: [],
        checkmarks: [],
      };
    case "SET_SETTINGS":
      return {
        ...state,
        settings: action.payload.settings,
      };
    case "SET_CHECKMARKS":
      return {
        ...state,
        checkmarks: action.payload.checkmarks,
      };
    case "LOG_OUT":
    default:
      return INITIAL_STATE;
  }
};
