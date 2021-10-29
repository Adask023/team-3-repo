import { ApolloProvider, gql } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useEffect, useMemo, useState } from "react";

import { LOGIN } from "../../queries/UserQuery";
import { getNewClient } from "../../utils/getApolloClient";
import UserInfoContext from "../UserInfoContext";

export const ApolloClientProvider = ({ children }) => {
  const { setUserInfo } = useContext(UserInfoContext);
  const { isAuthenticated, getAccessTokenSilently, ...props } = useAuth0();
  const [token, setToken] = useState();
  console.log(props);

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
          console.log(result);
          setUserInfo(result?.data?.getProfile);
        });
    }
  }, [client, setUserInfo, isAuthenticated]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
