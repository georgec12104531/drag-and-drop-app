import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import rootReducer from "./root-reducer";
import logger from "redux-logger";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [logger];

let store = createStore(persistedReducer, applyMiddleware(...middlewares));
let persistor = persistStore(store);

// const store = createStore(rootReducer, applyMiddleware(...middlewares));

export { store, persistor };

// export default store;
