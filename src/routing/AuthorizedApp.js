import React from "react";
import { Route, Switch } from "react-router";

import BundleItem from "../components/bundles/bundle/bundle-item";
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
        <Route path={ROUTES.CALENDAR} component={Calendar} />
        <Route exact path={ROUTES.BUNDLE} component={Bundle} />
        <Route path={ROUTES.BUNDLE_ITEM} component={BundleItem} />
        <Route path={ROUTES.SETTINGS} component={Settings} />
        <Route exact path={ROUTES.NOT_FOUND} component={PageNotFound} />
      </Switch>
    </AuthorizedLayout>
  );
};
