import { createStore, applyMiddleware, compose } from "redux";
// import  from "redux-saga";
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

export const store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export const persistor = persistStore(store);

middleware.run(rootSagas);
