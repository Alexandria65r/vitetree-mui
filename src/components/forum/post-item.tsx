import { Box, Typography, colors, styled } from '@mui/material'
import React from 'react'
import { colorScheme } from '../../theme'
import { CSS_PROPERTIES } from '../../reusable'
import { StyledButton } from '../../reusable/styles'
import { useRouter } from 'next/router'
import randomstring from 'randomstring'
import { BsSendCheck, BsSendPlus } from 'react-icons/bs'

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
    fontSize:20,
}))
const SendIcon = styled(BsSendPlus)(() => ({
    marginRight: 5,
    fontSize:20,
}))


type Props = {
    type: 'job' | 'question'
}

export default function ForumItem({ type }: Props) {
    const router = useRouter()
    const id = randomstring.generate(17)
    return (
        <PostItem>
            <PostHeader>
                <Typography sx={{ fontSize: 18, fontWeight: 500 }}>
                    Teach me trignometry
                </Typography>
                <Typography sx={(theme) => ({
                    fontSize: 13,
                    color: theme.palette.mode === 'light' ? colors.grey[700] : colorScheme(theme).TextColor,
                    fontWeight: 500
                })}>
                    verified Student
                </Typography>
            </PostHeader>
            <PostBody>
                <Typography sx={(theme) => ({
                    fontSize: 15,
                    color: theme.palette.mode === 'light' ? colors.grey[700] : colorScheme(theme).TextColor,
                    fontWeight: 400
                })}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Esse veritatis inventore quisquam obcaecati laborum perspiciatis
                    ipsum nulla,ea, magnam, maxime enim nemo deleniti deserunt ex labore
                    quidem. Ab, delectus veritatis.
                </Typography>
                <PostFooter>
                    <StyledButton
                        onClick={() => router.push(`${router.asPath}?sendBid=${id}`)}
                        sx={{ px: 3, fontSize: 13 }}>
                        {false ? <SenTIcon /> : <SendIcon />}
                        {type === 'job' ? ' Send Bid' : 'Answer'}
                    </StyledButton>
                </PostFooter>
            </PostBody>
        </PostItem>
    )
}