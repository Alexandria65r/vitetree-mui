import * as React from 'react';
import Modal from '@mui/material/Modal';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { mainActions } from '../../../reducers';
import ReusableAlert from '../reusable-alert';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import { duplicateTestThunk } from '../../../reducers/thunks';
import { testDataSchema } from '../../reusable/schemas';
import { Box, Typography, colors, styled } from '@mui/material';
import { CSS_PROPERTIES } from '../../reusable';
import { colorScheme } from '../../theme';
import { forumActions } from '../../../reducers/forum-reducer';
import { Badge, ButtonIcon, CartAndWishListModalContainer, StyledButton } from '../../reusable/styles';

import { useRouter } from 'next/router';
import { deleteCartItemThunk, fetchCartItemsThunk } from '../../../reducers/cart-reducer/cart-thunks';
import CartItem from '../../components/cart-item'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { wishListActions } from '../../../reducers/wishlist-reducer';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { deleteWishListThunk } from '../../../reducers/wishlist-reducer/wishlist-thunks';
import EmptyCartAndWishlist from '../empty-cart-wishlist';
import ForumPostForm from '../forum-form/forum-post-form';
import { fetchPostThunk } from '../../../reducers/forum-reducer/forum-thunks';
import ForumItem from '../forum/post-item';
import moment from 'moment';





export const ModalContainer = styled(Box)(({ theme }) => ({
    position: 'fixed',
    top: 0,
    right: 0,
    width: '80%',
    height: '100vh',
    borderRadius: 0,
    borderTopLeftRadius: 20,
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
    padding: '0 20px',
    borderTopLeftRadius: 20,
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : colorScheme(theme).secondaryColor,
    //justifyContent: 'center',
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
    borderTop: `1px solid solid ${theme.palette.mode === 'light' ? colors.grey[200] : colorScheme(theme).primaryColor}`,
    [theme.breakpoints.down('sm')]: {
        borderTopLeftRadius: 0,
    }
}))

const Body = styled(Box)(({ theme }) => ({
    padding: 20,
    [theme.breakpoints.down("sm")]: {
        padding: 10,
    }
}))
const PostDetail = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
}))
const PostItemCol = styled(Box)(({ theme }) => ({
    flexBasis: '58%',
    [theme.breakpoints.down("sm")]: {
        flexBasis: '100%',
    }
}))
const Card = styled(Box)(({ theme }) => ({
    margin: '10px 0',
    minHeight: 100,
    cursor: 'pointer',
    backgroundColor: colorScheme(theme).secondaryColor,
    borderRadius: CSS_PROPERTIES.radius5,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
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
    [theme.breakpoints.down("sm")]: {
        flexBasis: '100%',
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
                            </AuthorCol>
                        </PostDetail>
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
                    </Body>
                </ModalContainer>
            </Modal>
        </div>
    );
}


