import { Modal, Box, styled, useMediaQuery } from '@mui/material'
import React from 'react'
import { useAppSelector, useSelectedBoard, useSelectedGroup } from '../../../store/hooks'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { ThemedText, colorScheme } from '../../theme'
import { ButtonIcon } from '../../reusable/styles'
import { workspaceActions } from '../../../reducers/workspace-reducer'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { elementsActions } from '../../../reducers/elements-reducer'



const Container = styled(Box)(({ theme }) => ({
    position: 'absolute',

    width: '40%',
    height: 600,
    borderRadius: 19,
    border: `1px solid ${colorScheme(theme).lightToTertiary}`,
    backgroundColor: colorScheme(theme).primaryColor,
    [theme.breakpoints.down("sm")]: {
        width: '100%',
        height: '100dvh',
        border: 0,
    },
    [theme.breakpoints.up("md")]: {
        width: '53%',
    },
    [theme.breakpoints.up("xl")]: {
        width: '50%',
    }
}))

const Header = styled(Box)(({ theme }) => ({
    height: 60,
    gap: 10,
    display: 'flex',
    alignItems: 'center',
    paddingInline: 10,
    borderTopLeftRadius: 19,
    borderTopRightRadius: 19,
    // boxShadow: `0 1px 3px 0 ${colorScheme(theme).darkGreyToSecondary}`,
    //backgroundColor: colorScheme(theme).lightToSecondaryColor,
}))
const InnerWrapper = styled(Box)(({ theme }) => ({
    padding: 10,
    [theme.breakpoints.up('xl')]: {
        width: '30%'
    }
}))



type Props = {}

export default function ElementDetailModal({ }: Props) {
    const router = useRouter()
    const dispatch = useDispatch()
    const id: any = router.query.view;
    const elementAction = useAppSelector((state) => state.ElementsReducer.elementAction)
    const selectedElementId = useAppSelector((state) => state.ElementsReducer.selectedElementId)
    const isInvitePeopleModalOpen = useAppSelector((state) => state.WorkspaceReducer.isInvitePeopleModalOpen)
    const group = useSelectedGroup(id ?? '')
    const board = useSelectedBoard()
    const isMobile = useMediaQuery('(max-width:600px)')

    const open = Boolean(selectedElementId)


    function close() {
        dispatch(elementsActions.setSelectedElementId(''))
    }


    return (
        <Modal
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            open={open}
            onClose={close}>
            <Container className={isMobile ? 'trans-from-right' : ''}>
                <Header>
                    <ThemedText sx={{ flex: 1, fontSize: 18, fontWeight: 600 }}>Task Info</ThemedText>
                    <ButtonIcon onClick={close}>
                        <CloseOutlinedIcon sx={{ fontSize: 26 }} />
                    </ButtonIcon>
                </Header>

            </Container>
        </Modal>
    )
}       