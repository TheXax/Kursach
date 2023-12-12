import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";

import store from "./assets/Redux/storage.js"; 

import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(// Provider - обёртка redux toolkit, чтобы приложение знало, что есть store
  <Provider store={store}>
    <App />
  </Provider>
);
