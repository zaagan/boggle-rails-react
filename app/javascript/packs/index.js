import React from "react";
import ReactDOM from "react-dom";

import config from "../constants/config";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import configureStore from "../store/configureStore";

const store = configureStore();

import App from "./app";

// import 'bootstrap/dist/css/bootstrap.css';
import "./index.css";

const app = (
  <Provider store={store}>
    <BrowserRouter basename={config.baseName}>
      <div>
        <App />
      </div>
    </BrowserRouter>
  </Provider>
);

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    app,
    document.body.appendChild(document.createElement("div"))
  );
});
