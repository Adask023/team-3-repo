import { Auth0Provider as AuthProvider } from "@auth0/auth0-react";
import React from "react";

import { ROUTES } from "../../constans/routes";

export const Auth0Provider = ({ children }) => {
  return (
    <AuthProvider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      redirectUri={window.location.origin + ROUTES.START}
    >
      {children}
    </AuthProvider>
  );
};
