import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

export const getNewClient = (username) => {
  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_API_KEY,
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        "user-name": username ? username : "",
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return client;
};
