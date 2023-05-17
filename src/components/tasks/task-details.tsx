import { Box, Typography, styled } from '@mui/material'
import React from 'react'
import task from '../../api-services/task'
import ChatPersonInfo from '../chat-person-info'
import ChangeTaskStatus from '../menus/task-status-button'
import { useAppSelector } from '../../../store/hooks'
import TitledItem from '../titled-item'
import { CSS_PROPERTIES } from '../../reusable'
import { StyledBox } from '../../reusable/styles'
import { colorScheme } from '../../theme'
import { Task } from '../../models/task'


const Container = styled(StyledBox)(({ theme }) => ({
    minHeight: 100,
    padding: 10,
    marginBottom: 15,
    borderRadius: CSS_PROPERTIES.radius10,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : colorScheme(theme).secondaryColor
}))

type Props = {
    task: Task
}

export default function TaskDetails({ task }: Props) {
    const user = useAppSelector((state) => state.AuthReducer.user)
    return (
        <Container sx={{}}>
            <ChatPersonInfo
                fullname={user.role === 'student' ? task.tutorInfo.name : task.studentInfo.name}
                fullnameStyles={{ fontSize: 30, textTransform: 'capitalize', lineHeight: 1.2, fontWeight: 600 }}
                subText='Zambia - Lusaka 15:09'
                avatarSize={100}
                indicatorStyles={{ position: 'absolute', left: 80, bottom: 10 }} />
            <Box sx={{ width: '100%', mt: 1, display: 'flex', flexWrap: 'wrap', rowGap: 1, justifyContent: 'space-around' }}>
                <Typography sx={{ textTransform: 'capitalize', flexBasis: '100%', mb: 1, fontSize: 18, fontWeight: 600 }}>
                    {task.service.label}
                </Typography>
                <TitledItem title='Subjects' value="Math" />
                <TitledItem title='Topic' value="Trignometry" />
                <TitledItem title='Price' value={task.service.price} />
                <TitledItem title='Due Date' value={task.dueDate} />
                <ChangeTaskStatus task={task} />

            </Box>
        </Container>
    )
}