import { default as userState } from "./userReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  userState
});

export default rootReducer;
