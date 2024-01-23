import * as React from 'react';
import AppNavigationBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { ButtonIcon } from '../reusable/styles';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { ButtonBase, colors, styled, useMediaQuery, useTheme } from '@mui/material';
import { ColorModeContext, colorScheme, isDarkMode } from '../theme';
import { CSS_PROPERTIES } from '../reusable';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { mainActions } from '../../reducers/main-reducer';



import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';



const Button = styled(ButtonBase)(({ theme }) => ({
    padding: '8px 15px',
    color: colorScheme(theme).TextColor,
    margin: '0 5px',
    fontSize: 14,
    fontWeight: 500,
    border: `1px solid ${colors.teal[400]}`,
    borderRadius: CSS_PROPERTIES.radius5,
    backgroundColor: colors.teal[400]
}))

const AppBar = styled(AppNavigationBar)(({ theme }) => ({
    height:55,
    justifyContent:'center',
    //boxShadow: `0 1px 3px 0 ${isDarkMode(theme) ? colors.grey[800] :'transparent'}`,
    borderBottom: `1px solid ${colorScheme(theme).grayToSecondaryColor}`,
    backgroundColor: colorScheme(theme).lightToprimaryColor,
    display:'none',
    [theme.breakpoints.down('sm')]: {
        display:'flex'
    }
}))


export default function NavBar() {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const theme = useTheme()
    const user = useAppSelector((state) => state.AuthReducer.user)
    const { toggleColorMode } = React.useContext(ColorModeContext)
    const isMobile = useMediaQuery('(max-width:600px)')
    const isSidebarOpen = useAppSelector((state) => state.MainReducer.isSidebarOpen)
    function toggleSideBar() {
        dispatch(mainActions.setIsSideBarOpen(!isSidebarOpen))
    }




    return (
        <Box sx={{ flexGrow: 1, position: 'relative' }}>
            <AppBar position="static" color='default' elevation={0}>
                <Toolbar >

                    <IconButton
                        onClick={toggleSideBar}
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        {!isSidebarOpen ? <MenuOpenIcon /> : <MenuIcon />}
                    </IconButton>


                    <Typography
                        sx={{
                            fontSize: 22,
                            textAlign: isMobile ? 'center' : 'left',
                            fontWeight: 600,
                            flexGrow: 1, color: colors.teal[400]
                        }}>
                        <Link href={'/'}>
                            Vitetree
                        </Link>
                    </Typography>

                    {!isMobile && user?._id && (<>
                        <ButtonIcon onClick={() => router.push('/conversations/conv-list')} sx={{ position: 'relative' }}>
                            <ChatOutlinedIcon />
                        </ButtonIcon>
                        <ButtonIcon
                            onClick={() => router.push('/notifications/noti-list')}
                            sx={{ position: 'relative' }}>
                            <NotificationsNoneIcon />
                        </ButtonIcon>
                    </>)}
                    <ButtonIcon onClick={toggleColorMode}>
                        {theme.palette.mode === 'light' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
                    </ButtonIcon>
                    {!isMobile && !user?._id ? (
                        <Button onClick={() => router.push('/signin')} sx={{
                            backgroundColor: 'transparent',

                        }}>Signin</Button>
                    ) : <></>}

                    {!isMobile && !user?._id ? (
                        <Button sx={() => ({
                            color: '#fff'
                        })} onClick={() => router.push('/signup')}>
                            Signup
                        </Button>
                    ) : <></>}
                </Toolbar>
            </AppBar>
        </Box >
    );
}
