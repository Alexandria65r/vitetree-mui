import { Box, Button, MenuItem, Select, TextField, TextareaAutosize, Typography, colors, styled } from '@mui/material'
import React from 'react'
import { CSS_PROPERTIES } from '../../reusable'

import { colorScheme } from '../../theme'
import { Question } from '../../reusable/interfaces'



const DiagramContainer = styled(Box)(({ theme }) => ({
    marginLeft: 20
}))
const Diagram = styled(Box)(({ theme }) => ({
    height: 300,
    backgroundColor: colorScheme(theme).primaryToGrey100Color
}))

const TextInput = styled(TextField)(({ theme }) => ({
    flex: 1
}))
const FormContainer = styled(Box)(({ theme }) => ({
    padding: 10,
}))
const FormControl = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0'
}))
const QuestionNumber = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    margin: 5,
    borderRadius: '50%',
    backgroundColor: colors.grey[300]
}))
const MultipleChoiceBadge = styled(Box)(({ theme }) => ({
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

const QuestionNumberText = styled(Typography)(() => ({
    fontSize: 20,
    fontWeight: 500,
    color: '#ffff'
}))
const Textarea = styled(TextareaAutosize)(({ theme }) => ({
    padding: 10,
    resize: 'none',
    fontFamily: 'inherit',
    outline: 'none',
    borderRadius: CSS_PROPERTIES.radius5,
    borderColor: theme.palette.grey[400]
}))

const StyledButton = styled(Button)(({ theme }) => ({
    textTransform: 'capitalize',
    height: 45,
    borderRadius: 5,
    [theme.breakpoints.down('sm')]: {
        flexBasis: '100%',
        borderRadius: 5,
        margin: '6px 0'
    }
}))



type Props = {
    question: Question
}

export default function WithDiagram({ question }: Props) {
    return (
        <FormContainer>
            <FormControl >
                <QuestionNumber>
                    <QuestionNumberText>1</QuestionNumberText>
                </QuestionNumber>
                <TextInput
                    value={question.diagram?.description ?? ''}
                    fullWidth
                    variant='outlined'
                    placeholder='Diagram description'
                    label="Diagram description" />
            </FormControl>

            <DiagramContainer>
                <Diagram />
            </DiagramContainer>

        </FormContainer>
    )
}