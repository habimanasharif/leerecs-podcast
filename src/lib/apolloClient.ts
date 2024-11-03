// lib/apolloClient.ts
import configuration from "@/config";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: configuration.GRAPHQL_SERVER_LINK, // Your GraphQL API endpoint
  cache: new InMemoryCache(),
});

export default client;