import { createContext } from "react";

export const UserInfoContext = createContext({
  userInfo: null,
  setUserInfo: () => {},
});

export default UserInfoContext;
