/*eslint-disable*/
import React from "react";
import { Route, Switch } from "react-router";

import { ROUTES } from "../constans/routes";
import { AuthorizedLayout } from "../layouts/AuthorizedLayout/AuthorizedLayout";
import { Bundle } from "../pages/Bundle/Bundle";
import { Calendar } from "../pages/Calendar/Calendar";
import { PageNotFound } from "../pages/PageNotFound/PageNotFound";
import { Settings } from "../pages/Settings/Settings";

export const AuthorizedApp = () => {
  return (
    <AuthorizedLayout>
      <Switch>
        <Route exact path={ROUTES.START} />
        <Route path={ROUTES.CALENDAR} component={Calendar} />
        <Route path={ROUTES.BUNDLE} component={Bundle} />
        <Route path={ROUTES.SETTINGS} component={Settings} />
        <Route exact path={ROUTES.NOT_FOUND} component={PageNotFound} />
      </Switch>
    </AuthorizedLayout>
  );
};
