const setUser = (userObj) => {
  return {
    type: "SET_USER",
    payload: userObj,
  };
};

const setSettings = (settingsObj) => {
  return {
    type: "SET_SETTINGS",
    payload: settingsObj,
  };
};

const setCheckmarks = (checkmarksObj) => {
  return {
    type: "SET_CHECKMARKS",
    payload: checkmarksObj,
  };
};

const logOut = () => {
  return {
    type: "LOG_OUT",
  };
};

export default {
  setUser,
  setSettings,
  setCheckmarks,
  logOut,
};
