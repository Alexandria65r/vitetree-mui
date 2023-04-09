import React, { useState } from 'react'
import Layout from '../components/layout'
import { Box, ButtonBase, TextField, colors, styled } from '@mui/material'
import { colorScheme } from '../theme'
import { CSS_PROPERTIES } from '../reusable'
import GoogleIcon from '@mui/icons-material/Google';
import { ContinueWith, ContinueWithOverlayText, FormContainer, FormHeader, FormLogo } from '../reusable/styles'
import AuthAPI from '../api-services/auth'
import { User } from '../reusable/interfaces'
import { UserSchema } from '../reusable/schemas'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { authActions } from '../../reducers/auth-reducer'
import cookies from 'js-cookie'

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
  const [signUpData, setSignUpData] = useState<User>(UserSchema)


  function handleOnChange({ target: { value, name } }: any) {
    setSignUpData({
      ...signUpData,
      [name]: value
    })
  }

  async function handleSignUp() {
    const { data } = await AuthAPI.signUp(signUpData)

    if (data.success) {
      cookies.set('testDamToken', data.token)
      dispatch(authActions.setAuhtUser(data.user))
      router.replace('/dashboard')
    }
  }

  return (

    <Container>
      <FormContainer>
        <FormLogo></FormLogo>
        <FormHeader>Sign Up</FormHeader>
        <FormControl>
          <TextInput name="firstName" onChange={handleOnChange} sx={{ flexBasis: '48%' }} label="first name" placeholder="first name" />
          <TextInput name="lastName" onChange={handleOnChange} sx={{ flexBasis: '48%' }} label="last name" placeholder="last name" />
        </FormControl>
        <FormControl>
          <TextInput name="email" onChange={handleOnChange} sx={{ flex: 1 }} label="Email" placeholder="Email" />
        </FormControl>
        <FormControl>
          <TextInput name="password" onChange={handleOnChange} sx={{ flex: 1 }} label="Password" placeholder="Password" />
        </FormControl>
        <FormControl>
          <Button onClick={handleSignUp} sx={{ flexBasis: '100%' }}>Sign Up</Button>
        </FormControl>
        <FormControl sx={{ marginTop: 3 }}>
          <ContinueWith>
            <ContinueWithOverlayText>Continue with</ContinueWithOverlayText>
          </ContinueWith>
          <Button sx={{ flexBasis: '100%' }}>
            <span style={{ marginRight: 8 }}><GoogleIcon /></span>
            Signin with Google
          </Button>
        </FormControl>
      </FormContainer>
    </Container>
  )
}