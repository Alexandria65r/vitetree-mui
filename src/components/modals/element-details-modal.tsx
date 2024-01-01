import { Modal, Box, styled } from '@mui/material'
import React from 'react'
import { useAppSelector, useSelectedElement } from '../../../store/hooks'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { ThemedText, colorScheme } from '../../theme'
import { ButtonIcon } from '../../reusable/styles'
import CloseIcon from '@mui/icons-material/Close';
import ElementTreeItem from '../element-tree/element-tree-item'
import { mainActions } from '../../../reducers/main-reducer'
import WestIcon from '@mui/icons-material/West';




const Container = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100%',
    height: '100vh',
    backgroundColor: colorScheme(theme).primaryColor,
    [theme.breakpoints.down("sm")]: {
        width: '100%',
        top: 'unset',
        bottom: 0
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
    padding: 10
}))



type Props = {}

export default function ElementDetailsModal({ }: Props) {
    const router = useRouter()
    const open = Boolean(router.query.view)
    const dispatch = useDispatch()
    const id: any = router.query.view;
    const element = useSelectedElement(id ?? '')


    return (
        <Modal open={open} >
            <Container className='trans-from-right'>
                <Header>
                    <ButtonIcon onClick={() => router.push(`/tasks/vitetree/some-id`)}>
                        <WestIcon sx={{ fontSize: 26 }} />
                    </ButtonIcon>
                    <ThemedText sx={{ fontSize: 18, fontWeight: 600 }}>Task Group Details</ThemedText>
                </Header>
                <InnerWrapper>
                    <ElementTreeItem element={element} />
                </InnerWrapper>
            </Container>
        </Modal>
    )
}       