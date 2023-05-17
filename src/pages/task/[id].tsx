import React, { useCallback, useEffect, useState } from 'react'
import Layout from '../../components/layout'
import { Box, SxProps, Theme, Typography, colors, styled, useTheme } from '@mui/material'
import { CSS_PROPERTIES } from '../../reusable'
import { colorScheme, useColorScheme } from '../../theme'
import { useRouter } from 'next/router'
import { fetchHiredTask } from '../../../reducers/task-reducer/task-thunks'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { ActiveIndicator, Avatar, StyledBox, StyledButton, TabButton } from '../../reusable/styles'
import { Add } from '@mui/icons-material'
import ChangeTaskStatus from '../../components/menus/task-status-button'
import ChatPersonInfo from '../../components/chat-person-info'
import TaskDetails from '../../components/tasks/task-details'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const Container = styled(Box)(({ theme }) => ({
    width: '80%',
    margin: 'auto',
    [theme.breakpoints.down("sm")]: {
        width: '97%'
    }
}))
const Header = styled(Box)(({ theme }) => ({
    height: 66,
    display: 'flex',
    alignItems: 'center',
    paddingInline: 10,
    margin: 'auto',
    [theme.breakpoints.down("sm")]: {
        width: '97%'
    }
}))
const InnerFlexContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    [theme.breakpoints.down("sm")]: {

    }
}))
const AsideLeft = styled(Box)(({ theme }) => ({
    flexBasis: '40%',

    [theme.breakpoints.down("sm")]: {
        flexBasis: '100%',
    }
}))
const MainCol = styled(Box)(({ theme }) => ({
    flex: 1,
    marginLeft: 25,
    [theme.breakpoints.down("sm")]: {
        flexBasis: '100%',
        marginLeft: 0,
    }
}))

const MainColHeader = styled(Box)(({ theme }) => ({
    display:'flex',
    height: 40,
    padding: '0 0px',
    marginBottom: 15,
}))
const UpdateHeader = styled(Box)(({ theme }) => ({
    height: 40,
    padding: '0 10px',
}))


const UpdateItem = styled(StyledBox)(({ theme }) => ({
    minHeight: 100,
    padding: 10,
    marginBottom: 15,
    borderRadius: CSS_PROPERTIES.radius10,
    boxShadow: `0 1px solid 3px 0 ${colorScheme(theme).chatBoarderColor}`,
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : colorScheme(theme).secondaryColor
}))

const Dropzone = styled(Box)(({ theme }) => ({
    height: 140,
    padding: '0 10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: `1px dashed #000`,
    borderRadius: CSS_PROPERTIES.radius10,
}))


const SubmitFooter = styled(Box)(({ theme }) => ({
    marginTop: 15,
    display: 'flex',
    justifyContent: 'flex-end'
}))




type Props = {}

export default function Task({ }: Props) {

    const dispatch = useAppDispatch()
    const router = useRouter()
    const isSidebarOpen = useAppSelector((state) => state.MainReducer.isSidebarOpen)
    const user = useAppSelector((state) => state.AuthReducer.user)
    const task = useAppSelector((state) => state.TaskReducer.task)
    const id: any = router.query.id
    const [showUpdates, setShowUpdates] = useState<boolean>(false)

    const _theme = useTheme()

    const loadTask = useCallback(() => {
        if (id) {
            dispatch(fetchHiredTask(id))
        }
    }, [dispatch, user, id])


    useEffect(() => {
        loadTask()
    }, [dispatch, user, id])




    return (
        <Layout>
            <Container sx={{

                width: !isSidebarOpen ? '90%' : '80%',
                [_theme.breakpoints.down("sm")]: {
                    width: '97%',
                }
            }}>
                <Header>
                    <Typography sx={{ flex: 1, fontSize: 25, fontWeight: 600 }}>
                        Task
                    </Typography>
                    {!showUpdates && (
                        <TabButton
                            onClick={() => setShowUpdates(!showUpdates)}
                            sx={{
                                display: 'none',
                                [_theme.breakpoints.down('sm')]: {
                                    display: 'flex'
                                }
                            }}>
                            <Add sx={{ mr: .5 }} />
                            Wirte an update
                        </TabButton>
                    )}

                </Header>

                <InnerFlexContainer sx={{ display: showUpdates ? 'block' : 'flex', }}>

                    <AsideLeft sx={{
                        [_theme.breakpoints.down('sm')]: {
                            display: showUpdates ? 'none' : 'block'
                        }
                    }}>
                        <Header>
                            <Typography sx={{ flex: 1, fontSize: 25, fontWeight: 600 }}>
                                CountDown
                            </Typography>
                            <StyledButton sx={{
                                flex: 1,
                                ml: 1,
                                borderRadius: 29
                                , bgcolor: _theme.palette.mode === 'light' ? colors.lime[400] : colorScheme(_theme).primaryColor
                            }}>
                                17 Days Left
                            </StyledButton>
                        </Header>
                        <TaskDetails task={task} />
                        <Typography sx={{ fontSize: 25, mb: 1, fontWeight: 600 }}>
                            Submit
                        </Typography>
                        <StyledBox sx={{
                            minHeight: 100,
                            marginBottom: 1.5,
                            [_theme.breakpoints.down('sm')]: {
                                display: showUpdates ? 'none' : 'block'
                            }
                        }}>
                            <Dropzone>
                                <StyledButton sx={{
                                    borderRadius: 29,
                                    bgcolor: _theme.palette.mode === 'light' ? colors.lime[400] : colorScheme(_theme).primaryColor
                                }}>
                                    Browse Files
                                </StyledButton>
                            </Dropzone>
                            <SubmitFooter>
                                <StyledButton sx={{
                                    flex: 1,
                                    borderRadius: 29
                                    , bgcolor: _theme.palette.mode === 'light' ? colors.lime[400] : colorScheme(_theme).primaryColor
                                }}>
                                    Submit Task
                                </StyledButton>
                            </SubmitFooter>
                        </StyledBox>
                    </AsideLeft>
                    <MainCol
                        className="sideBarAnimated"
                    sx={{
                        [_theme.breakpoints.down('sm')]: {
                            display: showUpdates ? 'block' : 'none'
                        }
                    }}>
                        <MainColHeader>
                            <TabButton onClick={() => setShowUpdates(false)}
                                sx={{
                                    display: 'none',
                                    [_theme.breakpoints.down('sm')]: {
                                        display: 'flex'
                                    }
                                }}
                            >
                                <KeyboardBackspaceIcon sx={{ mr: .5 }} />
                                Back
                            </TabButton>
                            <TabButton>
                                <Add sx={{ mr: .5 }} />
                                Wirte an update
                            </TabButton>
                        </MainColHeader>
                        <UpdateItem>
                            <UpdateHeader>
                                <ChatPersonInfo
                                    fullname="(You) Robert Chingabu "
                                    fullnameStyles={{ fontSize: 14, lineHeight: 1.2, }}
                                    subText='15 Min'
                                    avatarSize={45}
                                    indicatorStyles={{ position: 'absolute', left: 30, bottom: 0 }} />
                            </UpdateHeader>
                        </UpdateItem>
                        <UpdateItem>
                            <UpdateHeader>
                                <ChatPersonInfo
                                    fullname='John Doe'
                                    fullnameStyles={{ fontSize: 14, lineHeight: 1.2, }}
                                    subText='5 Min'
                                    avatarSize={45}
                                    indicatorStyles={{ position: 'absolute', left: 30, bottom: 0 }} />
                            </UpdateHeader>
                        </UpdateItem>

                    </MainCol>
                </InnerFlexContainer>

            </Container>
        </Layout>
    )
}







