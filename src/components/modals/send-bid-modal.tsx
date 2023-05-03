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
import { Close } from '@mui/icons-material';





export const ModalContainer = styled(Box)(({ theme }) => ({
    position: 'fixed',
    top: 0,
    right: 0,
    width: '80%',
    height: '100vh',
    borderRadius: 0,
    borderTopLeftRadius: 20,
    overflowY: 'auto',
    backgroundColor: colorScheme(theme).secondaryColor,
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
const PostDetail = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    margin:20,
    borderRadius:CSS_PROPERTIES.radius10,
    justifyContent: 'space-between',
    border: `1px solid ${colorScheme(theme).borderColor}`,
    [theme.breakpoints.down("sm")]: {
        margin: 5,
        border:0,
        borderRadius:0,
    }
}))
const PostItemCol = styled(Box)(({ theme }) => ({
    padding: 10,
    flexBasis: '60%',
    [theme.breakpoints.down("sm")]: {
        flexBasis: '100%',
    }
}))
const Card = styled(Box)(({ theme }) => ({
    marginTop: '10px',
    minHeight: 100,
    cursor: 'pointer',
    //backgroundColor: colorScheme(theme).secondaryColor,
    // borderRadius: CSS_PROPERTIES.radius5,
    // boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
    borderBottom: `1px solid ${colorScheme(theme).borderColor}`,
    [theme.breakpoints.down("sm")]: {
        marginLeft: 0, flexBasis: '100%',
    }
}))
const CardHead = styled(Box)(({ theme }) => ({
    padding: 10,
    [theme.breakpoints.down("sm")]: {

    }
}))
const AuthorCol = styled(Box)(({ theme }) => ({
    flexBasis: '40%',
    height: 'calc(100vh - 66px)',
    //padding:10,
    borderLeftStyle: 'solid',
    borderLeftColor: colorScheme(theme).borderColor,
    [theme.breakpoints.down("sm")]: {
        height: 'auto',
        flexBasis: '100%',
        borderLeftWidth: 0
    }
}))


export default function SendBidModal() {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const owner = useAppSelector((state) => state.AuthReducer.user._id)
    const post = useAppSelector((state) => state.ForumReducer.post)
    const [all, details, postId]: any = router.query.params || []

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
                open={router.asPath.includes(details)}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <ModalContainer className='modalPage'>
                    <Header>
                        <ButtonIcon
                            onClick={handleClose}
                            sx={{ backgroundColor: 'transparent' }}>
                            <Close />
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
                        <PostDetail>
                            <PostItemCol>
                                <ForumItem post={post} />
                                <Card>
                                    <CardHead>
                                        <Typography sx={(theme) => ({
                                            fontSize: 16,
                                            fontWeight: 600,
                                            color: colorScheme(theme).TextColor
                                        })}>
                                            {post.type === 'hire tutor' ? 'Send Bid' : 'Answer'}
                                        </Typography>
                                    </CardHead>
                                </Card>
                            </PostItemCol>
                            <AuthorCol>
                                <Card>
                                    <CardHead>
                                        <Typography sx={(theme) => ({
                                            fontSize: 16,
                                            fontWeight: 500,
                                            color: colorScheme(theme).TextColor
                                        })}>
                                            About Student
                                        </Typography>
                                        <Typography sx={(theme) => ({
                                            lineHeight: 1.2,
                                            fontSize: 16,
                                            fontWeight: 500,
                                            color: colorScheme(theme).TextColor
                                        })}>
                                            Zambia
                                        </Typography>
                                        <Typography sx={(theme) => ({
                                            fontSize: 12,
                                            fontWeight: 500,
                                            color: colorScheme(theme).TextColor
                                        })}>
                                            Lusaka {`${new Date().getHours()}:${new Date().getMinutes()}`}
                                        </Typography>
                                        <Typography sx={(theme) => ({
                                            fontSize: 13,
                                            fontWeight: 500,
                                            color: colorScheme(theme).TextColor
                                        })}>
                                            Member since Jun,2018
                                        </Typography>
                                    </CardHead>
                                </Card>
                                <Card>
                                    <CardHead>
                                        <Typography sx={(theme) => ({
                                            fontSize: 16,
                                            fontWeight: 500,
                                            color: colorScheme(theme).TextColor
                                        })}>
                                            Tutor Expertise
                                        </Typography>
                                        <Typography sx={(theme) => ({
                                            lineHeight: 1.2,
                                            fontSize: 16,
                                            fontWeight: 500,
                                            color: colorScheme(theme).TextColor
                                        })}>
                                            Zambia
                                        </Typography>
                                        <Typography sx={(theme) => ({
                                            fontSize: 12,
                                            fontWeight: 500,
                                            color: colorScheme(theme).TextColor
                                        })}>
                                            Lusaka {`${new Date().getHours()}:${new Date().getMinutes()}`}
                                        </Typography>
                                        <Typography sx={(theme) => ({
                                            fontSize: 13,
                                            fontWeight: 500,
                                            color: colorScheme(theme).TextColor
                                        })}>
                                            Member since Jun,2018
                                        </Typography>
                                    </CardHead>
                                </Card>
                                <Card>
                                    <CardHead>
                                        <Typography sx={(theme) => ({
                                            fontSize: 16,
                                            fontWeight: 500,
                                            color: colorScheme(theme).TextColor
                                        })}>
                                            Bids
                                        </Typography>
                                        <Typography sx={(theme) => ({
                                            lineHeight: 1.2,
                                            fontSize: 16,
                                            fontWeight: 500,
                                            color: colorScheme(theme).TextColor
                                        })}>
                                            Zambia
                                        </Typography>
                                        <Typography sx={(theme) => ({
                                            fontSize: 12,
                                            fontWeight: 500,
                                            color: colorScheme(theme).TextColor
                                        })}>
                                            Lusaka {`${new Date().getHours()}:${new Date().getMinutes()}`}
                                        </Typography>
                                        <Typography sx={(theme) => ({
                                            fontSize: 13,
                                            fontWeight: 500,
                                            color: colorScheme(theme).TextColor
                                        })}>
                                            Member since Jun,2018
                                        </Typography>
                                    </CardHead>
                                </Card>
                            </AuthorCol>

                        </PostDetail>
                    </Body>
                </ModalContainer>
            </Modal>
        </div>
    );
}


