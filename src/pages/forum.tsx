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
import ForumItem from '../components/forum/post-item'
import { FaQuestionCircle } from 'react-icons/fa'
import { SiWheniwork } from 'react-icons/si'
import { BsBorderAll } from 'react-icons/bs'
import { HiOutlineViewGrid } from 'react-icons/hi'
import { BiSearchAlt } from 'react-icons/bi'

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
const TabHeader = styled(Box)(({ theme }) => ({
    flex: 1,
    minHeight: 60,
    display: 'flex',
    alignItems: 'center',
    padding: '0 10px',
    
    borderRadius: CSS_PROPERTIES.radius5,
  
    [theme.breakpoints.down('sm')]:{
        width:'95vw',
        overflowX:'auto',
        
    },
    "::-webkit-scrollbar":{
        display:'none'
    }
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

const TabButton = styled(StyledButton)(({ theme }) => ({
    padding: '0 10px',
    margin: '0 5px',
    fontSize: 13,
    whiteSpace:'nowrap',
    borderRadius: 29,
    color: colorScheme(theme).TextColor,
    backgroundColor:theme.palette.mode==='light'? '#fff':colorScheme(theme).secondaryColor,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
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
                    {/* <TestHeader>
                        <Typography variant='h6' sx={{ flex: 1, fontWeight: 600 }}>
                            Post
                        </Typography>
                        <ButtonIcon onClick={() => dispatch(forumActions.toggleForumFormModal(true))}>
                            <Add />
                        </ButtonIcon>
                    </TestHeader> */}
                    <TabHeader>
                        <TabButton onClick={() => dispatch(forumActions.toggleForumFormModal(true))}>
                            <Add style={{ marginRight: 5 }} />
                            New post
                        </TabButton>
                        <TabButton>
                            <BiSearchAlt size={20} style={{ marginRight: 5 }} />
                            Search
                        </TabButton>
                        <TabButton>
                            <HiOutlineViewGrid size={20} style={{ marginRight: 5 }} />
                            All
                        </TabButton>
                        <TabButton>
                            <SiWheniwork size={20} style={{ marginRight: 5 }} />
                            Tasks
                        </TabButton>
                        <TabButton>
                            <FaQuestionCircle size={20} style={{ marginRight: 5 }} />
                            Questions
                        </TabButton>
                       
                    </TabHeader>
                    <ForumItem type='job' />
                    <ForumItem type='question' />
                </FeedContainer>
            </Container>
            <ForumPostFormModal />
            <SendBidModal />
        </Layout>
    )
}