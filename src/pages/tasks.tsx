import React, { useCallback, useEffect } from 'react'
import Layout from '../components/layout'
import { Box, Typography, styled } from '@mui/material'
import { CSS_PROPERTIES } from '../reusable'
import { colorScheme } from '../theme'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchHiredTasks } from '../../reducers/task-reducer/task-thunks'



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
    const tasks = useAppSelector((state)=>state.TaskReducer.tasks)

    const loadTasks = useCallback(() => dispatch(fetchHiredTasks('all')), [dispatch, user])


    useEffect(() => {
        loadTasks()
    },[dispatch, user])

    return (
        <Layout>
            <Container>
                <Header>
                    <Typography sx={{ fontSize: 25, fontWeight: 600 }}>
                        Tasks
                    </Typography>
                </Header>
                {tasks.map((task, index) => (
                    <TaskItem key={index} onClick={() => router.push(`/task/${task._id}`)}>
                        {task.service.label}
                    </TaskItem>
                ))}
            </Container>
        </Layout>
    )
}