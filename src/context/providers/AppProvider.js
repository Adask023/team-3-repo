import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { RedirectObserver } from "../../observers/RedirectObserver";
import { AppRoutes } from "../../routing/AppRoutes";
import { AuthorizedApp } from "../../routing/AuthorizedApp";
import { ApolloClientProvider } from "./ApolloClientProvider";
import { Auth0Provider } from "./Auth0Provider";
import { ThemeProvider } from "./ThemeProvider";
import { UserInfoProvider } from "./UserInfoProvider";

export const AppProvider = () => {
  const BASENAME = "/";

  return (
    <ThemeProvider>
      <UserInfoProvider>
        <Router basename={BASENAME}>
          <Auth0Provider>
            <ApolloClientProvider>
              <RedirectObserver>
                <AppRoutes />
                <AuthorizedApp />
              </RedirectObserver>
            </ApolloClientProvider>
          </Auth0Provider>
        </Router>
      </UserInfoProvider>
    </ThemeProvider>
  );
};
