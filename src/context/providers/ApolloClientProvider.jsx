import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_KEY,
  cache: new InMemoryCache(),
});

export const ApolloClientProvider = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
