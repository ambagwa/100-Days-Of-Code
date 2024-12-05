import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
//import 'bootstrap/dist/css/bootstrap.css'
//import "bootstrap/scss/bootstrap.scss";
//import './custom.scss';
import "./bootstrap.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App /> 
  </StrictMode>
);
