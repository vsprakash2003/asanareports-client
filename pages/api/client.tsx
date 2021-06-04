// import { ApolloClient, InMemoryCache } from "@apollo/client";

// const client = new ApolloClient({
//     uri: process.env.ASANA_TASK_API,
//     cache: new InMemoryCache(),
//     headers: {
//         Authorization: `Bearer ${process.env.ASANA_TOKEN}`
//     }
//   });

import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { useMemo } from "react";

//  function client() {
//    return new ApolloClient({
//     //  ssrMode: typeof window === "undefined", // set to true for SSR
//     ssrMode: false,
//      link: new HttpLink({
//        uri: process.env.ASANA_TASK_API,
//        headers: {
//                 Authorization: `Bearer ${process.env.ASANA_TOKEN}`
//              }
//      }),
//      cache: new InMemoryCache(),
//    });
//  }

// const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
//     link: new HttpLink({
//       uri: process.env.ASANA_TASK_API,
//       headers: {
//                Authorization: `Bearer ${process.env.ASANA_TOKEN}`
//             }
//     }),
//     cache: new InMemoryCache(),
//   });

// export default client;

let apolloClient: ApolloClient<NormalizedCacheObject>;

// export function createApolloClient() {
//   return new ApolloClient({
//     link: new HttpLink({
//       uri: process.env.ASANA_TASK_API,
//       credentials: "same-origin",
//     }),
//     headers: {
//       Authorization: `Bearer ${process.env.ASANA_TOKEN}`,
//     },
//     cache: new InMemoryCache(),
//     defaultOptions: {
//       watchQuery: {
//         fetchPolicy: "cache-and-network",
//       },
//     },
//   });
// }
const createApolloClient = function() {
  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.ASANA_TASK_API,
      credentials: "same-origin",
    }),
    headers: {
      Authorization: `Bearer ${process.env.ASANA_TOKEN}`,
    },
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network",
      },
    },
  });
};

export default createApolloClient;

export function initializeApollo(initialState = {}) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

// export function useApollo() {
export function useApollo(initialState: {} | undefined) {
  // const client = useMemo(() => createApolloClient(), []);
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
