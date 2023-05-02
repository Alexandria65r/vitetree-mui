import { Box, Typography, colors, styled } from '@mui/material'
import React from 'react'
import { colorScheme } from '../../theme'
import { CSS_PROPERTIES } from '../../reusable'
import { StyledButton } from '../../reusable/styles'
import { useRouter } from 'next/router'
import randomstring from 'randomstring'
import { BsSendCheck, BsSendPlus } from 'react-icons/bs'
import { Post } from '../../reusable/interfaces'
import { teal } from '@mui/material/colors'
import moment from 'moment'

const PostItem = styled(Box)(({ theme }) => ({
    flexBasis: '55%',
    margin: '10px 0',
    minHeight: 100,
    backgroundColor: colorScheme(theme).secondaryColor,
    borderRadius: CSS_PROPERTIES.radius5,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
    [theme.breakpoints.down("sm")]: {
        marginLeft: 0, flexBasis: '100%',
    }
}))

const PostHeader = styled(Box)(({ theme }) => ({
    padding: 10
}))


const PostBody = styled(Box)(({ theme }) => ({
    padding: '0 10px'
}))
const PostFooter = styled(Box)(({ theme }) => ({
    display: 'flex',
    padding: '10px 0',
    marginTop: 10,
    justifyContent: 'flex-end'
}))


const SenTIcon = styled(BsSendCheck)(() => ({
    marginRight: 5,
    fontSize: 20,
}))
const SendIcon = styled(BsSendPlus)(() => ({
    marginRight: 5,
    fontSize: 20,
}))
const SubFlexCol = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center'
}))


type Props = {
    post: Post
}

export default function ForumItem({ post }: Props) {
    const router = useRouter()
    const id = randomstring.generate(17)
    return (
        <PostItem>
            <PostHeader>
                <Typography sx={{ mb: .8, fontSize: 18, fontWeight: 500 }}>
                    {post.title}
                </Typography>
                <SubFlexCol>
                    <Typography sx={(theme) => ({
                        flex: 1,

                        fontSize: 13,
                        color: theme.palette.mode === 'light' ? colors.grey[700] : colorScheme(theme).TextColor,
                        fontWeight: 500
                    })}>
                        Verified Student
                    </Typography>
                    {post.type === 'hire tutor' && (
                        <Typography sx={(theme) => ({
                            flex: 1,
                            fontSize: 13,
                            color: theme.palette.mode === 'light' ? colors.grey[700] : colorScheme(theme).TextColor,
                            fontWeight: 500
                        })}>
                            Budget: ${post.budget}
                        </Typography>
                    )}

                    <Typography sx={(theme) => ({
                        flex: 1,
                        fontSize: 13,
                        color: theme.palette.mode === 'light' ? colors.grey[700] : colorScheme(theme).TextColor,
                        fontWeight: 500
                    })}>
                        Posted: {moment(post.createdAt).fromNow().replace('minutes ago', 'Mins')}
                    </Typography>
                    <Box sx={{
                        userSelect: 'none',
                        py: .5,
                        px: .8,
                        borderRadius: '5px',
                        borderStyle:'solid',
                        borderColor: teal[400]
                    }}>
                        <Typography sx={(theme) => ({
                            fontSize: 12,
                            color: colorScheme(theme).TextColor,
                            fontWeight: 600
                        })}>
                            {post.request}
                        </Typography>
                    </Box>


                </SubFlexCol>
            </PostHeader>
            <PostBody>
                <Typography sx={(theme) => ({
                    fontSize: 15,
                    color: theme.palette.mode === 'light' ? colors.grey[700] : colorScheme(theme).TextColor,
                    fontWeight: 400
                })}>
                    {post.description}
                </Typography>
                <PostFooter>
                    <StyledButton
                        onClick={() => router.push(`${router.asPath}?sendBid=${id}`)}
                        sx={{ px: 3, fontSize: 13 }}>
                        {false ? <SenTIcon /> : <SendIcon />}
                        {post.type === 'hire tutor' ? ' Send Bid' : 'Answer'}
                    </StyledButton>
                </PostFooter>
            </PostBody>
        </PostItem>
    )
}