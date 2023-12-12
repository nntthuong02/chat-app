import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "@mantine/core/styles.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/Authcontext.jsx";
import { GroupContextProvider } from "./context/GroupContext.jsx";
import { MantineProvider, createTheme } from "@mantine/core";
import "bootstrap/dist/css/bootstrap.min.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <MantineProvider>
          <App />
        </MantineProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
