import React, { useEffect, useState } from 'react'
import { Box, ButtonBase, CircularProgress, TextField, Typography, colors, styled } from '@mui/material'
import { CSS_PROPERTIES } from '../reusable'
import { ContinueWith, ContinueWithOverlayText, FormContainer, FormHeader, FormLogo, RedirectingCard } from '../reusable/styles'
import { Signin } from '../reusable/interfaces'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import SignInWithGoogleButton from '../components/auth/google-button'
import { SignInThunk } from '../../reducers/thunks'
import { mainActions } from '../../reducers'
import { authActions } from '../../reducers/auth-reducer'



const Container = styled(Box)(({ theme }) => ({
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

export default function SigninPage({ }: Props) {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const isRedirecting = useAppSelector((state) => state.AuthReducer.isRedirecting)

    useEffect(() => {
        const sd = localStorage.getItem('redirectFlag')
        if (sd !== null) {
            const res: any = JSON.parse(sd)
            dispatch(authActions.setRedirecting(res.isRedirecting))
        }
    }, [])

    const [schooyardProvider, setSignInData] = useState<Signin>({
        email: '',
        password: '',
        provider: 'schooyard-provider',
    })

    function handleOnChange({ target: { value, name } }: any) {
        setSignInData({
            ...schooyardProvider,
            [name]: value
        })
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

            ) : (<FormContainer>
                <FormLogo></FormLogo>
                <FormHeader>Sign In</FormHeader>
                <FormControl>
                    <TextInput sx={{ flex: 1 }} name="email" onChange={handleOnChange} label="Email" placeholder="Email" />
                </FormControl>
                <FormControl>
                    <TextInput sx={{ flex: 1 }} name="password" onChange={handleOnChange} label="Password" placeholder="Password" />
                </FormControl>
                <FormControl>
                    <Button onClick={() => dispatch(SignInThunk(schooyardProvider))}>
                        Sign in
                    </Button>
                </FormControl>
                <FormControl sx={{ marginTop: 3 }}>
                    <ContinueWith >
                        <ContinueWithOverlayText>Continue with</ContinueWithOverlayText>
                    </ContinueWith>
                    <SignInWithGoogleButton disabled={false} />
                </FormControl>
            </FormContainer >)}

        </Container>
    )
}