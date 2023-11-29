import React from 'react'
import { ThemedText, colorScheme } from '../../theme'
import { Box, colors, styled, useTheme } from '@mui/material'
import { ButtonIcon, StyledBox, StyledButton } from '../../reusable/styles'
import UserAvatar from '../../components/user/user-avatar'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import StarsOutlinedIcon from '@mui/icons-material/StarsOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

const PostItemCard = styled(StyledBox)(({ theme }) => ({
    minHeight: 120,
    marginTop: 30,
    padding: 0,
    [theme.breakpoints.down('sm')]: {
        marginTop: 10,
        flexWrap: 'wrap',
    }
}))
const PostHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: 8,
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottom: `1px solid ${colorScheme(theme).borderColor} `,
    [theme.breakpoints.down('sm')]: {

    }
}))
const PostCover = styled(Box)(({ theme }) => ({
    height: 300,
    backgroundColor: colorScheme(theme).greyToTertiary,
    [theme.breakpoints.down('sm')]: {
        height: 180,
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



type Props = {}

export default function PostItem({ }: Props) {
    const _theme = useTheme()

    return (
        <PostItemCard>
            <PostHeader>
                <UserAvatar avatarStyles={{ width: 50, height: 50 }} />
                <Box sx={{ flex: 1 }}>
                    <ThemedText sx={{ fontSize: 16, fontWeight: 500 }}>Startups Media</ThemedText>
                    <ThemedText sx={{ fontSize: 13, color: 'grayText' }}>Thur, 14hrs</ThemedText>
                </Box>
                <ButtonIcon><MoreVertOutlinedIcon /></ButtonIcon>
            </PostHeader>
            <PostCover></PostCover>
            <PostFooter>
                <Box sx={{ padding: 2 }}>
                    <ThemedText sx={{ fontSize: 18, fontWeight: 600 }}>This is the title of the post</ThemedText>
                    <ThemedText sx={{ fontSize: 15, fontWeight: 500 }}>
                        The journey of every company starts with a simple idea 🎉🔥💯
                    </ThemedText>
                </Box>

                <PostReactions>
                    <Box sx={{ flex: 1 }}>
                        <ButtonIcon><FavoriteBorderIcon /></ButtonIcon>
                        <ButtonIcon><ModeCommentOutlinedIcon /></ButtonIcon>
                        <StyledButton sx={{
                            ml: 1.5, height: 30, fontSize: 14,
                            bgcolor: colorScheme(_theme).lightToSecondaryColor,
                            color: colorScheme(_theme).TextColor,
                            border: `1px solid ${colorScheme(_theme).greyToTertiary}`,
                            borderBottomWidth: 3,
                            transition: '0.3s all',
                            '&:hover': {
                                borderColor: colors.teal[500]
                            }
                        }}>
                            <StarsOutlinedIcon sx={{ mr: .4, fontSize: 16 }} /> Send Star
                        </StyledButton>
                    </Box>
                    <ButtonIcon><BookmarkAddOutlinedIcon /></ButtonIcon>
                </PostReactions>
            </PostFooter>
        </PostItemCard>
    )
}