import { createContext } from "react";

const UserInfoContext = createContext({
  userInfo: null,
  setUserInfo: () => {},
});

export default UserInfoContext;
