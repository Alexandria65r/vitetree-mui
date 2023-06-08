import { Add } from '@mui/icons-material'
import { Box, colors, styled, useTheme } from '@mui/material'
import React, { useCallback, useEffect } from 'react'
import { CSS_PROPERTIES } from '../../reusable'
import { normalizedDate } from '../../reusable/helpers'
import { ButtonIcon, StyledBox, TabButton } from '../../reusable/styles'
import { colorScheme } from '../../theme'
import RenderUpdate from '../editor/RenderUpdate'
import SlateEditor from '../editor/SlateEditor'
import ChatPersonInfo from '../user/chat-person-info'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Descendant } from 'slate'
import { createNewTaskUpdateThunk } from '../../../reducers/task-updtes-reducer/task-updates-thunks'
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/router'
import { createAcademicAnswerThunk, fetchAcademicAnswersThunk } from '../../../reducers/academic-answers-reducer/academic-answers-thunks'
import { BiDownvote, BiUpvote } from 'react-icons/bi'


const MainColHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    height: 40,
    padding: '0 0px',
    marginBottom: 15,
}))
const UpdateHeader = styled(Box)(({ theme }) => ({
    height: 40,
    padding: '10px',
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

const ItemFooter = styled(Box)(({ theme }) => ({
    padding: 6,
    marginTop: 6,
    borderTop: `1px solid ${colors.grey[300]}`,
}))
const VoteButton = styled(ButtonIcon)(({ theme }) => ({
    height: 40,
    width: 40
}))

type Props = {

}

export default function PostAcademicAnswerItem({ }: Props) {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.AuthReducer.user)
    const post = useAppSelector((state) => state.ForumReducer.post)
    const answers = useAppSelector((state) => state.AcademicReducer.answers)
    const _theme = useTheme()
    const [openEditor, setEditorOpen] = React.useState<boolean>(false)
    const params = router.query.params || []

    const loadAnswers = useCallback(() => {
        dispatch(fetchAcademicAnswersThunk(params[3]))
    }, [params[3]])

    useEffect(() => {
        loadAnswers()
    }, [params[3]])



    function handleEditor(data: Descendant[]) {
        dispatch(createAcademicAnswerThunk(data))
    }

    return (
        <>
            {answers.map((answer, index) => (
                <UpdateItem key={index}>
                    <UpdateHeader>
                        <ChatPersonInfo
                            userId={answer.author.id}
                            fullname={`${user._id === answer.author.id ? '(You)' : ''}${answer.author.userName}`}
                            fullnameStyles={{ fontSize: 14, lineHeight: 1.2, }}
                            subText={normalizedDate(answer.createdAt)}
                            avatarSize={45}
                            indicatorStyles={{ position: 'absolute', left: 30, bottom: 0 }} />
                    </UpdateHeader>
                    <Box sx={{px:1,pb:1,pt:1.3}}>
                        <RenderUpdate update={answer.data} />
                    </Box>
                    <ItemFooter>
                        <VoteButton>
                            <BiUpvote size={20} />
                        </VoteButton>
                        <VoteButton>
                            <BiDownvote size={20} />
                        </VoteButton>
                    </ItemFooter>
                </UpdateItem>
            ))}
            <MainColHeader>
                <TabButton onClick={() => setEditorOpen(!openEditor)}>
                    {openEditor ? <CloseIcon sx={{ mr: .5 }} /> : <Add sx={{ mr: .5 }} />}
                    {openEditor ? 'Close editor' : 'Write an answer'}
                </TabButton>
            </MainColHeader>
            {openEditor && <SlateEditor onValueUpdate={handleEditor} />}

        </>
    )
}