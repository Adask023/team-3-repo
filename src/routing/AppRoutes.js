import React from "react";
import { Route, Switch } from "react-router";

import { ROUTES } from "../constans/routes";
import { Login } from "../pages/Login/Login.jsx";

export const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path={ROUTES.LOGIN} component={Login} />
    </Switch>
  );
};
