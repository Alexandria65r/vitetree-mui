import React, { useCallback, useEffect } from 'react'
import Layout from '../components/layout'
import { Box, Skeleton, Typography, styled } from '@mui/material'
import { CSS_PROPERTIES } from '../reusable'
import { colorScheme, useColorScheme } from '../theme'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import ChatPersonInfo from '../components/user/chat-person-info'
import { ButtonIcon, StyledBox, StyledButton } from '../reusable/styles'
import { getSwapedTaskUserInfo } from '../reusable/helpers'
import { fetchHiredTasks } from '../../reducers/tasks-reducer/task-thunks'
import ChangeTaskStatus from '../components/menus/task-status-button'
import { RxOpenInNewWindow } from 'react-icons/rx'
import { FormatMoney } from 'format-money-js'

const Container = styled(Box)(({ theme }) => ({
    width: '60%',
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

    [theme.breakpoints.down("sm")]: {

    }
}))
const AsideLeft = styled(Box)(({ theme }) => ({
    flexBasis: '30%',

    [theme.breakpoints.down("sm")]: {

    }
}))
const MainCol = styled(Box)(({ theme }) => ({
    flex: 1,
    marginLeft: 25,

    [theme.breakpoints.down("sm")]: {

    }
}))


const TaskItem = styled(Box)(({ theme }) => ({
    height: 100,
    display: 'flex',
    alignItems: 'center',
    marginBottom: 15,
    borderRadius: CSS_PROPERTIES.radius10,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : colorScheme(theme).secondaryColor
}))


type Props = {}

export default function Tasks({ }: Props) {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const user = useAppSelector((state) => state.AuthReducer.user)
    const tasks = useAppSelector((state) => state.TaskReducer.tasks)
    const taskNetworkStatus = useAppSelector((state) => state.TaskReducer.taskNetworkStatus)

    const loadTasks = useCallback(() => dispatch(fetchHiredTasks('all')), [dispatch, user])
    const colorScheme = useColorScheme()


    useEffect(() => {
        loadTasks()
    }, [dispatch, user])

    const fm = new FormatMoney({ decimals: 2 })

    function EstimatedEarning() {
        return tasks.reduce((s, i) => {
            return s + parseFloat(i.service.price)
        }, 0)

    }
    
    const total:any = fm.from(EstimatedEarning()) 
    return (
        <Layout>
            <Container>
                <Header>
                    <Typography sx={{ fontSize: 25, fontWeight: 600 }}>
                        Tasks
                    </Typography>
                </Header>
                {taskNetworkStatus !== 'fetch-tasks' && tasks.length ? (<>
                    {tasks.map((task, index) => (
                        <StyledBox key={index} onClick={() => router.push(`/task/${task._id}`)}
                            sx={{ display: 'flex', alignItems: 'center', mb: 1, cursor: 'pointer' }}
                        >
                            <Box sx={{ flex: 1 }}>
                                <ChatPersonInfo
                                    userId={getSwapedTaskUserInfo(user.role, task).id}
                                    fullname={getSwapedTaskUserInfo(user.role, task).name}
                                    fullnameStyles={{ fontSize: 14, textTransform: 'capitalize', lineHeight: 1.2, }}
                                    subText={task.service.label}
                                    avatarSize={55}
                                    indicatorStyles={{ position: 'absolute', left: 30, bottom: 0 }} />
                            </Box>
                            <Box sx={(theme) => ({
                                flex: 1,
                                display: 'flex',
                                alignItems: 'center',
                                [theme.breakpoints.down('sm')]: {
                                    width: 'calc(100vw - 50%)',
                                    overflowX: 'auto'
                                }
                            })}>
                                <Typography sx={{ flex: 1, fontSize: 18, textAlign: 'center', fontWeight: 500, color: colorScheme.TextColor }}>
                                    ${task.service.price}
                                </Typography>
                                <Box sx={{ flexBasis: '60%', mr: .5, }}>
                                    <ChangeTaskStatus role={user.role} task={task} />
                                </Box>
                            </Box>

                        </StyledBox>
                    ))}
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                        <StyledBox sx={(theme) => ({
                            display: 'flex',
                            alignItems: 'center',
                            width: '67%',
                            [theme.breakpoints.down('sm')]: {
                                width: '87%',
                            }
                        })}>
                            <Typography sx={{ flex: 1, fontWeight: 600, mr: .4 }}>
                                Estimated Earning:  ${total}
                            </Typography>
                            <StyledButton>
                                More  <RxOpenInNewWindow size={20} />
                            </StyledButton>
                        </StyledBox>
                    </Box>


                </>) : taskNetworkStatus === 'fetch-tasks' && !tasks.length ?
                    (<>
                        {[1, 2, 3, 4].map((item) => (
                            <StyledBox key={item} sx={{ my: 1, display: 'flex', alignItems: 'center' }}>
                                <Skeleton width={55} height={90} sx={{ borderRadius: '50%', my: -3 }} />
                                <Skeleton width={255} height={25} sx={{ ml: 1, my: -3 }} />
                            </StyledBox>
                        ))}
                    </>) : (<>
                    </>)}
            </Container>
        </Layout>
    )
}

