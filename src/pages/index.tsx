
import { styled, Button, makeStyles } from '@mui/material'
import { Box } from '@mui/system'
import type { NextPage } from 'next'
import Head from 'next/head'
import { mainActions } from '../../reducers'
import { useAppSelector } from '../../store/hooks'
import { wrapper } from '../../store/store'
import Layout from '../components/layout'
import VideoCallIcon from '@mui/icons-material/VideoCall';
import PeopleIcon from '@mui/icons-material/People';
import { NextRouter, useRouter } from 'next/router'
export const getServerSideProps = wrapper.getServerSideProps(({ dispatch }) => async (params) => {
  await dispatch(mainActions.setAppName('LEEFTUP WEB SERVICES'))
  return {
    props: {

    }
  }
})


const Container = styled(Box)({
  height: 'calc(100vh - 66px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})
const FrontBox = styled(Box)(({theme})=>({
  display: 'flex',
  justifyContent: 'space-evenly',
  width: '23%',
  //border:'1px solid'
  [theme.breakpoints.down('sm')]:{
    width: '70%',
  }
}))
const CommunityButton = styled(Button)({
  textTransform: 'capitalize',
  height: 45,
  borderRadius: 0,
  borderTopLeftRadius: 5,
  borderBottomLeftRadius: 5
})
const MeetButton = styled(Button)({
  textTransform: 'capitalize',
  height: 45,
  borderRadius: 0,
  borderTopRightRadius: 5,
  borderBottomRightRadius: 5,
})




const IndexPage: NextPage = () => {
  const appName = useAppSelector((state) => state.MainReducer.appName)
  const router:NextRouter = useRouter()
  return (
    <Layout>
      <Container>
        <FrontBox>
          <CommunityButton onClick={()=>router.push('/communities')} color='secondary' startIcon={<PeopleIcon />} variant='contained'>
            Communities
          </CommunityButton>
          <MeetButton onClick={()=>router.push('/meet/meet-id')} color='info' startIcon={<VideoCallIcon />} variant='contained'>
            Meet now
          </MeetButton>
        </FrontBox>
      </Container>

    </Layout>
  )
}

export default IndexPage
