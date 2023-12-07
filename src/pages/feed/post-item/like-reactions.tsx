import { Box, Menu, colors, styled, useTheme } from '@mui/material'
import React, { useCallback, useEffect } from 'react'
import { ButtonIcon, StyledButton } from '../../../reusable/styles'
import { colorScheme, ThemedText } from '../../../theme'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Like, LikeSchema, Post } from '../../../models/post';
import { useDispatch } from 'react-redux';
import { likePostThunk } from '../../../../reducers/post-reducer/post-thunks';
import { useAppSelector } from '../../../../store/hooks';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';


const ReactionIconButton = styled(ButtonIcon)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {

    }
}))
const PostLikeReactions = styled(Box)(({ theme }) => ({
    paddingInline: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {

    }
}))

type Props = {
    post: Post
}

export default function LikeReactions({ post }: Props) {
    const dispatch = useDispatch()
    const _theme = useTheme()
    const user = useAppSelector((state) => state.AuthReducer.user)
  

    const like = post?.likes.find((tipItem) => tipItem?.owner === user._id) ?? LikeSchema

    return (

        <PopupState variant='popper'>
            {(popupState) => (
                <>
                    <StyledButton
                        sx={{ bgcolor: 'transparent', fontSize: 14, fontWeight: 500, color: colorScheme(_theme).TextColor }}
                        {...bindTrigger(popupState)}
                    >
                        {like?.name === 'love' ? (<> <FavoriteIcon sx={{ color: colors.red[500], mr: .4 }} /> {like.name}</>) : like?.emoji ? (
                            <>
                                <ThemedText sx={{ fontSize: 22, mr: 1 }}>{like?.emoji} </ThemedText>
                                {like.name}
                            </>
                        ) : <FavoriteBorderIcon />}
                    </StyledButton>

                    <Menu
                        transformOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left'
                        }}
                        className='trans-from-bottom'
                        {...bindMenu(popupState)}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left'
                        }}
                        classes={{
                            //paper: styles.LikeReactionPaper
                        }}

                        slotProps={{
                            paper: {
                                style: {
                                    borderRadius: 29
                                }

                            }
                        }}
                    >
                        <PostLikeReactions>

                            {reactions.map((reaction, index) => (
                                <ReactionIconButton
                                    key={index}
                                    onClick={() => {
                                        dispatch(likePostThunk({
                                            postId: post.postId,
                                            like: { ...reaction, postId: post.postId, owner: user._id }
                                        }))
                                        popupState.close()
                                    }}>
                                    {reaction.name === 'love' ? <FavoriteIcon sx={{ color: colors.red[500] }} />
                                        : <ThemedText sx={{ fontSize: 22, top: 0 }}>{reaction.emoji}</ThemedText>}
                                </ReactionIconButton>
                            ))}
                        </PostLikeReactions>
                    </Menu>
                </>
            )}
        </PopupState>

    )
}


const reactions: Like[] = [
    { name: 'love', emoji: '💖' },
    { name: 'haha', emoji: '😂' },
    { name: 'wow', emoji: '😲' },
    { name: 'angry', emoji: '😡' },
    { name: 'sad', emoji: '🥲' },
]