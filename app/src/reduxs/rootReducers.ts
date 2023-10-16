import { combineReducers } from "@reduxjs/toolkit";
import accountReducer from "./accounts/account.slice";

const rootReducer = combineReducers({
  account: accountReducer,
});

export default rootReducer