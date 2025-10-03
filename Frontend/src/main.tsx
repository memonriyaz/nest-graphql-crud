import React from "react";
import ReactDOM from "react-dom/client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import App from "./App";
import './index.css'

const endpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT || "http://localhost:4000/graphql";

const client = new ApolloClient({
  link: createHttpLink({
    uri: endpoint,
    credentials: "include",
  }),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App defaultEndpoint={endpoint} />
    </ApolloProvider>
  </React.StrictMode>
);
