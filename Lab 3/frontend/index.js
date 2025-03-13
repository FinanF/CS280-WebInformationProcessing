import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// This is the main entry point for React
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root") // This attaches the app to the 'root' div in public/index.html
);
