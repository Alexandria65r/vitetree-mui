import { Box, TextField, colors, styled } from '@mui/material'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { updateTestQuestionThunk } from '../../../reducers/thunks'
import { CustomFormControl } from '../../reusable/styles'

const TextInput = styled(TextField)(() => ({

}))

const MultipleChoiceBadge = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    margin: 5,
    fontSize: 18,
    fontWeight: 500,
    color: '#ffff',
    borderRadius: '50%',
    backgroundColor: colors.blue[400]
}))





type Props = {}

export default function WithOneWordAnswer({ }: Props) {
    const dispatch = useAppDispatch()
    const newTest = useAppSelector((state) => state.TestReducer.newTest);
    const sectionIndex = useAppSelector((state) => state.TestReducer.sectionIndex);
    const questionIndex = useAppSelector((state) => state.TestReducer.questionIndex);
    const question = newTest.sections[sectionIndex].questions[questionIndex]
    const isErr = useAppSelector((state) => state.TestReducer.isErr)

    function handleOnChage(value: string, updateKey: 'question' | 'answer') {
        dispatch(updateTestQuestionThunk({ value, questionIndex, updateKey }))
    }

    return (
        <CustomFormControl>
            <MultipleChoiceBadge sx={{
                width: 'fit-content',
                padding: '0 10px',
                borderRadius: 1,
                fontWeight: 400
            }}>
                Answer
            </MultipleChoiceBadge>
            <TextInput
                variant='outlined'
                error={isErr && !question?.answer}
                value={question?.answer}
                onChange={({ target: { value } }: any) => handleOnChage(value, 'answer')}
                size='small'
                sx={{ flexBasis: '60%' }}
                placeholder='Word only' label="word answer" />
        </CustomFormControl>
    )
}