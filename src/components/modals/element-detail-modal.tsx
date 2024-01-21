import { Modal, Box, styled, useMediaQuery, useTheme, Tooltip, colors } from '@mui/material'
import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import { useAppSelector, useElementAction, useSelectedBoard, useSelectedElement, useSelectedGroup } from '../../../store/hooks'
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
import { Add, Edit } from '@mui/icons-material'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { mainActions } from '../../../reducers/main-reducer'
import { BiDuplicate } from 'react-icons/bi'
import { MdContentCopy } from 'react-icons/md'
import { ImMoveUp } from 'react-icons/im'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { updateElementThunk } from '../../../reducers/elements-reducer/elements-thunks'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { createToastThunk } from '../../../reducers/main-reducer/main-thunks'



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



const MoreActions = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    gap: 10,
    padding: 10,
    borderBottom: `1px solid ${colorScheme(theme).greyToTertiary}`,
}))
const IconButton = styled(ButtonIcon)(({ theme }) => ({
    height: 40,
    width: 40,
    border: `1px solid ${colorScheme(theme).greyToTertiary}`,
    '&:hover': {
        backgroundColor: colorScheme(theme).greyToTertiary
    }
}))


type Props = {}

export default function ElementDetailModal({ }: Props) {
    const router = useRouter()
    const dispatch = useDispatch()
    const user = useAppSelector((state) => state.AuthReducer.user)
    const elementAction = useAppSelector((state) => state.ElementsReducer.elementAction)
    const selectedElementId = useAppSelector((state) => state.ElementsReducer.selectedElementId)
    const element = useSelectedElement(selectedElementId)
    const group = useSelectedGroup(element?.groupId ?? '')
    const isMobile = useMediaQuery('(max-width:600px)')
    const _colorScheme = useColorScheme()
    const open = Boolean(selectedElementId)
    const updates = useAppSelector((state) => state.TaskUpdatesReducer.updates)
    const isSubEditting = useElementAction({ action: 'edit-sub-element', elementId: selectedElementId })
    const _theme = useTheme()
    const subElRef: MutableRefObject<HTMLDivElement | any> = useRef()
    const [isCopied, setCopy] = useState(false)

    useEffect(() => {
        if (isCopied) {
            dispatch(createToastThunk('Text Copied🎉'))
            setTimeout(() => setCopy(false), 1000)
        }
    }, [isCopied])

    function handleEdit() {
        if (!isSubEditting) {
            dispatch(elementsActions.setElementAction({
                elementId: selectedElementId,
                action: 'edit-sub-element'
            }))

        } else {
            dispatch(updateElementThunk({
                elementId: selectedElementId, update: {
                    key: 'name',
                    value: subElRef.current.innerText
                }
            }))
            dispatch(elementsActions.clearElementAction())
        }
    }



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
                            <ElementCellHeader
                                id={selectedElementId} avataSize={32}
                                color={group?.color ?? ''}
                                pickerBtnStyles={{ height: 30, borderRadius: 1.5 }} />
                        </ElementCellHeaderWrapper>
                        <GroupedSubItem
                            subElRef={subElRef}
                            id={selectedElementId}
                            parent={'element-detail'}
                            elemetStyles={{
                                width: '100%',
                                borderRadius: 0,
                                boxShadow: 0,
                                '&:hover': { transform: 'scale(1)' },
                                borderBottom: `1px solid ${_colorScheme.greyToTertiary}`,
                            }} />
                        <MoreActions>
                            <Tooltip title='Edit'>
                                <IconButton
                                    onClick={handleEdit}
                                >
                                    {elementAction.action === 'edit-sub-element' ?
                                        <CheckOutlinedIcon sx={{ fontSize: 20, color: colors.green[400] }} />
                                        : <Edit sx={{ fontSize: 20 }} />}
                                </IconButton>
                            </Tooltip>

                            <Tooltip title='Duplicate'>
                                <IconButton>
                                    <BiDuplicate style={{ fontSize: 16 }} />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title='Move To'>
                                <IconButton>
                                    <ImMoveUp style={{ fontSize: 16 }} />
                                </IconButton>
                            </Tooltip>

                            <CopyToClipboard text={element.name} onCopy={() => setCopy(true)}>
                                <Tooltip title='Copt Text' >
                                    <IconButton>
                                        {isCopied ? <CheckOutlinedIcon sx={{ fontSize: 20, color: colors.green[400] }} /> : <MdContentCopy style={{ fontSize: 16 }} />}
                                    </IconButton>
                                </Tooltip>
                            </CopyToClipboard>


                            <Tooltip title='Delete'>
                                <IconButton onClick={() => dispatch(mainActions.setModal({
                                    component: 'delete-element-item',
                                    itemId: selectedElementId,
                                    itemType: 'list-group-element'
                                }))}>
                                    <DeleteOutlinedIcon sx={{ fontSize: 20 }} />
                                </IconButton>
                            </Tooltip>

                        </MoreActions>
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