import React, { useContext } from "react";

import UserInfoContext from "../../context/UserInfoContext";
//TODO: add helmet for all pages
export const Calendar = () => {
  const { userInfo } = useContext(UserInfoContext);
  console.log(userInfo);
  return <>CALENDAR</>;
};
