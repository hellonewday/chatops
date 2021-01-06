import { createStore, applyMiddleware } from "redux";
import createSagaNiddleware from "redux-saga";
import rootSagas from "./redux/sagas/index";
import rootReducer from "./redux/reducers/index";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const middleware = createSagaNiddleware();

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(middleware));

export const persistor = persistStore(store);

middleware.run(rootSagas);
