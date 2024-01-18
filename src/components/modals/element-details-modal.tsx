import { Modal, Box, styled } from '@mui/material'
import React, { useEffect } from 'react'
import { useAppSelector, useSelectedBoard, useSelectedElement, useSelectedGroup, useSelectedWorkspace } from '../../../store/hooks'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { ThemedText, colorScheme } from '../../theme'
import { ButtonIcon } from '../../reusable/styles'
import CloseIcon from '@mui/icons-material/Close';
import ElementTreeItem from '../element-tree/element-tree-item'
import { mainActions } from '../../../reducers/main-reducer'
import WestIcon from '@mui/icons-material/West';
import { elementsActions } from '../../../reducers/elements-reducer'
import { listGroupActions } from '../../../reducers/list-group-reducer'




const Container = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100%',
    height: '100vh',
    backgroundColor: colorScheme(theme).primaryColor,
    [theme.breakpoints.down("sm")]: {
        width: '100%',
    },
    [theme.breakpoints.up("xl")]: {
        width: '60%',
    }
}))

const Header = styled(Box)(({ theme }) => ({
    height: 60,
    gap: 10,
    display: 'flex',
    alignItems: 'center',
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).darkGreyToSecondary}`,
    backgroundColor: colorScheme(theme).lightToSecondaryColor,
}))
const InnerWrapper = styled(Box)(({ theme }) => ({
    padding: 10,
    [theme.breakpoints.up('xl')]: {
        width: '30%'
    }
}))



type Props = {}

export default function ElementDetailsModal({ }: Props) {
    const router = useRouter()
    const open = Boolean(router.query.view)
    const dispatch = useDispatch()
    const id: any = router.query.view;
    const group = useSelectedGroup(id ?? '')
    const board = useSelectedBoard()
    const workspace = useSelectedWorkspace()



    function back() {
        router.replace(`/w/${workspace?._id ?? ''}/board/${board._id}`)
        dispatch(elementsActions.clearElementAction())
        dispatch(listGroupActions.clearGroupAction())
    }


    return (
        <Modal open={open} >
            <Container className='trans-from-right'>
                <Header>
                    <ButtonIcon onClick={back}>
                        <WestIcon sx={{ fontSize: 26 }} />
                    </ButtonIcon>
                    <ThemedText sx={{ fontSize: 16, fontWeight: 500 }}>Task Group Details</ThemedText>
                </Header>
                <InnerWrapper>
                    <ElementTreeItem group={group} parent='element-detail' />
                </InnerWrapper>
            </Container>
        </Modal>
    )
}       