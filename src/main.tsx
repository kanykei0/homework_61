import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

axios.defaults.baseURL = "https://restcountries.com/v2/";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
