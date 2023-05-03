import React, { useState, useEffect } from 'react'
import { Box, ButtonBase, CircularProgress, TextField, Typography, colors, styled } from '@mui/material'
import { CSS_PROPERTIES, SCHOOYARD_AUTH_TOKEN } from '../reusable'
import { ContinueWith, ContinueWithOverlayText, FormContainer, FormHeader, FormLogo, RedirectingCard } from '../reusable/styles'
import AuthAPI from '../api-services/auth'
import { User } from '../reusable/interfaces'
import { UserSchema } from '../reusable/schemas'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { authActions } from '../../reducers/auth-reducer'
import cookies from 'js-cookie'
import { getAuth } from "firebase/auth";
import SignInWithGoogleButton from '../components/auth/google-button'
import { useAppSelector } from '../../store/hooks'
import { fireBaseApp } from './_app'


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
  const gettingStartedRole = useAppSelector((state) => state.AuthReducer.gettingStartedRole)

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
  }, [])


  function handleOnChange({ target: { value, name } }: any) {
    dispatch(authActions.setAuhtUser({
      ...signUpData,
      [name]: value
    }))

  }

  function getUserRole() {
    const role = localStorage.getItem('getting-started-role')
    if (role !== null) {
      console.log(role)
      return role
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
          password: ''
        }))
      }
    }
  }

  async function handleSignUp() {
    try {
      const { data } = await AuthAPI.signUp(signUpData)
      if (data.success) {
        cookies.set(SCHOOYARD_AUTH_TOKEN, data.token)
        dispatch(authActions.setAuhtUser(data.user))
        router.replace('/dashboard')
        if (getUserRole()) {
          localStorage.removeItem('getting-started-role')
        }
      }
    } catch (error) {
        console.log('err signup')
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
              value={signUpData.firstName}
              onChange={handleOnChange}
              sx={{ flexBasis: '48%' }}
              label="first name"
              placeholder="first name" />
            <TextInput name="lastName"
              value={signUpData.lastName}
              onChange={handleOnChange}
              sx={{ flexBasis: '48%' }}
              label="last name"
              placeholder="last name" />
          </FormControl>
          <FormControl>
            <TextInput name="email" value={signUpData.email}
              onChange={handleOnChange}
              sx={{ flex: 1 }} label="Email" placeholder="Email" />
          </FormControl>

          <FormControl>
            <TextInput name="role" value={signUpData.role}
              onChange={handleOnChange}
              sx={{ flex: 1 }} label="Role"
              placeholder="Role" />
          </FormControl>
          <FormControl>
            <TextInput name="password"
              value={signUpData.password}
              onChange={handleOnChange}
              sx={{ flex: 1 }} label="Password" placeholder="Password" />
          </FormControl>
          <FormControl>
            <Button onClick={handleSignUp} sx={{ flexBasis: '100%' }}>
              Sign Up
            </Button>
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