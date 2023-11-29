import { Box, Modal, hexToRgb, styled, useMediaQuery } from '@mui/material'
import React from 'react'
import { ThemedText, colorScheme } from '../../theme'
import IntractionMenu from '../account/interaction-popper/interaction-menu'
import { ButtonIcon } from '../../reusable/styles'
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { mainActions } from '../../../reducers/main-reducer'
import PageMoreOptionsMenu from '../creator-page/page-more-options-menu'
import ReadOnlyMoreOptionsMenu from '../creator-page/read-only-more-options-menu'

const Container = styled(Modal)(({ theme }) => ({
    display: 'flex',
    alignItems: 'flex-end',
}))
const CardMenu = styled(Box)(({ theme }) => ({
    flex: 1,
    minHeight: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: colorScheme(theme).lightToSecondaryColor
}))
const CardMenuHead = styled(Box)(({ theme }) => ({
    position: 'relative',
    height: 50,
    display: 'flex',
    alignItems: 'center',
    paddingInline: 12,
    //borderBottom: `1px solid ${colorScheme(theme).grayToSecondaryColor}`
}))



type Props = {}

export default function BottomCardMenu({ }: Props) {
    const isMobile = useMediaQuery('(max-width:600px)')
    const dispatch = useAppDispatch()
    const cardMenu = useAppSelector((state) => state.MainReducer.cardMenu)
    function handleClose() {
        dispatch(mainActions.setCardMenu({ component: '',title:'' }))
    }
    if (!cardMenu.component || !isMobile) return null
    return (
        <Container open={cardMenu.component && isMobile} onClose={handleClose}>
            <CardMenu className='trans-from-bottom'>
                <CardMenuHead >
                    <ThemedText sx={{ fontSize: 18, fontWeight: 600 }}>{cardMenu.title}</ThemedText>
                    <ButtonIcon onClick={handleClose}
                        sx={{ position: 'absolute', top: 7, right: 1, height: '35px', width: '35px' }}>
                        <CloseIcon />
                    </ButtonIcon>
                </CardMenuHead>
                {cardMenu.component === 'account-menu' && <IntractionMenu />}
                {cardMenu.component === 'page-more-options-menu' && <PageMoreOptionsMenu />}
                {cardMenu.component === 'read-only-more-options-menu' && <ReadOnlyMoreOptionsMenu />}
            </CardMenu>
        </Container>
    )
}