import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import jobSclice from "./jobSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import companySlice from "./companySlice";
import applicantslice from "./applicantsSlice";
const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  auth: authSlice,
  job: jobSclice,
  company: companySlice,
  applicant: applicantslice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export default store;
