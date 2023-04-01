
import { styled, Button,Box } from '@mui/material'

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

  return {
    props: {

    }
  }
})


const Container = styled(Box)({
  height: 'calc(100vh - 66px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

})
const FrontBox = styled(Box)(({theme})=>({
  display: 'flex',
  flexWrap:'wrap',
  justifyContent: 'space-evenly',
  width: '23%',
  //border:'1px solid'
  [theme.breakpoints.down('sm')]:{
    width: '70%',
  }
}))
const CommunityButton = styled(Button)(({theme})=>({
  textTransform: 'capitalize',
  height: 45,
  borderRadius: 5,
  [theme.breakpoints.down('sm')]:{
  flexBasis: '100%',
    borderRadius: 5,
    margin:'6px 0'
}
}))





const IndexPage: NextPage = () => {
  const router:NextRouter = useRouter()
  return (
    <Layout>
      <Container>
        <FrontBox>
          <CommunityButton onClick={()=>router.push('/communities')} color='secondary' startIcon={<PeopleIcon />} variant='contained'>
            Communities
          </CommunityButton>
          <CommunityButton onClick={()=>router.push('/launch-meet')} color='info' startIcon={<VideoCallIcon />} variant='contained'>
            Meet now
          </CommunityButton>
        </FrontBox>
      </Container>

    </Layout>
  )
}

export default IndexPage
