import { Add } from '@mui/icons-material'
import { Box, styled, useTheme } from '@mui/material'
import React from 'react'
import { CSS_PROPERTIES } from '../../reusable'
import { normalizedDate } from '../../reusable/helpers'
import { StyledBox, TabButton } from '../../reusable/styles'
import { colorScheme } from '../../theme'
import RenderUpdate from '../editor/RenderUpdate'
import SlateEditor from '../editor/SlateEditor'
import ChatPersonInfo from '../user/chat-person-info'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Descendant } from 'slate'
import { createNewTaskUpdateThunk } from '../../../reducers/task-updtes-reducer/task-updates-thunks'



const MainColHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    height: 40,
    padding: '0 0px',
    marginBottom: 15,
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
    borderRadius: CSS_PROPERTIES.radius10,
    boxShadow: `0 1px solid 3px 0 ${colorScheme(theme).chatBoarderColor}`,
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : colorScheme(theme).secondaryColor
}))




type Props = {
    setShowUpdates: (bool: boolean) => void
}

export default function TaskUpdates({ setShowUpdates }: Props) {
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.AuthReducer.user)
    const task = useAppSelector((state) => state.TaskReducer.task)
    const updates = useAppSelector((state) => state.TaskUpdatesReducer.updates)
    const _theme = useTheme()

    function handleEditor(data: Descendant[]) {
        dispatch(createNewTaskUpdateThunk(data))
    }

    return (
        <>
            <MainColHeader>
                <TabButton onClick={() => setShowUpdates(false)}
                    sx={{
                        display: 'none',
                        [_theme.breakpoints.down('sm')]: {
                            display: 'flex'
                        }
                    }}
                >
                    <KeyboardBackspaceIcon sx={{ mr: .5 }} />
                    Back
                </TabButton>
                <TabButton>
                    <Add sx={{ mr: .5 }} />
                    Wirte an update
                </TabButton>
            </MainColHeader>

            <SlateEditor onValueUpdate={handleEditor} />
            {updates.map((update, index) => (
                <UpdateItem key={index}>
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
        </>
    )
}