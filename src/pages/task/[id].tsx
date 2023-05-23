import React, { useCallback, useEffect, useState } from 'react'
import Layout from '../../components/layout'
import { Box, Typography, colors, styled, useMediaQuery, useTheme } from '@mui/material'
import { colorScheme } from '../../theme'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { StyledBox, StyledButton, TabButton } from '../../reusable/styles'
import { Add } from '@mui/icons-material'
import TaskDetails from '../../components/tasks/task-details'

import SubmitTaskForm from '../../components/tasks/submit-task-form'
import SubmitedTaskFiles from '../../components/tasks/submited-task-files'
import { Descendant } from 'slate'
import TaskUpdates from '../../components/tasks/task-updates'
import { fetchHiredTask } from '../../../reducers/tasks-reducer/task-thunks'

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
    //paddingInline: 10,
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



type Props = {}

export default function Task({ }: Props) {

    const dispatch = useAppDispatch()
    const router = useRouter()
    const isSidebarOpen = useAppSelector((state) => state.MainReducer.isSidebarOpen)
    const user = useAppSelector((state) => state.AuthReducer.user)
    const task = useAppSelector((state) => state.TaskReducer.task)
    const isMobile = useMediaQuery('(max-width:600px)')
    const id: any = router.query.id
    const [showUpdates, setShowUpdates] = useState<boolean>(false)

    const _theme = useTheme()
    const editorInitialValue: Descendant[] = [
        { type: "paragraph", children: [{ text: "" }] },
    ];
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

                <InnerFlexContainer sx={{ display: showUpdates && isMobile ? 'block' : 'flex', }}>

                    <AsideLeft sx={{
                        [_theme.breakpoints.down('sm')]: {
                            display: showUpdates ? 'none' : 'block'
                        }
                    }}>
                        <Header>
                            {/* <Typography sx={{ flex: 1, fontSize: 25, fontWeight: 600 }}>
                                Countdown
                            </Typography> */}
                            <StyledButton sx={{
                                flexBasis: '46%',
                                borderRadius: 29
                                , bgcolor: _theme.palette.mode === 'light' ? colors.lime[400] : colorScheme(_theme).primaryColor
                            }}>
                                17 Days Left
                            </StyledButton>
                        </Header>
                        <TaskDetails task={task} />
                        <Typography sx={{ fontSize: 20, mb: 1, fontWeight: 500 }}>
                            {user.role === 'student' ? 'Submited' : ' Submit'} Files
                        </Typography>
                        <StyledBox
                            sx={{
                                minHeight: 100,
                                marginBottom: 1.5,
                                [_theme.breakpoints.down('sm')]: {
                                    display: showUpdates ? 'none' : 'block'
                                }
                            }}
                        >
                            {user.role === 'student' && <SubmitedTaskFiles />}
                            {user.role === 'tutor' && <SubmitTaskForm />}

                        </StyledBox>
                    </AsideLeft>
                    <MainCol
                        className="sideBarAnimated"
                        sx={{
                            [_theme.breakpoints.down('sm')]: {
                                display: showUpdates ? 'block' : 'none'
                            }
                        }}>
                        <TaskUpdates setShowUpdates={setShowUpdates} />
                    </MainCol>
                </InnerFlexContainer>

            </Container>
        </Layout>
    )
}







