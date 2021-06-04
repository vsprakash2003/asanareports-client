import type { AppProps /*, AppContext */ } from 'next/app'
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "./api/client";
import Head from "next/head";

export default function MyApp({ Component, pageProps }: AppProps) {
    const client = useApollo(pageProps.initialApolloState);
    return (
        <ApolloProvider client={client}>
          <Head>
            <title>Asana Task List</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Component {...pageProps} />;
        </ApolloProvider>
    );
  }