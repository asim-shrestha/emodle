import type { AppProps } from 'next/app'
import { ThemeProvider } from "styled-components";
import GlobalStyle from '../styles/GobalStyle';
import theme from '../styles/Theme';
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <>
          <Head>
              <title>Emodle - A daily emoji game</title>
              <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          </Head>
          <GlobalStyle/>
          <ThemeProvider theme={theme}>
              <Component {...pageProps} />
          </ThemeProvider>
      </>
  )
}

export default MyApp
