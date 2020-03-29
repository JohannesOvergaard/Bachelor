const INITIAL_STATE = { user: {}, loggedIn: false, settings: [] };

const currentUser = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        loggedIn: true,
        settings: {}
      };
    case "SET_SETTINGS":
      return {
        ...state,
        settings: action.payload
      };
    case "LOG_OUT":
    default:
      return state;
  }
};

export default currentUser;
