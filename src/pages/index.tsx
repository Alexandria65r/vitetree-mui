
import { styled, Box, colors, InputBase, ButtonBase } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { wrapper } from '../../store/store'
import Layout from '../components/layout'
import SpeedIcon from '@mui/icons-material/Speed';
import AddIcon from '@mui/icons-material/Add';
import { NextRouter, useRouter } from 'next/router'
import { CustomFormControl } from '../reusable/styles'
import { CSS_PROPERTIES } from '../reusable'
import { Test } from '../reusable/interfaces'
import TestAPI from '../api-services/test'
import ReusablePopper from '../components/reusable-popper'
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
const IllustratorCol = styled(Box)(({ theme }) => ({
  flex: 1,
  height: 'calc(100vh - 66px)',
  backgroundColor: '#fff',
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  }
}))


const RightCol = styled(Box)(({ theme }) => ({
  flexBasis: '55%',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-around',
  //border:'1px solid red',
  [theme.breakpoints.down('sm')]: {
    flexBasis: '100%',
  }
}))
const FrontBox = styled(Box)(({ theme }) => ({
  flexBasis: '70%',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  //border:'1px solid red',
  [theme.breakpoints.down('sm')]: {
    width: '70%',
  }
}))
const CommunityButton = styled(ButtonBase)(({ theme }) => ({
  textTransform: 'capitalize',
  //flex:1,
  fontSize: 17,
  height: 45,
  borderRadius: 5,
  color: '#fff',
  backgroundColor: colors.teal[400],
  [theme.breakpoints.down('sm')]: {
    flexBasis: '100%',
    borderRadius: 5,
    margin: '6px 0'
  }
}))
const TextInput = styled(InputBase)(({ theme }) => ({
  flexBasis: '60%',
  height: 46,
  padding: '0 10px',
  backgroundColor: '#fff',
  borderRadius: CSS_PROPERTIES.radius5,
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
  border: `2px solid ${colors.teal[400]}`,
  '&:focus': {
    border: `2px solid ${colors.teal[400]}`,
  }
}))





const IndexPage: NextPage = () => {
  const router: NextRouter = useRouter()
  const [code, setCode] = useState<string>('')



  function attend() {
    if (!code) return
    router.push(`/attendee-info/${code}`)
  }

  return (
    <Layout>
      <Container>
        <IllustratorCol>

        </IllustratorCol>
        <RightCol>
          <FrontBox>
            <CommunityButton sx={{ flexBasis: '30%' }} onClick={() => router.push('/create')}
              color='secondary'>
              <AddIcon /> New Test
            </CommunityButton>

            <CustomFormControl sx={(theme) => ({
              flexBasis: '65%',
              flexWrap: 'wrap',
              [theme.breakpoints.down("sm")]: {
                flex: 1
              }
            })}>
              <TextInput sx={{ flex: 1 }} onChange={({ target: { value } }) => setCode(value)} placeholder="Enter code or link" />
              <CommunityButton
                onClick={attend}
                sx={(theme) => ({
                  flexBasis: '15%',
                  height: 46,
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  [theme.breakpoints.down("sm")]: {
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    flexBasis: '18%',
                  }
                })}
                color='info'>
                <SpeedIcon />
              </CommunityButton>
            </CustomFormControl>
          </FrontBox>
        </RightCol>
      </Container>
    </Layout>
  )
}

export default IndexPage
