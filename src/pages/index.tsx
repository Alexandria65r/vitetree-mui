
import { styled, Box, colors, InputBase, ButtonBase, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import type { NextPage } from 'next'
import Layout from '../components/layout'
import SpeedIcon from '@mui/icons-material/Speed';
import AddIcon from '@mui/icons-material/Add';
import { NextRouter, useRouter } from 'next/router'
import { CustomFormControl } from '../reusable/styles'
import { CSS_PROPERTIES } from '../reusable'
import { colorScheme } from '../theme'
import { SlGraduation } from 'react-icons/sl'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { mainActions } from '../../reducers';
import authReducer, { authActions } from '../../reducers/auth-reducer/auth-reducer';

const Container = styled(Box)(({ theme }) => ({
  height: 'calc(100vh - 66px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    flexWrap: 'wrap'
  }

}))
const IllustratorCol = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  order: 2,
  flex: 1,
  height: 'calc(100vh - 66px)',
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : colorScheme(theme).primaryColor,
  [theme.breakpoints.down('sm')]: {
    flexBasis: '100%',
    order: 1,
    height: 'auto'
  }
}))

const Image = styled('img')(({ theme }) => ({
  height: 500,
  [theme.breakpoints.down("sm")]: {
    height: 350
  }
}))


const RightCol = styled(Box)(({ theme }) => ({
  order: 1,
  flexBasis: '55%',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-around',
  //border:'1px solid red',
  [theme.breakpoints.down('sm')]: {
    flexBasis: '100%',
    order: 2,
  }
}))


const TextWrap = styled(Box)(({ theme }) => ({
  flexBasis: '70%',
  [theme.breakpoints.down('sm')]: {
    flexBasis: '90%',
    marginBottom: 22,
  }
}))


const FrontBox = styled(Box)(({ theme }) => ({
  flexBasis: '70%',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  marginTop: 10,
  justifyContent: 'space-between',
  //border:'1px solid red',
  [theme.breakpoints.down('sm')]: {
    flexBasis: '90%',
    marginBottom: 10
  }
}))
const CommunityButton = styled(ButtonBase)(({ theme }) => ({
  textTransform: 'capitalize',
  //flex:1,
  fontSize: 17,
  height: 50,
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
  height: 50,
  padding: '0 10px',
  backgroundColor: colorScheme(theme).secondaryColor,
  borderRadius: CSS_PROPERTIES.radius5,
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
  border: `2px solid ${colors.teal[400]}`,
  '&:focus': {
    border: `2px solid ${colors.teal[400]}`,
  },
  [theme.breakpoints.down("sm")]: {
    height: 50,
  }
}))





const IndexPage: NextPage = () => {
  const router: NextRouter = useRouter()
  const [URL, setCode] = useState<string>('')
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.AuthReducer.user)


  function attend() {
    if (!URL) return
    window.open(URL, '_blank')
  }


  function gettingStartedRole(role: 'tutor' | 'student') {
    dispatch(authActions.setGettingStartedRole(role))
    dispatch(authActions.setAuhtUser({ ...user, role }))
    router.push('/signup')
  }


  const theme = useTheme()

  return (
    <Layout>
      <Container>
        <IllustratorCol>
          <Image src={theme.palette.mode === 'light' ? '/study.jpg' : '/prepare-dark.png'} />
        </IllustratorCol>
        <RightCol>
          <TextWrap>
            <Typography sx={{
              fontWeight: 800, fontSize: 30, lineHeight: 1.2,
              textTransform: 'capitalize',
              textAlign: 'center',
              backgroundClip: 'text',
              color: 'transparent',
              backgroundImage: `linear-gradient(45deg,${colors.teal[400]},${colors.blue[400]})`
            }}>

              The future of online education made easy with schooyard
            </Typography>
            <Typography sx={(theme) => ({
              my: 1, textAlign: 'center', fontWeight: 400,
              color: theme.palette.mode === 'light' ? '#5f6368' : '#ffff', fontSize: 16, lineHeight: 1.2
            })}>
              Learn at your own pace, discover a ton of courses from the best and highly rated tutors.
              Interact with tutors and request what you would want to learn next.
            </Typography>
            <Typography sx={{
              fontWeight: 600, fontSize: 16, lineHeight: 1.2,
              backgroundClip: 'text', textAlign: 'center',
              color: 'transparent',
              backgroundImage: `linear-gradient(45deg,${colors.teal[400]},${colors.blue[400]})`
            }}>
              Save time, Reduce workload and Instant results.
            </Typography>
          </TextWrap>


          <FrontBox>
            <CommunityButton sx={(theme) => ({
              flexBasis: '47%', fontWeight: 600,
              borderBottom: `4px solid ${colors.teal[500]}`,
              backgroundImage: `linear-gradient(45deg,${colors.teal[400]},${colors.blue[400]})`,
              [theme.breakpoints.down("sm")]: {
                height: 50,
              }
            })} onClick={() => gettingStartedRole('tutor')}
              color='secondary'>
              <AddIcon /> Become a tutor
            </CommunityButton>

            <CommunityButton sx={(theme) => ({
              flexBasis: '47%', fontWeight: 600,
              borderBottom: `4px solid ${colors.teal[500]}`,
              borderBottomColor: colors.deepOrange[400],
              backgroundImage: `linear-gradient(45deg,${colors.deepOrange[400]},${colors.orange[400]})`,
              [theme.breakpoints.down("sm")]: {
                height: 50,
              }
            })} onClick={() => gettingStartedRole('student')}
              color='secondary'>
              <SlGraduation size={21} style={{ marginRight: 6 }} />Start Learnning
            </CommunityButton>


          </FrontBox>
        </RightCol>
      </Container>
    </Layout>
  )
}

export default IndexPage




/*


The easiest  way to prepare school tests and test your students.

The professional way of conducting school tests and get instant
              results without sacrificing your time in <b>marking</b> every paper.

               Save time, Reduce workload and Instant results.


<CustomFormControl sx={(theme) => ({
              flexBasis: '58%',
              flexWrap: 'wrap',
              [theme.breakpoints.down("sm")]: {
                flex: 1
              }
            })}>
              <TextInput sx={{ flex: 1 }}
                onChange={({ target: { value } }) => setCode(value)}
                placeholder="Enter code or link"
              />
              <CommunityButton
                onClick={attend}
                sx={(theme) => ({
                  flexBasis: '15%',
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  [theme.breakpoints.down("sm")]: {
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    flexBasis: '18%',
                    [theme.breakpoints.down("sm")]: {
                      height: 50,
                    }
                  }
                })}
                color='info'>
                <SpeedIcon />
              </CommunityButton>
            </CustomFormControl>
          */
