import configuration from "@/config";
import {
    ApolloClient,
    InMemoryCache,
    HttpLink,
    from,
  } from '@apollo/client';
  
  import { setContext } from '@apollo/client/link/context';

const link = from([
    new HttpLink({
      // uri: 'https://leerecs.net//backend/public/graphql',
      uri: `${configuration.GRAPHQL_SERVER_LINK}`,
      credentials: 'include',
    }),
  ]);
const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });
export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(link),
  });