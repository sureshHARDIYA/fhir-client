import Cookie from "js-cookie";
import { setContext } from "apollo-link-context";
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";

const httpLink = new HttpLink({ uri: `${process.env.REACT_APP_GRAPHQL_URL}$graphql` });
const authLink = setContext(async (_: any, { headers }) => {
  if (Cookie.get("access_token")) {
    return ({
      headers: {
        ...headers,
        authorization: `Bearer ${Cookie.get("access_token")}`,
      },
    });
  }

  return { headers };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: process.env.NODE_ENV !== "production",
});
