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
        <link rel="icon" href="/favicon.ico" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content={Colors.gray['900']} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
      </Head>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  )
}

export default MyApp
