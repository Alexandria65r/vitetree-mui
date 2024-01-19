import { Modal, Box, styled, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import { useAppSelector, useSelectedBoard, useSelectedGroup } from '../../../store/hooks'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { ThemedText, colorScheme, useColorScheme } from '../../theme'
import { ButtonIcon, StyledBox, StyledButton } from '../../reusable/styles'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { elementsActions } from '../../../reducers/elements-reducer'
import GroupedSubItem from '../element-tree/grouped-sub-item'
import ElementCellHeader from '../element-tree/element-cell-header'
import SlateEditor from '../editor/SlateEditor'
import { Descendant } from 'slate'
import RenderUpdate from '../editor/RenderUpdate'
import { createNewTaskUpdateThunk } from '../../../reducers/task-updates-reducer/task-updates-thunks'
import { normalizedDate } from '../../reusable/helpers'
import ChatPersonInfo from '../user/chat-person-info'
import { Add } from '@mui/icons-material'



const Container = styled(Box)(({ theme }) => ({
    width: '40%',
    height: 600,
    borderRadius: 19,
    border: `1px solid ${colorScheme(theme).lightToTertiary}`,
    backgroundColor: colorScheme(theme).lightToSecondaryColor,
    [theme.breakpoints.down("sm")]: {
        width: '100%',
        height: '100dvh',
        border: 0,
        borderRadius: 0,
    },
    [theme.breakpoints.up("md")]: {
        width: '53%',
    },
    [theme.breakpoints.up("xl")]: {
        width: '50%',
    }
}))

const Header = styled(Box)(({ theme }) => ({
    height: 50,
    gap: 10,
    display: 'flex',
    alignItems: 'center',
    paddingInline: 10,
    borderTopLeftRadius: 19,
    borderTopRightRadius: 19,
    // boxShadow: `0 1px 3px 0 ${colorScheme(theme).darkGreyToSecondary}`,
    //backgroundColor: colorScheme(theme).lightToSecondaryColor,
    borderBottom: `1px solid ${colorScheme(theme).greyToTertiary}`,
}))
const InnerWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    [theme.breakpoints.down('sm')]: {

    }
}))
const TaskCol = styled(Box)(({ theme }) => ({
    flex: 1,
    borderRight: `1px solid ${colorScheme(theme).greyToTertiary}`,
    [theme.breakpoints.down('sm')]: {
        flexBasis: '100%',

    }
}))
const ElementCellHeaderWrapper = styled(Box)(({ theme }) => ({
    padding: 8,
    borderBottom: `1px solid ${colorScheme(theme).greyToTertiary}`,
    [theme.breakpoints.up('xl')]: {
    }
}))


const UpdatesCol = styled(Box)(({ theme }) => ({
    height: 'calc(600px - 60px)',
    overflow: 'auto',
    flex: 1,
    [theme.breakpoints.down('sm')]: {
        height: 'auto',
        flexBasis: '100%'
    }
}))


const UpdateHeader = styled(Box)(({ theme }) => ({
    height: 40,
    padding: '0 10px',
    marginBottom: 15,
}))


const UpdateItem = styled(StyledBox)(({ theme }) => ({
    minHeight: 100,
    padding: 10,
    marginBottom: 15,
    borderRadius: 10,
    boxShadow: `0 1px solid 3px 0 ${colorScheme(theme).chatBoarderColor}`,
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : colorScheme(theme).secondaryColor,
    [theme.breakpoints.down('sm')]: {
        padding: '8px 10px',
    }

}))



type Props = {}

export default function ElementDetailModal({ }: Props) {
    const router = useRouter()
    const dispatch = useDispatch()
    const id: any = router.query.view;
    const user = useAppSelector((state) => state.AuthReducer.user)
    const elementAction = useAppSelector((state) => state.ElementsReducer.elementAction)
    const selectedElementId = useAppSelector((state) => state.ElementsReducer.selectedElementId)
    const isInvitePeopleModalOpen = useAppSelector((state) => state.WorkspaceReducer.isInvitePeopleModalOpen)
    const group = useSelectedGroup(id ?? '')
    const board = useSelectedBoard()
    const isMobile = useMediaQuery('(max-width:600px)')
    const _colorScheme = useColorScheme()
    const open = Boolean(selectedElementId)
    const updates = useAppSelector((state) => state.TaskUpdatesReducer.updates)

    const _theme = useTheme()

    function close() {
        dispatch(elementsActions.setSelectedElementId(''))
    }


    function onValueUpdate(value: Descendant[]) {
        dispatch(createNewTaskUpdateThunk(value))
    }

    return (
        <Modal
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            open={open}
            onClose={close}>
            <Container className={isMobile ? 'trans-from-right' : ''}>
                <Header>
                    <ThemedText sx={{ flex: 1, fontSize: 18, fontWeight: 600 }}>Task Details</ThemedText>
                    <ButtonIcon onClick={close}>
                        <CloseOutlinedIcon sx={{ fontSize: 26 }} />
                    </ButtonIcon>
                </Header>
                <InnerWrapper>
                    <TaskCol>
                        <ElementCellHeaderWrapper>
                            <ElementCellHeader id={selectedElementId} avataSize={32} color={group?.color ?? ''} pickerBtnStyles={{ height: 30, borderRadius: 1.5 }} />
                        </ElementCellHeaderWrapper>
                        <GroupedSubItem
                            id={selectedElementId}
                            parent={'element-detail'}
                            elemetStyles={{
                                borderRadius: 0,
                                boxShadow: 0,
                                '&:hover': { transform: 'scale(1)' },
                                borderBottom: `1px solid ${_colorScheme.greyToTertiary}`,
                            }} />
                    </TaskCol>
                    <UpdatesCol>
                        <ElementCellHeaderWrapper sx={{
                            display: 'flex', alignItems: 'center',
                        }}>
                            <ThemedText sx={{ flex: 1, fontSize: 16, fontWeight: 600 }}>Item Updates</ThemedText>
                            <StyledButton
                                onClick={() => dispatch(elementsActions.setElementAction({ action: 'show-element-update-edittor' }))}
                                sx={{ height: 35, fontSize: 14 }}>
                                <Add /> New Update
                            </StyledButton>
                        </ElementCellHeaderWrapper>
                        <Box sx={{ padding: 1.5 }}>
                            {elementAction.action === 'show-element-update-edittor' && (
                                <SlateEditor onValueUpdate={onValueUpdate} onCancel={() => dispatch(elementsActions.clearElementAction())} />
                            )}
                            {updates.map((update) => (
                                <UpdateItem key={update._id}>
                                    <UpdateHeader>
                                        <ChatPersonInfo
                                            userId={update.author.id}
                                            fullname={`${user._id === update.author.id ? '(You)' : ''}${update.author.userName}`}
                                            fullnameStyles={{ fontSize: 14, lineHeight: 1.2, }}
                                            subText={normalizedDate(update.createdAt)}
                                            avatarSize={45}
                                            indicatorStyles={{ position: 'absolute', left: 30, bottom: 0 }} />
                                    </UpdateHeader>
                                    <RenderUpdate update={update.data} />
                                </UpdateItem>
                            ))}

                        </Box>
                    </UpdatesCol>
                </InnerWrapper>
            </Container>
        </Modal>
    )
}       