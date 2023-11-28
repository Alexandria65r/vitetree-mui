import { Box, styled, useMediaQuery, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { ThemedText, colorScheme } from '../../theme';
import { ButtonIcon, StyledButton } from '../../reusable/styles';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import CloseIcon from '@mui/icons-material/Close';
import { mainActions } from '../../../reducers/main-reducer';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import FontDownloadIcon from '@mui/icons-material/FontDownload';
import MicIcon from '@mui/icons-material/Mic';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';




const Menu = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    padding: 10,
    width: '20%',
    //height: 300,
    borderRadius: 10,
    backgroundColor: colorScheme(theme).lightToSecondaryColor,
    [theme.breakpoints.down('sm')]: {
        position: 'unset',
        width: '100%',
        transform: 'unset',
        backgroundColor: colorScheme(theme).lightToSecondaryColor,
    }
}))

const CardMenuHead = styled(Box)(({ theme }) => ({
    position: 'relative',
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent:'center',
    paddingInline: 12,
    //borderBottom: `1px solid ${colorScheme(theme).grayToSecondaryColor}`,
    [theme.breakpoints.down('sm')]: {
        display: 'none'
    }
}))
const CloseButton = styled(ButtonIcon)(({ theme }) => ({
    position: 'absolute', top: 7, right: 1, height: '35px', width: '35px'

}))

const MenuBody = styled(Box)(({ theme }) => ({

    [theme.breakpoints.down('sm')]: {

    }
}))
const CreateContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
    // borderBottom: `1px solid ${colorScheme(theme).grayToSecondaryColor}`,
    [theme.breakpoints.down('sm')]: {

    }
}))

const SectionHeader = styled(Box)(({ theme }) => ({
    padding: 10,
    marginBottom: 10,
    borderBottom: `1px solid ${colorScheme(theme).greyToTertiary}`,
    [theme.breakpoints.down('sm')]: {

    }
}))
const MenuItemButton = styled(StyledButton)(({ theme }) => ({
    justifyContent: 'center',
    backgroundColor: 'transparent',
    color: colorScheme(theme).TextColor,
    fontSize: 16,
    height:60,
    width:60,
    '&:hover': {
        backgroundColor: colorScheme(theme).grayToprimaryColor,
    },
    [theme.breakpoints.up("sm")]: {
        fontSize: 15,
    }
}))

type Props = {


}

function PageMoreOptionsMenu({ }: Props) {
    const dispatch = useAppDispatch()
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



    function handleClose() {
        dispatch(mainActions.setModal({ component: '' }))
    }



    return (

        <Menu>
            <CardMenuHead>
                <ThemedText sx={{ fontSize: 18, fontWeight: 700}}>
                Options
                </ThemedText>
                <CloseButton onClick={handleClose}>
                    <CloseIcon />
                </CloseButton>
            </CardMenuHead>

            <MenuBody>
                <CreateContainer>
                    <SectionHeader sx={{ flexBasis: '100%', }} >
                        <ThemedText sx={{ fontSize: 15, fontWeight: 500 }}>Create</ThemedText>
                    </SectionHeader>


                    <MenuItemButton>
                        <Box>
                            <SmartDisplayIcon />
                            <ThemedText sx={{fontSize:14}}>Video</ThemedText>
                        </Box>

                    </MenuItemButton>
                    <MenuItemButton >
                        <Box>
                            <MicIcon />
                            <ThemedText sx={{fontSize:14}}>Audio</ThemedText>
                        </Box>
                    </MenuItemButton>
                    <MenuItemButton>
                        <Box>
                            <FontDownloadIcon />
                            <ThemedText sx={{fontSize:14}}>Text</ThemedText>
                        </Box>
                    </MenuItemButton>

                </CreateContainer>


                <CreateContainer>
                    <SectionHeader sx={{ flexBasis: '100%', }} >
                        <ThemedText sx={{ fontSize: 15, fontWeight: 500 }}>Payouts</ThemedText>
                    </SectionHeader>
                    <MenuItemButton>
                        <Box>
                            <AccountBalanceWalletIcon />
                            <ThemedText sx={{fontSize:14}}>Payout</ThemedText>
                        </Box>
                    </MenuItemButton>
                    
                </CreateContainer>
            </MenuBody>
        </Menu>
    )
}






export default PageMoreOptionsMenu