import { Box, colors, styled, useTheme } from '@mui/material'
import React from 'react'
import { ActiveIndicator, StyledBox, StyledButton } from '../../reusable/styles'
import { colorScheme } from '../../theme'
import { CSS_PROPERTIES } from '../../reusable'
import ReusableDropzone from '../reusable-dropzone'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { updateTaskThunk } from '../../../reducers/tasks-reducer/task-thunks'
import { AppSpinner } from '../activity-indicators'





const SubmitFooter = styled(Box)(({ theme }) => ({
    marginTop: 15,
    display: 'flex',
    justifyContent: 'flex-end'
}))


type Props = {

}

export default function SubmitTaskForm({ }: Props) {
    const _theme = useTheme()
    const dispatch = useAppDispatch()
    const dropzoneList = useAppSelector((state) => state.DropzoneReducer.dropzoneList)
    const taskNetworkStatus = useAppSelector((state) => state.TaskReducer.taskNetworkStatus)


    function submitTaskFiles() {
        console.log(dropzoneList)
    }

    return (
        <Box>
            <ReusableDropzone />
            <SubmitFooter>
                <StyledButton
                    onClick={() => dispatch(updateTaskThunk())}

                    sx={{
                        flex: 1,
                        borderRadius: 29
                        , bgcolor: _theme.palette.mode === 'light' ? colors.lime[400] : colorScheme(_theme).primaryColor
                    }}>
                    {taskNetworkStatus === 'update-task' ? 'Submiting files...' : 'Submit Task'}
                    <AppSpinner size={25} visible={taskNetworkStatus === 'update-task'} />
                </StyledButton>
            </SubmitFooter>
        </Box>
    )
}