import { Button } from '@mui/joy'
import type { NextPage } from 'next'
import Head from 'next/head'
import { mainActions } from '../../reducers'
import { useAppSelector } from '../../store/hooks'
import { wrapper } from '../../store/store'
import styles from '../styles/Home.module.css'

export const getServerSideProps = wrapper.getServerSideProps(({ dispatch }) => async (params) => {
  await dispatch(mainActions.setAppName('LEEFTUP WEB SERVICES'))
  return {
    props: {

    }
  }
})


const IndexPage: NextPage = () => {
  const appName = useAppSelector((state) => state.MainReducer.appName)
  return (
    <div className={styles.container}>
      <Head>
        <title>App Template</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <p>
          {appName}
        </p>
        <p>
          Mui Template
        </p>

        <Button color='success' sx={{fontWeight:500}} >Login</Button>
      </header>
    </div>
  )
}

export default IndexPage
