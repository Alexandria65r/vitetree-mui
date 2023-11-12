import React from 'react'
import { TaskStatus } from '../../models/task'
import SubmitTaskForm from '../../components/tasks/submit-task-form'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import FileItem from './file-item'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { removeSubmittedFileThunk } from '../../../reducers/tasks-reducer/task-thunks'


type Props = {
    status: TaskStatus
}

export default function TutorTaskActions({ status }: Props) {
    const task = useAppSelector((state) => state.TaskReducer.task)
    const dispatch = useAppDispatch()
    return (
        <>
            {status === 'completed' && <SubmitTaskForm />}
            {status === 'submitted' || status === 'task closed' && (
                <>
                    {task.delivered?.files.map((item, index) => (
                        <FileItem
                            key={index} item={item}
                            isLoading={item.status === 'deleting'}
                            hideButton={status === 'task closed'}
                            buttonIcon={<CloseOutlinedIcon />}
                            onClick={() => dispatch(removeSubmittedFileThunk(item))}
                        />
                    ))}
                </>
            )}
        </>
    )
}