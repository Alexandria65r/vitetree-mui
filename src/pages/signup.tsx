import React, { useEffect } from 'react'
import { Box, ButtonBase, CircularProgress, Link, MenuItem, Select, TextField, Typography, colors, styled } from '@mui/material'
import { CSS_PROPERTIES } from '../reusable'
import { ContinueWith, ContinueWithOverlayText, FormContainer, FormHeader, FormLogo, RedirectingCard } from '../reusable/styles'
import { Role } from '../reusable/interfaces'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { authActions } from '../../reducers/auth-reducer/auth-reducer'
import { getAuth } from "firebase/auth";
import SignInWithGoogleButton from '../components/auth/google-button'
import { useAppSelector } from '../../store/hooks'
import { fireBaseApp } from './_app'
import { signupThunk } from '../../reducers/auth-reducer/auth-thunks'
import { AppSpinner } from '../components/activity-indicators'


const Container = styled(Box)(() => ({
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))


const TextInput = styled(TextField)(({ theme }) => ({

}))
const FormControl = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: '20px 0'
}))

const Button = styled(ButtonBase)(({ theme }) => ({
  flex: 1,
  justifySelf: 'flex-end',
  fontWeight: 600,
  height: 50,
  color: '#fff',
  fontSize: 16,
  borderRadius: CSS_PROPERTIES.radius5,
  backgroundColor: colors.teal[400]
}))



type Props = {}

export default function Signup({ }: Props) {
  const dispatch = useDispatch()
  const router = useRouter()
  const signUpData = useAppSelector((state) => state.AuthReducer.user)
  const isRedirecting = useAppSelector((state) => state.AuthReducer.isRedirecting)
  const isError = useAppSelector((state) => state.AuthReducer.isError)
  const authNetworkStatus = useAppSelector((state) => state.AuthReducer.authNetworkStatus)

  React.useEffect(() => {
    console.log(router.query)
    completeGoogleSignup()
  }, [router.query])



  useEffect(() => {
    const sd = localStorage.getItem('redirectFlag')
    if (sd !== null) {
      const res: any = JSON.parse(sd)
      dispatch(authActions.setRedirecting(res.isRedirecting))
    }

    return () => {
      dispatch(authActions.setError(false))
    }
  }, [])


  function handleOnChange({ target: { value, name } }: any) {
    if (name === 'gender' && value === 'Select Gender') return
    if (name === 'role' && value === 'Select Role') return
    dispatch(authActions.setAuhtUser({
      ...signUpData,
      [name]: value
    }))

  }

  function getUserRole() {
    const role = localStorage.getItem('getting-started-role')
    if (role !== null) {
      console.log(role)
      return role as Role
    }
  }


  function completeGoogleSignup() {
    if (router.query.authProvider === 'google') {
      if (fireBaseApp) {
        const { currentUser } = getAuth(fireBaseApp)
        const splitedName: any = currentUser?.displayName?.split(' ');
        console.log(currentUser)
        dispatch(authActions.setAuhtUser({
          firstName: splitedName[0] ?? '',
          lastName: splitedName[1] ?? '',
          email: currentUser?.email ?? '',
          role: getUserRole() ?? '',
          accountBalance:0,
          password: '',
          gender: '',

        }))
      }
    }
  }



  return (

    <Container>

      {isRedirecting ? (
        <FormContainer>
          <FormLogo></FormLogo>
          <RedirectingCard>
            <Box>
              <Typography sx={{ textAlign: 'center' }}>One moment...</Typography>
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress sx={{ color: colors.teal[400] }} />
              </Box>
            </Box>
          </RedirectingCard>
        </FormContainer>
      ) : (
        <FormContainer>
          <FormLogo></FormLogo>
          <FormHeader>Sign Up</FormHeader>
          <FormControl>
            <TextInput name="firstName"
              error={isError && !signUpData.firstName}
              value={signUpData.firstName}
              onChange={handleOnChange}
              sx={{ flexBasis: '48%' }}
              label="First Name"
              placeholder="First Name" />
            <TextInput name="lastName"
              error={isError && !signUpData.lastName}
              value={signUpData.lastName}
              onChange={handleOnChange}
              sx={{ flexBasis: '48%' }}
              label="Last Name"
              placeholder="Last Name" />
          </FormControl>

          <FormControl>
            <Select onChange={handleOnChange}
              sx={{ flex: 1 }}
              error={isError && !signUpData.role}
              value={signUpData.role || undefined}
              name='country' defaultValue='Select Role' >
                <MenuItem value="Country Region">Country Region</MenuItem>
                <MenuItem value="Zambia">Zambia</MenuItem>
                <MenuItem value="South Africa">South Africa</MenuItem>
            </Select>
          </FormControl>

          <FormControl>
            <TextInput name="phone"
              error={isError && !signUpData.phone} value={signUpData.phone}
              onChange={handleOnChange}
              sx={{ flexBasis: '48%' }} label="Phone Number" placeholder="Phone Number" />
            <TextInput name="email"
              error={isError && !signUpData.email} value={signUpData.email}
              onChange={handleOnChange}
              sx={{ flexBasis: '48%' }} label="Email" placeholder="Email" />
          </FormControl>

          <FormControl>
            <Select onChange={handleOnChange}
              sx={{ flexBasis: '48%' }}
              error={isError && !signUpData.gender}
              value={signUpData.gender || undefined}
              name='gender' defaultValue='Select Gender' >
              <MenuItem value="Select Gender">Select Gender</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="male">Male</MenuItem>
            </Select>
            <TextInput
              name="birthday"
              type='date'
              error={isError && !signUpData.birthday} value={signUpData.birthday}
              onChange={handleOnChange}
              sx={{ flexBasis: '48%' }} label="Birthday" placeholder="Birthday" 
            />
          </FormControl>
          <FormControl>
            <TextInput name="password"
              error={isError && !signUpData.password}
              value={signUpData.password}
              onChange={handleOnChange}
              sx={{ flex: 1 }} label="Password" placeholder="Password" />
          </FormControl>
          <FormControl>
            <Button onClick={() => dispatch(signupThunk())} sx={{ flexBasis: '100%' }}>
              Sign Up <AppSpinner size={25} visible={authNetworkStatus === 'signup'} />
            </Button>
            <Typography sx={{ mt: .5, fontSize: 14 }}>
              Alredy have an account?
              <Link href="/signin">
                <span style={{ marginLeft: 5, color: colors.lightBlue[500] }}>
                  signin
                </span>
              </Link>
            </Typography>
          </FormControl>
          <FormControl sx={{ marginTop: 3 }}>
            <ContinueWith>
              <ContinueWithOverlayText>Continue with</ContinueWithOverlayText>
            </ContinueWith>
            <SignInWithGoogleButton
              disabled={router.query?.authProvider === 'google'} />
          </FormControl>
        </FormContainer>
      )}
    </Container>
  )
}