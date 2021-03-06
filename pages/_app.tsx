import { ApolloProvider } from '@apollo/client'
import { fetcher } from 'lib'
import apolloClient from 'lib/apollo'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { SWRConfig } from 'swr'
import colors from 'tailwindcss/colors'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>FitZero</title>

        <meta name="application-name" content="FitZero" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="FitZero" />
        <meta name="description" content="Track your fitness" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-TileColor" content="black" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content={colors.neutral['900']} />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />

        {/* Icons */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-touch-icon.png"
        />

        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SWRConfig
        value={{
          fetcher,
        }}
      >
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </SWRConfig>
    </>
  )
}

export default MyApp
