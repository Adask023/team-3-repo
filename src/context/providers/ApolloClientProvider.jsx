import { ApolloProvider, gql } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import { isEqual } from "lodash-es";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";

import { LOGIN } from "../../queries/UserQuery";
import { getNewClient } from "../../utils/getApolloClient";
import UserInfoContext from "../UserInfoContext";

export const ApolloClientProvider = ({ children }) => {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState();
  const location = useLocation();

  const getToken = async () => {
    const token = await getAccessTokenSilently({
      audience: "graphql-api",
    });
    setToken(token);
  };

  useEffect(() => {
    if (isAuthenticated) getToken();
  }, [isAuthenticated]);

  const client = useMemo(() => getNewClient(token), [token]);

  useEffect(() => {
    if (isAuthenticated && token) {
      client
        .query({
          query: LOGIN,
        })
        .then((result) => {
          if (!isEqual(userInfo, result?.data?.getProfile))
            setUserInfo(result?.data?.getProfile);
        });
    }
  }, [client, setUserInfo, isAuthenticated, userInfo, location]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
