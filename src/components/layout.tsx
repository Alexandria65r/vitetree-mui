import { Box } from '@mui/joy'
import React, { useCallback, useEffect } from 'react'
import NavBar from './navbar'
import _app from '../pages/_app'
import { useAppDispatch, useAppSelector, useSelectedWorkspace } from '../../store/hooks'
import { useRouter } from 'next/router'
import SideBar from './side-bar'
import { mainActions } from '../../reducers/main-reducer'
import { LinearProgress, styled, useMediaQuery, useTheme } from '@mui/material'
import AsideNavbar from './side-bar/closed-state-side-bar'
import { checkAuthThunk } from '../../reducers/auth-reducer/auth-thunks'
import Toast from './toasts/toast'
import ReusableModal from './modals/reusable-modal'
import ElementDetailsModal from './modals/element-details-modal'
import WorkSpaceForm from '../pages/workspace/workspace-form'
import BoardForm from '../pages/w/board-form'
import InvitePeopleModal from './modals/invite-people-modal'
import { fetchActiveWorkspaceBoardAndBoardData, fetchBoardsThunk } from '../../reducers/boards-reducer/boards-thunks'
import { fetchWorkspacesThunk } from '../../reducers/workspace-reducer/workspace-thunks'
import RenderSideBar from './side-bar/render-side-bar'
import BottomCardMenu from './menus/bottom-card-menu'

const FlexContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    width: '100%',
    gridTemplateColumns: 'repeat(2,1fr)',
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
    const [workspaceId, boardIdParam, boardId]: any = router.query.params || []
    const selectedWorkspace = useSelectedWorkspace()

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




    const loadData = useCallback(() => {
        if (router.pathname === '/w/[...params]') {
            dispatch(fetchActiveWorkspaceBoardAndBoardData(router.asPath))
        }
    }, [router.asPath])


    useEffect(() => {
        loadData()
    }, [router.asPath])


    const loadWorkspaces = useCallback(() => dispatch(fetchWorkspacesThunk()), [])

    useEffect(() => {
        loadWorkspaces()
    }, [])















    React.useEffect(() => {
        router.events.on('routeChangeStart', routeChangeStart)
        router.events.on('routeChangeComplete', routeChangeComplete)
        router.events.on('routeChangeError', routeChangeError)

        return () => {
            router.events.off('routeChangeStart', routeChangeStart)
            router.events.off('routeChangeComplete', routeChangeComplete)
            router.events.off('routeChangeError', routeChangeError)
        }
    }, [])


    function routeChangeStart() {
        setRouteChange(true)
    }
    function routeChangeComplete() {
        setRouteChange(false)
    }
    function routeChangeError() {
        router.reload()
    }


    return (
        <Box>
            <Box sx={{ width: '100%', position: 'absolute', top: 0, zIndex: 9999 }}>
                {isRouteChange && <LinearProgress />}
            </Box>
            {isMobile && router.pathname === '/w/[...params]' ? (
                <></>
            ) : <NavBar />}
            <Toast />
            <WorkSpaceForm />
            <BoardForm />
            <FlexContainer>
                <Box
                    sx={{
                        transition: '0.3s all',
                        [theme.breakpoints.down('sm')]: {
                            display: 'none'
                        },
                        //flexBasis:'1%',
                        [theme.breakpoints.up('md')]: {
                            flexBasis: isSidebarOpen ? '5%' : '28%',
                        },
                        [theme.breakpoints.up('xl')]: {
                            flexBasis: isSidebarOpen ? '4%' : '15%',
                        }
                    }}>
                    <RenderSideBar />
                </Box>
                <Box
                    sx={{ flexBasis: isSidebarOpen ? '96%' : '90%', transition: '0.3s all' }}
                    className="sideBarAnimated">
                    {children}
                </Box>
            </FlexContainer>
            <SideBar />
            <BottomCardMenu />
            <ReusableModal />
            <ElementDetailsModal />
            <InvitePeopleModal />
        </Box>
    )
}