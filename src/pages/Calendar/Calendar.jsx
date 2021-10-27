import { useQuery } from "@apollo/client";
import React, { useContext } from "react";

import UserInfoContext from "../../context/UserInfoContext";
import { LOGIN } from "../../queries/UserQuery";

//TODO: add helmet for all pages
export const Calendar = () => {
  const { data } = useQuery(LOGIN);
  const { getUserInfo } = useContext(UserInfoContext);

  console.log(data, getUserInfo);

  return <>CALENDAR</>;
};
