import React, { useEffect } from 'react'
import { ThemedText, colorScheme } from '../../theme'
import { Box, colors, styled, useMediaQuery, useTheme } from '@mui/material'
import { ButtonIcon, StyledBox, StyledButton } from '../../reusable/styles'
import UserAvatar from '../../components/user/user-avatar'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import StarsOutlinedIcon from '@mui/icons-material/StarsOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Image, Transformation } from 'cloudinary-react'
import { Post } from '../../models/post'
import { useMeasure, useWindowSize } from 'react-use'
import SendTipPopper from '../../components/post/send-tip-popper'
import { useAppSelector } from '../../../store/hooks'

const PostItemCard = styled(StyledBox)(({ theme }) => ({
    minHeight: 120,
    marginTop: 0,
    padding: 0,
    borderRadius:5,
    [theme.breakpoints.down('sm')]: {
        marginTop: 0,
        borderRadius: 0,
        flexWrap: 'wrap',
    }
}))
const PostHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap:'wrap',
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
const PostCover = styled(Box)(({ theme }) => ({
    height: 'auto',
    backgroundColor: colorScheme(theme).greyToTertiary,
    [theme.breakpoints.down('sm')]: {
        //height: 180,
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
}

export default function PostItem({ post }: Props) {
    const _theme = useTheme()
    const [PostPreviewRef, { }] = useMeasure()
    const { width, height } = useWindowSize()
    const isMobile = useMediaQuery('(max-width:600px)')





    return (
        <PostItemCard ref={PostPreviewRef}>
            <PostHeader>
                <UserAvatar avatarStyles={{ width: 40, height: 40 }} />
                <Box sx={{ flex: 1 }}>
                    <ThemedText sx={{ fontSize: 16, fontWeight: 500 }}>
                        {post?.author?.pageName || 'Startups Media'}
                    </ThemedText>
                    <ThemedText sx={{ fontSize: 13, color: 'grayText' }}>Thur, 14hrs</ThemedText>
                </Box>
                <ButtonIcon><MoreVertOutlinedIcon /></ButtonIcon>
                 <ThemedText sx={{flexBasis:'100%', fontSize: 15, fontWeight: 500 }}>
                     {post?.description || 'The journey of every company starts with a simple idea 🎉🔥💯'}
                 </ThemedText>
            </PostHeader>
          
            {post?.type !== 'audio' ? (
                <PostCover>
                    <Image style={{ width: '100%', height: '100%' }} cloudName='alexandriah65' publicId={post?.postAssets?.image?.publicId ?? ''}>
                        {isMobile ?
                            <Transformation width={width - 15} height={200} crop="thumb" />
                            :
                            <Transformation width={686} height={386} crop="thumb" />
                        }
                    </Image>
                </PostCover>
            ) : post?.type === 'audio' ? (<Box sx={{ display: 'flex', mt: 0, justifyContent: 'center' }}>
                <audio src='https://res.cloudinary.com/alexandriah65/video/upload/v1679314196/audios/aqcszapett05dldh5244.mp3' controls />
            </Box>) : <></>}
            <PostFooter>
          
                <PostReactions>
                    <Box sx={{ flex: 1 }}>
                        <ButtonIcon><FavoriteBorderIcon /></ButtonIcon>
                        <ButtonIcon><ModeCommentOutlinedIcon /></ButtonIcon>
                        <SendTipPopper postId={post?.postId??''} />
                    </Box>
                    <ButtonIcon><BookmarkAddOutlinedIcon /></ButtonIcon>
                </PostReactions>
            </PostFooter>
        </PostItemCard>
    )
}