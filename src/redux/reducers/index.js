import { combineReducers } from "redux";
import accounts from "./accounts";
import correction from "./correction";
import intention from "./intention";
const rootReducer = combineReducers({
  accounts,
  correction,
  intention,
});

export default rootReducer;
