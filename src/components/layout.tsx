import { Box } from '@mui/joy'
import React from 'react'
import NavBar from './navbar'
import _app from '../pages/_app'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { useRouter } from 'next/router'
import ReusablePopper from './reusable-popper'
import DuplicateTestModal from './modals/duplicate-test-modal'
import DeleteTestModal from './modals/delete-test-modal'
import DeletePartcipantModal from './modals/delete-partcipant-modal'
import CartModal from './modals/cart-modal'
import WishListModal from './modals/wishlist-modal'
import SideBar from './side-bar'
import { mainActions } from '../../reducers'
import { LinearProgress, styled, useMediaQuery, useTheme } from '@mui/material'
import AsideNavbar from './aside-navbar'
import { checkAuthThunk } from '../../reducers/auth-reducer/auth-thunks'

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
    const theme = useTheme()
    const isMobile = useMediaQuery('(max-width:600px)')
    const checkAuth = React.useCallback(async () =>
        dispatch(checkAuthThunk()),
        [router.pathname])


    React.useEffect(() => {
        localStorage.removeItem('redirectFlag')
        checkAuth()
        if (isMobile) {
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
            <Box sx={{ width: '100%', position: 'absolute', top: 0, zIndex: 9999 }}>
                {isRouteChange && <LinearProgress />}
            </Box>
            <NavBar />
            <FlexContainer sx={{
                // display: !isSidebarOpen ? 'flex' : 'block',

            }}>
                <Box
                    sx={{
                        transition:'0.3s all',
                        display: router.pathname === '/' ? 'none' : 'block',
                        flexBasis: isSidebarOpen ? '5%' : '20%',
                        [theme.breakpoints.down('sm')]: {
                            display: 'none'
                        }
                    }}>
                 
                        <AsideNavbar />
                    
                </Box>

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