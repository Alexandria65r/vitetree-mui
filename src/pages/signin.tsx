import React, { useState } from 'react'
import Layout from '../components/layout'
import { Box, ButtonBase, TextField, colors, styled } from '@mui/material'
import { colorScheme } from '../theme'
import { CSS_PROPERTIES } from '../reusable'
import GoogleIcon from '@mui/icons-material/Google';
import { ContinueWith, ContinueWithOverlayText, FormContainer, FormHeader, FormLogo } from '../reusable/styles'
import { Signin } from '../reusable/interfaces'
import { useRouter } from 'next/router'
import AuthAPI from '../api-services/auth'
import { useAppDispatch } from '../../store/hooks'
import cookies from 'js-cookie'
import { authActions } from '../../reducers/auth-reducer'

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

export default function signin({ }: Props) {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const [signInData, setSignInData] = useState<Signin>({
        email: '',
        password: ''
    })


    function handleOnChange({ target: { value, name } }: any) {
        setSignInData({
            ...signInData,
            [name]: value
        })
    }

    async function handleSignIn() {
        const {data} = await AuthAPI.signin(signInData)
        if(data.success){
            cookies.set('testDamToken', data.token)
            dispatch(authActions.setAuhtUser(data.user))
            router.replace('/dashboard')
        }
        console.log(signInData)
    }


    return (
        <Container>
            <FormContainer>
                <FormLogo></FormLogo>
                <FormHeader>Sign In</FormHeader>
                <FormControl>
                    <TextInput sx={{ flex: 1 }} name="email" onChange={handleOnChange} label="Email" placeholder="Email" />
                </FormControl>
                <FormControl>
                    <TextInput sx={{ flex: 1 }} name="password" onChange={handleOnChange} label="Password" placeholder="Password" />
                </FormControl>
                <FormControl>
                    <Button onClick={handleSignIn}>Sign in</Button>
                </FormControl>
                <FormControl sx={{ marginTop: 3 }}>
                    <ContinueWith >
                        <ContinueWithOverlayText>Continue with</ContinueWithOverlayText>
                    </ContinueWith>
                    <Button>
                        <span style={{ marginRight: 8 }}><GoogleIcon /></span>
                        Signin with Google
                    </Button>
                </FormControl>
            </FormContainer>
        </Container>
    )
}