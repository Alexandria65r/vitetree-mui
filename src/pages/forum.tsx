import React from 'react'
import Layout from '../components/layout'
import { Box, Typography, colors, styled } from '@mui/material'
import { colorScheme } from '../theme'
import { CSS_PROPERTIES } from '../reusable'
//import Select from '@mui/joy/Select';
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import NewTestForm from '../components/new-test-form/new-test-form'
import TestAPI from '../api-services/test'
import { useRouter } from 'next/router'
import randomstring from 'randomstring'
import ForumPostFormModal from '../components/modals/forum-post-form'
import { ButtonIcon, StyledButton } from '../reusable/styles'
import { Add } from '@mui/icons-material'
import { forumActions } from '../../reducers/forum-reducer'
import SendBidModal from '../components/modals/send-bid-modal'


const Container = styled(Box)(({ theme }) => ({
    display: 'flex',
    width: '85%',
    padding: 20,
    margin: '0 auto',
    [theme.breakpoints.down("sm")]: {
        width: '95%',
        padding: 0,
    }
}))
const TestHeader = styled(Box)(({ theme }) => ({
    flex: 1,
    minHeight: 60,
    display: 'flex',
    alignItems: 'center',
    padding: '0 10px',
    backgroundColor: colorScheme(theme).secondaryColor,
    borderRadius: CSS_PROPERTIES.radius5,

    boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`
}))
const TestInfoCol = styled(Box)(({ theme }) => ({
    flexBasis: '30%',
    height: 200,
    borderRadius: CSS_PROPERTIES.radius5,
    backgroundColor: colorScheme(theme).secondaryColor,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
    [theme.breakpoints.down("sm")]: {
        display: 'none'
    }
}))
const FeedContainer = styled(Box)(({ theme }) => ({
    flexBasis: '55%',
    marginLeft: 20,

    borderRadius: CSS_PROPERTIES.radius5,
    [theme.breakpoints.down("sm")]: {
        margin: '15px 0',
        flexBasis: '100%',

    }
}))
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



type Props = {}

export default function NewTest({ }: Props) {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const testData = useAppSelector((state) => state.TestReducer.newTest)
    const isErr = useAppSelector((state) => state.TestReducer.isErr)
    const user = useAppSelector((state) => state.AuthReducer.user)
    const id = randomstring.generate(17)


    async function create() {
        const testId = randomstring.generate(19)
        const newTest = await TestAPI.create({
            ...testData,
            _id: testId,
            authorId: user._id ?? ''
        })

        if (newTest) {
            console.log(newTest)
            router.push(`/prepare/${newTest._id}`)
        }
    }

    return (
        <Layout>
            <Container>
                <TestInfoCol>

                </TestInfoCol>
                <FeedContainer>
                    <TestHeader>
                        <Typography variant='h6' sx={{ flex: 1, fontWeight: 600 }}>
                            Post
                        </Typography>
                        <ButtonIcon onClick={() => dispatch(forumActions.toggleForumFormModal(true))}>
                            <Add />
                        </ButtonIcon>
                    </TestHeader>

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
                                onClick={()=>router.push(`${router.asPath}?sendBid=${id}`)}
                                    sx={{ px: 3, fontSize: 13 }}>
                                    Send Bid
                                </StyledButton>
                            </PostFooter>
                        </PostBody>
                    </PostItem>
                </FeedContainer>
            </Container>
            <ForumPostFormModal />
            <SendBidModal />
        </Layout>
    )
}