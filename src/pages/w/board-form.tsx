import { Box, MenuItem, Select, TextField, colors, styled } from '@mui/material'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { ThemedText, colorScheme } from '../../theme'
import { ButtonIcon, StyledButton, Textarea } from '../../reusable/styles'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useRouter } from 'next/router'
import Link from 'next/link'
import { boardActions } from '../../../reducers/boards-reducer'
import { createBoardThunk, updateBoardThunk } from '../../../reducers/boards-reducer/boards-thunks'
import { AppSpinner } from '../../components/activity-indicators'





const BoardModal = styled(Box)(({ theme }) => ({
    position: 'fixed',
    width: '100%',
    height: '100vh',
    display: 'flex',
    left: 0,
    top: 0,
    zIndex: 300,
    backgroundColor: '#0000000f'
}))
const Header = styled(Box)(({ theme }) => ({
    flex: 2,
    flexBasis: '100%',
    display: 'flex',
    alignItems: 'center',
    height: 65,
    paddingBlock: 10,
    paddingInline: 10,
    borderBottom: `1px solid ${colorScheme(theme).greyToTertiary}`,
    [theme.breakpoints.down('sm')]: {
        paddingBlock: 10,
        height: 56,
    }
}))
const FormContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    width: '20%',
    // height: '100vh',
    backgroundColor: colorScheme(theme).lightToSecondaryColor,
    boxShadow: `0px 1px 3px 0 ${colorScheme(theme).quaternay}`,
    [theme.breakpoints.down('sm')]: {
        width: '100%',
    },
    [theme.breakpoints.up('md')]: {
        width: '30%',
    },
    [theme.breakpoints.up('xl')]: {
        width: '20%',
    }
}))

const TextInput = styled(TextField)(() => ({
    width: '100%'
}))
const FormControl = styled(Box)(() => ({
    marginBlock: 10
}))
const Footer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    flexBasis: '100%',
    alignSelf: 'flex-end',
    height: 90,
    padding: 10,
    boxShadow: `0 -1px 12px ${colorScheme(theme).quaternay}`,
    borderTop: `1px solid ${colorScheme(theme).grayToSecondaryColor}`,
    [theme.breakpoints.down('sm')]: {
        height: 80
    }
}))


type Props = {}

export default function BoardForm({ }: Props) {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.AuthReducer.user)
    const workspace = useAppSelector((state) => state.WorkspaceReducer.workspace)
    const workspaces = useAppSelector((state) => state.WorkspaceReducer.workspaces)
    const selectedWorkspace = useAppSelector((state) => state.WorkspaceReducer.selectedWorkspace)
    const board = useAppSelector((state) => state.BoardReducer.board)
    const boardNetworkStatus = useAppSelector((state) => state.BoardReducer.boardNetworkStatus)
    const isFormOpen = useAppSelector((state) => state.BoardReducer.isFormOpen)
    const [boardId, ...params]: any = router.query.params || []
    const isUpdate = params.includes('update')

    console.log(params)

    function handleInputChange({ target }: any) {
        dispatch(boardActions.setBoardData({ ...board, [target.name]: target.value }))
        console.log(target.value)
    }


    function handleClose() {
        if (boardId === 'create') {
            router.push('/find-creators/q=nothing')
        } else if (isUpdate) {
            router.back()
        } else {
            router.push(`/board/${boardId}`)
        }
    }

    function handleOnClick() {
        if (isUpdate) {
            dispatch(updateBoardThunk({ boardId, target: 'other', update: { board } }))
        } else {
            dispatch(createBoardThunk())
        }
    }

    if (!isFormOpen) return null
    return (
        <BoardModal >
            <FormContainer className='workspaceModalIn'>
                <Header>
                    <ButtonIcon onClick={() => dispatch(boardActions.setIsFormOpen(false))}
                        sx={(theme) => ({ backgroundColor: colorScheme(theme).grayToSecondaryColor })}
                    >
                        <CloseOutlinedIcon />
                    </ButtonIcon>
                    <Link href={`/`}>
                        <ThemedText
                            sx={{
                                ml: 2,
                                fontSize: 22,
                                fontWeight: 600,
                                flexGrow: 1, color: colors.teal[400]
                            }}>
                            Vitetree
                        </ThemedText>

                    </Link>
                </Header>
                <Box sx={{ width: '100%', height: 'calc(100% - 160px)', padding: 2 }}>
                    <ThemedText
                        sx={{
                            fontSize: 20,
                            fontWeight: 600,
                        }}>
                        Create a Board
                    </ThemedText>
                    <FormControl>
                        <TextInput value={board.name} name="name" onChange={handleInputChange} placeholder='Board name' label='Board name' />
                        <ThemedText sx={{ fontSize: 13, my: 1, lineHeight: 1.2 }}>
                            Give it a name that describes the goal or purpose of this board.
                        </ThemedText>
                    </FormControl>
                    <FormControl>
                        <Select value={board.workspaceId} fullWidth onChange={handleInputChange}
                            name='workspaceId' >
                            <MenuItem value="Choose Workspace">Choose Workspace</MenuItem>
                            {workspaces.map((workspace) => (
                                <MenuItem selected={workspace?._id === selectedWorkspace._id} key={workspace?._id}
                                    sx={{ textTransform: 'capitalize' }} value={workspace._id}>
                                    {workspace.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <ThemedText sx={{ fontSize: 13, my: 1, lineHeight: 1.2 }}>
                           Choose a workspace.
                        </ThemedText>
                    </FormControl>
                    <FormControl>
                        <Textarea value={board.description} name="description" onChange={handleInputChange}
                            sx={{ width: '100%', borderRadius: 1 }} minRows={5} placeholder='Description of the Board' />
                        <ThemedText sx={{ fontSize: 13, my: 1, lineHeight: 1.2 }}>
                            What is this board all about.
                        </ThemedText>
                    </FormControl>
                </Box>
                <Footer>
                    <StyledButton onClick={handleOnClick} sx={{ flex: 1, fontWeight: 600 }}>
                        {isUpdate ? 'Update Board' : boardNetworkStatus === 'creating' ? 'Creating Board...' : '  Create Board'}
                        {boardNetworkStatus === 'creating' && <AppSpinner visible={true} size={20} />}
                    </StyledButton>
                </Footer>
            </FormContainer>

        </BoardModal>
    )
}