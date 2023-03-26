import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { chatActions } from '../../../reducers/chat-reducer';

export default function Header() {
    const dispatch = useAppDispatch()
    const isSideBarOpen = useAppSelector((state)=> state.ChatReducer.isSidebarOpen)
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" 
            color='default' sx={{bgcolor:'#fff',zIndex:60, boxShadow:'0 1px 3px 0 #ccc'}} elevation={0}>
                <Toolbar >
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => dispatch(chatActions.toggleSideBar(!isSideBarOpen))}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link href="/">
                            Laliga Stats
                        </Link>
                    </Typography>

                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
