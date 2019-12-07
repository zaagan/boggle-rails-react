import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

import rootReducer from "./reducers/index";

const logger = createLogger();

export default function configureStore(initialState) {
  // CREATE A REDUX STORE HOLDING THE STATE OF YOUR APP
  return createStore(rootReducer, initialState, applyMiddleware(thunk, logger));
}
