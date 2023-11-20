import * as React from 'react';
import Modal from '@mui/material/Modal';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { Box, Typography, colors, styled } from '@mui/material';
import { CSS_PROPERTIES } from '../../reusable';
import { colorScheme } from '../../theme';
import { forumActions } from '../../../reducers/forum-reducer';
import { StyledButton } from '../../reusable/styles';
import { useRouter } from 'next/router';
import ForumPostForm from '../forum-form/forum-post-form';
import HeaderTabs from '../forum-form/header';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Randomstring from 'randomstring';
import { PostSchema } from '../../reusable/schemas';
import ForumAPI from '../../api-services/forum';
import { AppSpinner } from '../activity-indicators';


export const ModalContainer = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '55%',
    minHeight: '500px',
    transform: 'translate(-50%, -50%)',
    borderRadius: CSS_PROPERTIES.radius10,
    backgroundColor: colorScheme(theme).secondaryColor,
    [theme.breakpoints.down("sm")]: {
        position: 'absolute',
        left: 0,
        width: '100%',
        transform: 'none',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        top: 'unset',
        bottom: 0
    }
}))



const FormControl = styled(Box)(({ theme }) => ({
    width: '80%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '20px auto',
    padding: '0 10px',
    [theme.breakpoints.down('sm')]: {
        width: '95%',
        margin: '16px auto',
    }
}))




export default function ForumPostFormModal() {
    const dispatch = useAppDispatch()
    const isOpen = useAppSelector((state) => state.ForumReducer.isOpen)
    const owner = useAppSelector((state) => state.AuthReducer.user._id)
    const post = useAppSelector((state) => state.ForumReducer.post)
    const posts = useAppSelector((state) => state.ForumReducer.posts)
    const forumNetworkStatus = useAppSelector((state) => state.ForumReducer.forumNetworkStatus)
    const newPostId = Randomstring.generate(17)


    React.useEffect(() => {
        dispatch(forumActions.setPostProps({
            name: 'authorId',
            value: owner
        }))
        dispatch(forumActions.setPostProps({
            name: '_id',
            value: newPostId
        }))
    }, [dispatch, isOpen])


    function handleClose() {
        dispatch(forumActions.setTabValue(0))
        dispatch(forumActions.setPost(PostSchema))
        dispatch(forumActions.toggleForumFormModal(false))
    }


    async function handleSubmit() {
        try {
            dispatch(forumActions.setNetworkStatus('creating-new-post'))
            const newPost = await ForumAPI.create(post)
            if (newPost) {
                dispatch(forumActions.setNetworkStatus('creating-new-post-success'))
                dispatch(forumActions.setPosts([...posts,newPost]))
                handleClose()
            }
        } catch (error) {
            dispatch(forumActions.setNetworkStatus('creating-new-post-error'))
            console.log(error)
        }

    }

    return (
        <div>
            <Modal
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <ModalContainer className="modalMb">
                    <Typography sx={(theme) => ({
                        fontSize: 20,
                        m: 2,
                        color: colorScheme(theme).TextColor,
                        fontWeight: 600,
                        [theme.breakpoints.down('sm')]: {
                            fontSize: 20,
                        }
                    })}>New Post</Typography>
                    <HeaderTabs />
                    <ForumPostForm mode="post" submitHandler={() => { }} />
                    <Box sx={{ borderTop: 1, borderColor: 'divider' }}>
                        <FormControl sx={{ justifyContent: 'flex-end' }}>
                            <Box sx={{ flex: 1 }}>
                                <StyledButton sx={(theme) => ({
                                    mr: 1,
                                    px: 2,
                                    fontWeight: 500,
                                    borderBottom: 4,
                                    backgroundColor: colorScheme(theme).grayToSecondaryColor,
                                    color: colorScheme(theme).TextColor,
                                    borderColor: colorScheme(theme).grayToSecondaryColor
                                })}>
                                    <AttachFileIcon sx={{ transform: 'rotate(18deg)' }} />
                                    Attachment
                                </StyledButton>
                            </Box>


                            <StyledButton
                                onClick={handleSubmit}
                                sx={{ width: '30%', borderBottom: 4, borderColor: colors.teal[300] }}>
                                Post
                                <AppSpinner visible={forumNetworkStatus ==='creating-new-post'} />
                            </StyledButton>
                        </FormControl>
                    </Box>
                </ModalContainer>

            </Modal>
        </div>
    );
}


