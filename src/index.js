import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { positions, Provider as AlertProvider } from "react-alert";
import AlertMUITemplate from "react-alert-template-mui";
import App from "./App";


ReactDOM.render(
  <AlertProvider template={AlertMUITemplate}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AlertProvider>
  ,
  document.getElementById("root")
);