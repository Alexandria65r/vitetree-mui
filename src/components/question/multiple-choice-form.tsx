import { Box, Button, MenuItem, Select, colors, styled } from '@mui/material'
import React from 'react'
import { CSS_PROPERTIES } from '../../reusable'
import TextareaAutosize from '@mui/base/TextareaAutosize'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { ChoiceTarget, Question } from '../../reusable/interfaces'
import { updateTestMultipleChoiceThunk, updateTestQuestionThunk } from '../../../reducers/thunks'
import { CustomFormControl, Textarea, } from '../../reusable/styles'



const ChoicesContainer = styled(Box)(({ theme }) => ({
    marginLeft: 20
}))




const MultipleChoiceBadge = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexBasis:40,
    width: 40,
    height: 40,
    margin: 5,
    fontSize: 18,
    fontWeight: 500,
    color: '#ffff',
    borderRadius: '50%',
    backgroundColor: colors.blue[400]
}))
const TextAreaStyled = styled(Textarea)(({ theme }) => ({
    flexBasis: '50%',
    
}))








type Props = {
    question: Question
}

export default function MultipleChoiceForm({ }: Props) {
    const dispatch = useAppDispatch()
    const newTest = useAppSelector((state) => state.TestReducer.newTest);
    const sectionIndex = useAppSelector((state) => state.TestReducer.sectionIndex);
    const questionIndex = useAppSelector((state) => state.TestReducer.questionIndex);
    const question = newTest.sections[sectionIndex].questions[questionIndex]
    const isErr = useAppSelector((state) => state.TestReducer.isErr)

    function handleOnChage(value: string, updateKey: 'question' | 'answer') {
        dispatch(updateTestQuestionThunk({ value, questionIndex, updateKey }))
    }


    function handleChoiceOnChange(value: string, targetKey: ChoiceTarget) {
        dispatch(updateTestMultipleChoiceThunk({
            value,
            targetKey,
            updateKey: 'ans'
        }))
    }

    const choices: any = question?.choices

    return (
        <ChoicesContainer>
            <CustomFormControl>
                <MultipleChoiceBadge>
                    A
                </MultipleChoiceBadge>
                <TextAreaStyled
                    onChange={({ target: { value } }: any) => handleChoiceOnChange(value, 'a')}
                    minRows={2}
                    value={question?.choices?.a.ans}
                    sx={{

                        borderColor: isErr && !choices.a.ans ? colors.red[400] : colors.grey[400]
                    }} placeholder="Choice A" />
            </CustomFormControl>
            <CustomFormControl>
                <MultipleChoiceBadge>
                    B
                </MultipleChoiceBadge>
                <TextAreaStyled minRows={2}
                    onChange={({ target: { value } }: any) => handleChoiceOnChange(value, 'b')}

                    value={question?.choices?.b.ans}
                    sx={{

                        borderColor: isErr && !choices.b.ans ? colors.red[400] : colors.grey[400]
                    }}
                    placeholder="Choice B" />
            </CustomFormControl>
            <CustomFormControl>
                <MultipleChoiceBadge>
                    C
                </MultipleChoiceBadge>
                <TextAreaStyled minRows={2}
                    onChange={({ target: { value } }: any) => handleChoiceOnChange(value, 'c')}
                    value={question?.choices?.c.ans}
                    sx={{

                        borderColor: isErr && !choices.c.ans ? colors.red[400] : colors.grey[400]
                    }}
                    placeholder="Choice C" />
            </CustomFormControl>
            <CustomFormControl>
                <MultipleChoiceBadge>
                    D
                </MultipleChoiceBadge>
                <TextAreaStyled minRows={2}
                    onChange={({ target: { value } }: any) => handleChoiceOnChange(value, 'd')}

                    value={question?.choices?.d.ans}
                    sx={{

                        borderColor: isErr && !choices.d.ans ? colors.red[400] : colors.grey[400]
                    }}
                    placeholder="Choice D" />
            </CustomFormControl>


            <CustomFormControl>
                <MultipleChoiceBadge sx={{
                    width: 'fit-content',
                    padding: '0 10px',
                    borderRadius: 1,
                    fontWeight: 400
                }}>
                    Answer
                </MultipleChoiceBadge>
                <Select
                    onChange={({ target: { value } }: any) => handleOnChage(value, 'answer')}
                    value={question?.answer === '' ? undefined : question?.answer}
                    defaultValue='Ans' size='small'
                    error={isErr && !question.answer}
                >
                    <MenuItem value="Ans">Ans</MenuItem>
                    <MenuItem value="A">A</MenuItem>
                    <MenuItem value="B">B</MenuItem>
                    <MenuItem value="C">C</MenuItem>
                    <MenuItem value="D">D</MenuItem>
                </Select>
            </CustomFormControl>
        </ChoicesContainer>

    )
}