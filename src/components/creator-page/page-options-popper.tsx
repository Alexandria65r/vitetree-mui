import { Box, Popper, colors, styled, useMediaQuery, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { colorScheme } from '../../theme';
import { StyledButton } from '../../reusable/styles';
import { useAppSelector } from '../../../store/hooks';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const MenuItemButton = styled(StyledButton)(({ theme }) => ({
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    color: colorScheme(theme).TextColor,
    fontSize: 16,
    '&:hover': {
        backgroundColor: colorScheme(theme).grayToprimaryColor,
    },
    [theme.breakpoints.up("sm")]: {
        fontSize: 15,
    }
}))

const Menu = styled(Box)(({ theme }) => ({
    padding: 10,
    backgroundColor: colorScheme(theme).grayToSecondaryColor
}))


type Props = {


}

function PageOptionsPopper({ }: Props) {
    const isMobile = useMediaQuery('(max-width:600px)')
    const _theme = useTheme()
    const isSidebarOpen = useAppSelector((state) => state.MainReducer.isSidebarOpen)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl);


    function togglePopper(event: React.MouseEvent<HTMLButtonElement>) {
        setAnchorEl(anchorEl ? null : event.currentTarget)
    }
    function openCardMenu() {

    }



    const id = open ? 'page-options-menu' : undefined

    return (


        <Box >
            <StyledButton onClick={togglePopper} sx={{ flexBasis: '70%', fontWeight: 700, borderBottom: `0 px solid ${colors.teal[500]}` }}>
                more options <KeyboardArrowDownIcon sx={{ ml: 1 }} />
            </StyledButton>

            <Popper sx={{width:'8%'}} open={open} id={id} anchorEl={anchorEl} placement='bottom'>
                <Menu>
                    <MenuItemButton sx={{width:'100%'}}>
                        create
                    </MenuItemButton>
                </Menu>
            </Popper>

        </Box>
    )
}






export default PageOptionsPopper