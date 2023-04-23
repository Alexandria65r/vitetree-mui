import { Box } from '@mui/joy'
import React from 'react'
import NavBar from './navbar'
import _app from '../pages/_app'
import { useAppDispatch } from '../../store/hooks'
import { checkAuthThunk } from '../../reducers/thunks'
import { useRouter } from 'next/router'
import ReusablePopper from './reusable-popper'
import DuplicateTestModal from './modals/duplicate-test-modal'
import DeleteTestModal from './modals/delete-test-modal'
import DeletePartcipantModal from './modals/delete-partcipant-modal'
import CartModal from './modals/cart-modal'
import WishListModal from './modals/wishlist-modal'

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
        localStorage.removeItem('redirectFlag')
        checkAuth()
    }, [router.pathname])




    return (
        <Box>
            <NavBar />
            <Box>{children}</Box>
            <ReusablePopper />
            <DuplicateTestModal />
            <DeleteTestModal />
            <DeletePartcipantModal />
            <CartModal />
            <WishListModal />
        </Box>
    )
}