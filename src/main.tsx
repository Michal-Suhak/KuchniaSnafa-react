import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import App from "./App";
import NavBar from "./components/NavBar/NavBar";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <NavBar />
    <App />
    <ToastContainer />
  </React.StrictMode>
);
