/*eslint-disable*/
import { useEffect } from "react";
import { useContext } from "react";
import { useHistory, useLocation } from "react-router";

import { ROUTES } from "../constans/routes";
import UserInfoContext from "../context/UserInfoContext";

export const RedirectObserver = ({ children }) => {
  const { userInfo } = useContext(UserInfoContext);
  const { pathname } = useLocation();
  const { push } = useHistory();

  const findRoute = Object.keys(ROUTES).find((key) => ROUTES[key] === pathname);

  useEffect(() => {
    if (!userInfo) push(ROUTES.LOGIN);
    if (pathname === ROUTES.LOGIN && userInfo) push(ROUTES.START);
    if (pathname === ROUTES.START && userInfo) push(ROUTES.CALENDAR);
    if (!findRoute) push(ROUTES.NOT_FOUND);
  }, [pathname, push, userInfo, findRoute]);

  return children;
};
