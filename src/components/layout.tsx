import { Box } from '@mui/joy'
import React from 'react'
import NavBar from './navbar'
import _app from '../pages/_app'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { checkAuthThunk } from '../../reducers/thunks'
import { useRouter } from 'next/router'
import ReusablePopper from './reusable-popper'
import DuplicateTestModal from './modals/duplicate-test-modal'
import DeleteTestModal from './modals/delete-test-modal'
import DeletePartcipantModal from './modals/delete-partcipant-modal'
import CartModal from './modals/cart-modal'
import WishListModal from './modals/wishlist-modal'
import SideBar from './side-bar'
import { mainActions } from '../../reducers'
import { LinearProgress, colors, styled } from '@mui/material'
import { StyledButton } from '../reusable/styles'
import { BiHome, BiHomeAlt } from 'react-icons/bi'
import AsideNavbar from './aside-navbar'

const FlexContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    height: 'calc(100vh - 66px)',
    [theme.breakpoints.down('sm')]: {
        display: 'block'
    }
}))


type Props = {
    children: any
}

export default function Layout({ children }: Props) {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const isSidebarOpen = useAppSelector((state) => state.MainReducer.isSidebarOpen)
    const [isRouteChange, setRouteChange] = React.useState<boolean>(false)
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
        if (isSidebarOpen) {
            dispatch(mainActions.setIsSideBarOpen(false))
        }
    }, [router.pathname])


    React.useEffect(() => {
        router.events.on('routeChangeStart', routeChangeStart)
        router.events.on('routeChangeComplete', routeChangeComplete)

        return () => {
            router.events.off('routeChangeStart', routeChangeStart)
            router.events.off('routeChangeComplete', routeChangeComplete)
        }
    }, [])


    function routeChangeStart() {
        setRouteChange(true)
    }
    function routeChangeComplete() {
        setRouteChange(false)
    }





    return (
        <Box>
            <Box>
                {isRouteChange && <LinearProgress />}
            </Box>
            <NavBar />
            <FlexContainer sx={{
                display: !isSidebarOpen ? 'flex' : 'block'
            }}>
                {!isSidebarOpen && (
                    <AsideNavbar />
                )}

                <Box
                    sx={{ flex: 1, transition: '0.3s all' }}
                    className="sideBarAnimated">
                    {children}
                </Box>
            </FlexContainer>
            <ReusablePopper />
            <DuplicateTestModal />
            <DeleteTestModal />
            <DeletePartcipantModal />
            <CartModal />
            <WishListModal />
            <SideBar />
        </Box>
    )
}