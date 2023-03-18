import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@ui5/webcomponents-react";
import "./index.css";
import App from './App';

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Unable to find root element");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <ThemeProvider>
    {/* <React.StrictMode> */}
    <App />
    {/* </React.StrictMode> */}
  </ThemeProvider>
);
