import * as React from 'react';
import AppNavigationBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { ButtonIcon } from '../reusable/styles';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { Theme, colors, styled, useTheme } from '@mui/material';
import { ColorModeContext, colorScheme, isDarkMode } from '../theme';




const AppBar = styled(AppNavigationBar)(({ theme }) => ({
    //  boxShadow: `0 1px 3px 0 ${isDarkMode(theme) ? colors.grey[800] :'transparent'}`,
    borderBottom: `1px solid ${colorScheme(theme).secondaryColor}`,
    backgroundColor:  colorScheme(theme).primaryToGrey100Color,
}))

export default function NavBar() {
    const theme = useTheme()
    const { toggleColorMode } = React.useContext(ColorModeContext)
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color='default' elevation={0}>
                <Toolbar >
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link href="/">
                            Meetberi
                        </Link>
                    </Typography>

                    <ButtonIcon onClick={toggleColorMode}>
                        {theme.palette.mode === 'light' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
                    </ButtonIcon>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
