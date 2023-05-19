import * as React from 'react';
import Modal from '@mui/material/Modal';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { Box, Typography, colors, styled } from '@mui/material';
import { CSS_PROPERTIES } from '../../reusable';
import { colorScheme } from '../../theme';
import { ButtonIcon } from '../../reusable/styles';

import { useRouter } from 'next/router';
import { fetchPostThunk } from '../../../reducers/forum-reducer/forum-thunks';
import ForumItem from '../forum/post-item';
import { Close, KeyboardBackspace } from '@mui/icons-material';
import SendeBid from '../forum/send-bid';
import PostDetail from '../forum/post-detail';
import AnswerQuesttion from '../forum/answer-question';





export const ModalContainer = styled(Box)(({ theme }) => ({
    position: 'fixed',
    top: 0,
    right: 0,
    width: '80%',
    height: '100vh',
    borderRadius: 0,
    borderTopLeftRadius: 20,
    overflowY: 'auto',
    backgroundColor: colorScheme(theme).primaryColor,
    [theme.breakpoints.down("sm")]: {
        position: 'absolute',
        left: 0,
        width: '100%',
        transform: 'none',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        top: 'unset',
        bottom: 0,
        borderTopLeftRadius: 0,
    }
}))


const Header = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    height: 60,
    padding: '0 10px',
    borderTopLeftRadius: 20,
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : colorScheme(theme).secondaryColor,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
    borderTop: `1px solid solid ${theme.palette.mode === 'light' ? colors.grey[200] : colorScheme(theme).primaryColor}`,
    [theme.breakpoints.down('sm')]: {
        padding: '10px 5px',
        borderTopLeftRadius: 0,
    }
}))

const Body = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down("sm")]: {
        padding: 0,
    }
}))



export default function SendBidModal() {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const owner = useAppSelector((state) => state.AuthReducer.user._id)
    const post = useAppSelector((state) => state.ForumReducer.post)
    const [all, details, _applyOrAns, postId]: any = router.query.params || []

    const applyOrAns: 'apply' | 'answer' = _applyOrAns

    console.log(router.query)

    const fetchCartItems = React.useCallback(() => {
        if (postId) {
            dispatch(fetchPostThunk(postId));
        }
    }, [postId])

    React.useEffect(() => {
        fetchCartItems()
    }, [postId])


    function handleClose() {
        router.back()
    }




    return (
        <div>
            <Modal
                open={details === 'details'}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <ModalContainer className='modalPage'>
                    <Header>
                        <ButtonIcon
                            onClick={handleClose}>
                            <KeyboardBackspace />
                        </ButtonIcon>
                        <Typography sx={(theme) => ({
                            fontSize: 20,
                            fontWeight: 600,
                            color: colorScheme(theme).TextColor
                        })}>
                            Post Detail
                        </Typography>
                    </Header>
                    <Body>
                        {applyOrAns === 'apply' ? (
                            <SendeBid />
                        ) : applyOrAns === 'answer' ?
                                <AnswerQuesttion />
                            : <PostDetail post={post} />}
                    </Body>
                </ModalContainer>
            </Modal>
        </div>
    );
}


