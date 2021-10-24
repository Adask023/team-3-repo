import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { RedirectObserver } from "../../observers/RedirectObserver";
import { AppRoutes } from "../../routing/AppRoutes";
import { AuthorizedApp } from "../../routing/AuthorizedApp";
import { ApolloClientProvider } from "./ApolloClientProvider";
import { ThemeProvider } from "./ThemeProvider";
import { UserInfoProvider } from "./UserInfoProvider";

export const AppProvider = () => {
  const BASENAME = "/";

  return (
    <ThemeProvider>
      <ApolloClientProvider>
        <UserInfoProvider>
          <Router basename={BASENAME}>
            <RedirectObserver>
              <AppRoutes />
              <AuthorizedApp />
            </RedirectObserver>
          </Router>
        </UserInfoProvider>
      </ApolloClientProvider>
    </ThemeProvider>
  );
};
