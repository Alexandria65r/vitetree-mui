import React from 'react'
import Layout from '../components/layout'
import { Box, ButtonBase, TextField, colors, styled } from '@mui/material'
import { colorScheme } from '../theme'
import { CSS_PROPERTIES } from '../reusable'
import GoogleIcon from '@mui/icons-material/Google';
import { ContinueWith, ContinueWithOverlayText, FormContainer, FormHeader, FormLogo } from '../reusable/styles'

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
    return (
            <Container>
                <FormContainer>
                    <FormLogo></FormLogo>
                    <FormHeader>Sign In</FormHeader>
                    <FormControl>
                        <TextInput sx={{ flex: 1 }} label="Email" placeholder="Email" />
                    </FormControl>
                    <FormControl>
                        <TextInput sx={{ flex: 1 }} label="Password" placeholder="Password" />
                    </FormControl>
                    <FormControl>
                        <Button>Sign in</Button>
                    </FormControl>
                    <FormControl sx={{ marginTop: 3 }}>
                        <ContinueWith>
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