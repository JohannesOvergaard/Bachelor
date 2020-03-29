const INITIAL_STATE = { user: {}, loggedIn: false, settings: [] };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        loggedIn: true,
        settings: []
      };
    case "SET_SETTINGS":
      return {
        ...state,
        settings: action.payload.settings
      };
    case "LOG_OUT":
    default:
      return state;
  }
};
