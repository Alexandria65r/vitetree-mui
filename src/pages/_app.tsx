import '../styles/globals.css'
import '@fontsource/public-sans';

import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'

import { wrapper } from '../../store/store'
import { Box } from '@mui/system';
import Head from 'next/head';
import { CssVarsProvider } from '@mui/joy/styles';
import { ThemeProvider, createTheme, styled } from '@mui/material';
import { ColorModeContext, colorScheme } from '../theme';
import cookie from 'js-cookie'
import { useRouter } from 'next/router';

const AppContainer = styled(Box)(({ theme }) => ({
  backgroundColor: colorScheme(theme).primaryColor
}))



function App({ Component, pageProps }: AppProps) {
  const themeMode: any = cookie.get('themeMode');
  const [mode, setMode] = React.useState<'dark' | 'light'>('light')

  const router = useRouter()

  const theme = React.useMemo(() => createTheme({
    palette: {
      mode: mode ?? themeMode
    }
  }), [mode])


  useEffect(() => {
    cookie.set('themeMode', theme.palette.mode)
  }, [mode])

  useEffect(() => {
    if (themeMode !== undefined) {
      const isMode = mode !== themeMode
      setMode(isMode ? themeMode : mode)
    }
  }, [router.pathname])

  const colorMode = React.useMemo(() => ({
    toggleColorMode: () => {
      setMode((prevMode) => prevMode === 'light' ? 'dark' : 'light')
    },
  }), [])


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Public+Sans&display=swap"
          />
        </Head>
        <AppContainer>
          <Component {...pageProps} />
        </AppContainer>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default wrapper.withRedux(App)
