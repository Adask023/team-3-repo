import { ApolloProvider } from "@apollo/client";
import React, { useContext, useEffect, useMemo } from "react";

import { LOGIN } from "../../queries/UserQuery";
import { getNewClient } from "../../utils/getApolloClient";
import UserInfoContext from "../UserInfoContext";

export const ApolloClientProvider = ({ children }) => {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);

  const client = useMemo(
    () => getNewClient(userInfo ? userInfo.oauthId : ""),
    [userInfo]
  );

  useEffect(() => {
    if (!userInfo?._id) {
      client
        .query({
          query: LOGIN,
        })
        .then((result) => {
          if (result.data.getProfile.oauthId === userInfo?.oauthId) {
            setUserInfo(result.data.getProfile);
          }
        });
    }
  }, [client, setUserInfo, userInfo]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
