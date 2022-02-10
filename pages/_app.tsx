import type { AppProps } from 'next/app'
import { ThemeProvider } from "styled-components";
import GlobalStyle from '../styles/GobalStyle';
import theme from '../styles/Theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <>
        <GlobalStyle/>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </>
  )
}

export default MyApp
