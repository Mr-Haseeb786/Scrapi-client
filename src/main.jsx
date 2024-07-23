import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { UserContextProvider } from "./Context/UserContext";

import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

import { envVars } from "../env";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <Auth0Provider
        domain='dev-dsjnlrq8ats8x8jw.us.auth0.com'
        clientId={envVars.AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin,
          connection: "google-oauth2",
        }}
      >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Auth0Provider>
    </UserContextProvider>
  </React.StrictMode>
);
