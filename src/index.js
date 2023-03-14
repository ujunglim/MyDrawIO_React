import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from '@ui5/webcomponents-react';
import "./index.css";
import { Provider } from "react-redux";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ThemeProvider>
      {/* <React.StrictMode> */}
      <App />
      {/* </React.StrictMode> */}
    </ThemeProvider>
  </Provider>
);
