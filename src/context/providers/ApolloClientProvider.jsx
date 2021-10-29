import { ApolloProvider } from "@apollo/client";
import React, { useContext, useEffect, useMemo } from "react";
import { useLocation } from "react-router";

import { LOGIN } from "../../queries/UserQuery";
import { getNewClient } from "../../utils/getApolloClient";
import UserInfoContext from "../UserInfoContext";

export const ApolloClientProvider = ({ children }) => {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const location = useLocation();
  const client = useMemo(
    () => getNewClient(userInfo?.oauthId || ""),
    [userInfo?.oauthId]
  );

  useEffect(() => {
    client
      .query({
        query: LOGIN,
      })
      .then((result) => {
        if (result.data.getProfile.oauthId === userInfo?.oauthId) {
          setUserInfo(result.data.getProfile);
          console.log(result)
        }
      });
  }, [client, setUserInfo, userInfo, location]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};