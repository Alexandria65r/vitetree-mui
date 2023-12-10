import React from 'react'
import { ThemedText } from '../../../theme'
import { Box, styled, useMediaQuery } from '@mui/material'
import { ButtonIcon, StyledBox } from '../../../reusable/styles'
import UserAvatar from '../../../components/user/user-avatar'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Post } from '../../../models/post'
import { useMeasure, useWindowSize } from 'react-use'
import SendTipPopper from '../../../components/post/send-tip-popper'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import RenderVideoAsset from './render-video'
import LikeReactions from './like-reactions'
import { RiChat1Line, RiBookmarkLine } from "react-icons/ri";
import moment from 'moment'
import { useRouter } from 'next/router'


const PostItemCard = styled(StyledBox)(({ theme }) => ({
    minHeight: 120,
    marginTop: 0,
    padding: 0,
    borderRadius: 5,
    [theme.breakpoints.down('sm')]: {
        marginTop: 0,
        borderRadius: 0,
        flexWrap: 'wrap',
    }
}))
const PostHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    padding: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    //borderBottom: `1px solid ${colorScheme(theme).borderColor} `,
    [theme.breakpoints.down('sm')]: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    }
}))


const PostFooter = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {

    }
}))
const PostReactions = styled(Box)(({ theme }) => ({
    display: 'flex',
    padding: 8,
    [theme.breakpoints.down('sm')]: {

    }
}))





type Props = {
    post: Post
    parent: 'feed' | 'post-detail'
}

export default function PostItem({ post }: Props) {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [PostPreviewRef, { }] = useMeasure()
    const { width, height } = useWindowSize()
    const isMobile = useMediaQuery('(max-width:600px)')
    const user = useAppSelector((state) => state.AuthReducer.user)
    const posts = useAppSelector((state) => state.PostReducer.posts)


    return (
        <PostItemCard ref={PostPreviewRef}>
            <PostHeader>
                <UserAvatar avatarStyles={{ width: 40, height: 40 }} />
                <Box sx={{ flex: 1 }}>
                    <ThemedText sx={{ fontSize: 16, fontWeight: 500 }}>
                        {post?.author.pageName || 'Page Name'}
                    </ThemedText>
                    <ThemedText sx={{ fontSize: 13, color: 'grayText' }}>{moment(post?.createdAt).fromNow()}</ThemedText>
                </Box>
                <ButtonIcon sx={{ width: 30, height: 30 }}><MoreVertOutlinedIcon /></ButtonIcon>
                <ThemedText sx={{ flexBasis: '100%', fontSize: 15, fontWeight: 500 }}>
                    {post?.description || 'The journey of every company starts with a simple idea 🎉🔥💯'}
                </ThemedText>
            </PostHeader>
            <RenderVideoAsset post={post} />
            <PostFooter>
                <PostReactions>
                    <Box sx={{ flex: 1, position: 'relative' }}>
                        <LikeReactions post={post} />

                        <ButtonIcon onClick={() => router.push(`/feed/${post.postId}`)}>
                            <RiChat1Line size={22} />
                        </ButtonIcon>
                        <SendTipPopper parent='feed' postId={post?.postId ?? ''} />
                    </Box>
                    <ButtonIcon><RiBookmarkLine size={22} /></ButtonIcon>
                </PostReactions>
            </PostFooter>
        </PostItemCard>
    )
}