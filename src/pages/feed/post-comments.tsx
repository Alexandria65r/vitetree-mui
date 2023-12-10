import { Box, styled } from '@mui/material'
import React from 'react'
import { StyledBox, StyledButton } from '../../reusable/styles'
import UserAvatar from '../../components/user/user-avatar'
import moment from 'moment'
import post from '../../api-services/post'
import { ThemedText } from '../../theme'
import { Post } from '../../models/post'


const Container = styled(Box)(({ theme }) => ({

}))
const Head = styled(StyledBox)(({ theme }) => ({
    height: 120,
    //alignItems:'center'
}))
const PageInfo = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems:'center'
}))


type Props = {
    post: Post
}

export default function PostComments({ post }: Props) {

    return (
        <Container>
            <Head>
                <PageInfo>
                    <UserAvatar imageURL={''} avatarStyles={{ width: 60, height: 60 }} />
                    <Box sx={{ flex: 1,ml:1 }}>
                        <ThemedText sx={{ fontSize: 19, fontWeight: 600 }}>
                            {post?.author.pageName || 'Page Name'}
                        </ThemedText>
                        <ThemedText sx={{ fontSize: 13, fontWeight: 500 }}>
                            Verified Creator
                        </ThemedText>
                    </Box>

                    <StyledButton sx={{flexBasis:'30%', fontWeight:600}}>Follow</StyledButton>
                </PageInfo>
            </Head>
            
        </Container>
    )
}