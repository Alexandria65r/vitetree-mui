import * as React from 'react';
import AppNavigationBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { chatActions } from '../../../reducers/chat-reducer';
import { ButtonBase, colors, styled } from '@mui/material';
import { borderRadius } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, ButtonIcon } from '../../reusable/styles';
import { isDarkMode, colorScheme, ColorModeContext } from '../../theme';

import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';


const AppBar = styled(AppNavigationBar)(({ theme }) => ({
    zIndex: 60,
    // boxShadow: `0 1px 3px 0 ${colorScheme(theme).borderColor}`,
    borderBottom: `1px solid ${colorScheme(theme).borderColor} `,
    backgroundColor: colorScheme(theme).primaryColor,
}))

const ChatNameCol = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    marginLeft: 10
}))
const Text = styled(Typography)(({ theme }) => ({
    lineHeight: 1.2
}))


const ActiveStatus = styled(Box)(({ theme }) => ({
    width: 10,
    height: 10,
    margin: '0 5px',
    borderRadius: '50%',
    backgroundColor: theme.palette.success.light
}))



export default function Header() {
    const { toggleColorMode } = React.useContext(ColorModeContext)
    const dispatch = useAppDispatch()
    const isSideBarOpen = useAppSelector((state) => state.ChatReducer.isSidebarOpen)
    const theme = useTheme()
    return (

        <AppBar position="absolute" color='default' elevation={0}>
            <Toolbar >
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={(theme) => ({
                        mr: 2,
                        [theme.breakpoints.down("sm")]: {
                            mr: 0
                        }
                    })}
                    onClick={() => dispatch(chatActions.toggleSideBar(!isSideBarOpen))}
                >
                    <MenuIcon />
                </IconButton>

                <Avatar></Avatar>
                <ChatNameCol>
                    <Text sx={{ fontWeight: 400, mt: 1 }}>
                        Laliga Stats
                    </Text>
                    <Text sx={{ display: 'flex', alignItems: 'center', fontSize: 13 }}>
                        <ActiveStatus /> Active now
                    </Text>
                </ChatNameCol>

                <ButtonIcon>
                    <SearchIcon />
                </ButtonIcon>
                <ButtonIcon onClick={toggleColorMode}>
                    {theme.palette.mode === 'light' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
                </ButtonIcon>
            </Toolbar>
        </AppBar>

    );
}
