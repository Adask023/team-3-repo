import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useHistory, useLocation } from "react-router";

import { ROUTES } from "../constans/routes";

export const RedirectObserver = ({ children }) => {
  const { pathname } = useLocation();
  const { push } = useHistory();

  const findRoute = Object.keys(ROUTES).find((key) => ROUTES[key] === pathname);

  const { isAuthenticated, isLoading } = useAuth0();
  useEffect(() => {
    if (!isAuthenticated && !isLoading) push(ROUTES.LOGIN);
    if (pathname === ROUTES.LOGIN && isAuthenticated) push(ROUTES.START);
    if (pathname === ROUTES.START && isAuthenticated) push(ROUTES.CALENDAR);
    // if (!findRoute) push(ROUTES.NOT_FOUND);
  }, [pathname, push, findRoute, isAuthenticated, isLoading]);

  return children;
};
