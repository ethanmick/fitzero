import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import Colors from 'tailwindcss/colors'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/globals.css'

const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_API_ROOT}/graphql`,
  cache: new InMemoryCache(),
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>FitZero</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content={Colors.neutral['900']} />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  )
}

export default MyApp
