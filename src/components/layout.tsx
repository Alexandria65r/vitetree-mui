import { Box } from '@mui/joy'
import React from 'react'
import NavBar from './navbar'
import _app from '../pages/_app'
import AuthAPI from '../api-services/auth'
import Cookies from 'js-cookie'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { authActions } from '../../reducers/auth-reducer'
import { checkAuthThunk } from '../../reducers/thunks'
import { useRouter } from 'next/router'
import ReusablePopper from './reusable-popper'

type Props = {
    children: any
}

export default function Layout({ children }: Props) {
    const dispatch = useAppDispatch()
    const router = useRouter()

    const checkAuth = React.useCallback(async () => {
        const { payload } = await dispatch(checkAuthThunk({}))
        console.log(payload)
        if (payload === 'not-authorized' && router.pathname !== '/') {
            router.push('/signin')
        }
    }, [router.pathname])


    React.useEffect(() => {
        checkAuth()
    }, [router.pathname])


    React.useEffect(() => {
        localStorage.removeItem('redirectFlag')
        return () => {
        }
    }, [])

    return (
        <Box>
            <NavBar />
            <Box>{children}</Box>
            <ReusablePopper />
        </Box>
    )
}