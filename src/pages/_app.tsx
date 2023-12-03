import '../styles/globals.css'
import 'react-loading-skeleton/dist/skeleton.css'
import '@fontsource/public-sans';
import React, { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { wrapper } from '../../store/store'
import Head from 'next/head';
import { ThemeProvider, createTheme } from '@mui/material';
import { ColorModeContext } from '../theme';
import cookie from 'js-cookie'
import { useRouter } from 'next/router';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Provider } from 'react-redux';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhcKQQyiWP97RBue6OUXDCNRZoRdZZg0c",
  authDomain: "schooyard-109e5.firebaseapp.com",
  projectId: "schooyard-109e5",
  storageBucket: "schooyard-109e5.appspot.com",
  messagingSenderId: "859216923743",
  appId: "1:859216923743:web:dd64450764fd4edcb9dfea",
  measurementId: "G-1XRY1SEZTY"
};

// Initialize Firebase

const isServer = typeof window !== "undefined"

export const fireBaseApp = isServer ? initializeApp(firebaseConfig) : null;
if (fireBaseApp) {
  getAnalytics(fireBaseApp);
}



function App({ Component, pageProps, ...rest }: AppProps) {
  const { props, store } = wrapper.useWrappedStore(rest)
  const themeMode: any = cookie.get('themeMode');
  const [mode, setMode] = React.useState<'dark' | 'light'>('light')

  const router = useRouter()

  const theme = React.useMemo(() => createTheme({
    typography: {
      fontFamily: "'Lato', sans-serif"
    },
    palette: {
      mode: mode ?? themeMode,

    }
  }), [mode])


  useEffect(() => {
    const body = document.querySelector('body');
    cookie.set('themeMode', theme?.palette.mode)
    const current = body?.classList.value;

    console.log(current)

    if (!current) {
      body?.classList.toggle(mode)
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
    <Provider store={store}>

      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Head>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
            {/* <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Public+Sans&display=swap"
          /> */}

          </Head>
          <Component {...pageProps} />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Provider>
  )
}

export default App
