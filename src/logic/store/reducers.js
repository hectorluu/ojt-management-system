import authReducer from "./auth/auth-slice";
import customizationReducer from "./customizationReducer";
const { combineReducers } = require("@reduxjs/toolkit");

export const reducer = combineReducers({
  auth: authReducer,
  customization: customizationReducer,
});
