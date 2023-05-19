import React, { useState } from 'react'
import { getAuth, signInWithRedirect, GoogleAuthProvider, getRedirectResult } from "firebase/auth";
import { ButtonBase, colors, styled } from '@mui/material';
import { CSS_PROPERTIES } from '../../reusable';
import GoogleIcon from '@mui/icons-material/Google';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import { authActions } from '../../../reducers/auth-reducer/auth-reducer';
import { fireBaseApp } from '../../pages/_app';
import { SignInThunk } from '../../../reducers/auth-reducer/auth-thunks';



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


const provider = new GoogleAuthProvider();
type Props = {
    disabled: boolean
}

export default function SignInWithGoogleButton({ disabled }: Props) {
    const dispatch = useAppDispatch()
    const gettingStartedRole = useAppSelector((state) => state.AuthReducer.gettingStartedRole)

    React.useEffect(() => {
        handleRedirectData()
    }, [])

    async function handleRedirectData() {
        if (fireBaseApp) {
            const auth = getAuth(fireBaseApp)
            const authData = await getRedirectResult(auth)
            if (authData) {
                dispatch(authActions.setRedirecting(true))
                dispatch(SignInThunk({
                    provider: 'google-provider',
                    email: authData?.user.email ?? '',
                    photoURL: authData?.user.photoURL ?? ''
                }))

            }

        }
    }


    async function signInWithGoogle() {
        if (gettingStartedRole) {
            localStorage.setItem('getting-started-role', gettingStartedRole)
        }
        localStorage.setItem('redirectFlag', JSON.stringify({ isRedirecting: true }))
        if (fireBaseApp) {
            const auth = getAuth(fireBaseApp)
            try {
                await signInWithRedirect(auth, provider)
            } catch (error) {
                console.log(error)
            }

        }

    }
    return (
        <Button disabled={disabled} onClick={signInWithGoogle}>
            <span style={{ marginRight: 8 }}><GoogleIcon /></span>
            Signin with Google
        </Button>
    )
}