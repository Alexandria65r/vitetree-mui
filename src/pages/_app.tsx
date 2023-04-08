import '../styles/globals.css'
import '@fontsource/public-sans';
import React, { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { wrapper } from '../../store/store'
import { Box } from '@mui/material';
import Head from 'next/head';
import { ThemeProvider, createTheme } from '@mui/material';
import { ColorModeContext } from '../theme';
import cookie from 'js-cookie'
import { useRouter } from 'next/router';
import { CssVarsProvider } from '@mui/joy/styles';

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
    const body = document.querySelector('body');
    cookie.set('themeMode', theme?.palette.mode)
    const current = body?.classList.value;

    console.log(current)

    if (!current) {
      body?.classList.add(mode)
    } else if (current?.includes('light') && current?.includes('dark')) {
      //const removed = current.replace()
    } else {
      const res = current.replace(current, mode)
      body?.classList.remove(current)
      body?.classList.add(res)
    }

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
          <Component {...pageProps} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default wrapper.withRedux(App)
