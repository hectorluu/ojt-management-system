import authReducer from "./auth/auth-slice";
import customizationReducer from "./customizationReducer";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { reduce } from "lodash";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

export const reducer = combineReducers({
  auth: authReducer,
  customization: customizationReducer,
});

export const persistedReducer = persistReducer(persistConfig, reducer);
