import '../styles/globals.css'
import '@fontsource/public-sans';


import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'

import { wrapper } from '../../store/store'
import { Box } from '@mui/system';
import Head from 'next/head';
import { CssVarsProvider } from '@mui/joy/styles';
function App({ Component, pageProps }: AppProps) {
  return (
    <CssVarsProvider>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Public+Sans&display=swap"
        />
      </Head>
      <Component {...pageProps} />
    </CssVarsProvider>
  )
}

export default wrapper.withRedux(App)
