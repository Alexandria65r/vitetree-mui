
import { styled, Box, Typography } from '@mui/material'
import React from 'react'
import { CSS_PROPERTIES } from '../../reusable'
import { colorScheme } from '../../theme'
import ForumItem from './post-item'
import { Post } from '../../reusable/interfaces'
import { StyledBox } from '../../reusable/styles'
import { useRouter } from 'next/router'


const Container = styled(Box)(({ theme }) => ({
    width: '85%',
    flexWrap: 'wrap',
    margin: '20px auto',
    borderRadius: CSS_PROPERTIES.radius10,
    justifyContent: 'space-between',
    [theme.breakpoints.down("sm")]: {
        width: 'fit-content',
        margin: 5,
        border: 0,
        borderRadius: 0,
    }
}))

const Card = styled(StyledBox)(({ theme }) => ({
    flexBasis: '30%',
    [theme.breakpoints.down("sm")]: {
        flexBasis: '100%',
        marginTop: '10px',
        marginLeft: 0,
    }
}))
const CardHead = styled(Box)(({ theme }) => ({
    padding: 10,
    [theme.breakpoints.down("sm")]: {

    }
}))
const AuthorCol = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flexBasis: '40%',
    marginBottom: '10px',
    borderLeftStyle: 'none',
    borderLeftColor: colorScheme(theme).borderColor,
    [theme.breakpoints.down("sm")]: {
        height: 'auto',
        //  flexBasis: '100%',
        borderLeftWidth: 0
    }
}))





type Props = {
    post: Post
}

export default function PostDetail({ post }: Props) {
    const router = useRouter()
    const [sort, details, postId]: any = router.query.params || []

    const applyOrAns = post.type === 'academic question' ? 'answer' : 'apply'

    return (
        <Container>
            <ForumItem post={post} />
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
                            Tutor Expertise(Subjects)
                        </Typography>
                        <Typography sx={(theme) => ({
                            fontSize: 12,
                            fontWeight: 500,
                            color: colorScheme(theme).TextColor
                        })}>
                            Chemistry and Physics
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
                            Applicants
                        </Typography>
                        <Typography sx={(theme) => ({
                            lineHeight: 1.2,
                            fontSize: 13,
                            fontWeight: 500,
                            color: colorScheme(theme).TextColor
                        })}>
                            20 Bids
                        </Typography>
                    </CardHead>
                </Card>
            </AuthorCol>

            <StyledBox
                onClick={() => router.push(`/forum/${sort}/${details}/${applyOrAns}/${postId}`)}
                sx={{ height: 200 }}>
                <CardHead>
                    <Typography sx={(theme) => ({
                        fontSize: 16,
                        fontWeight: 600,
                        color: colorScheme(theme).TextColor
                    })}>
                        {post.type === 'hire tutor' ? 'Send Bid' : 'Answer'}
                    </Typography>
                </CardHead>
            </StyledBox>
        </Container>
    )
}