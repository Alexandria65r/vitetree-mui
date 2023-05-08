import { Box, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, TextField, Typography, colors, styled } from '@mui/material'
import React, { useCallback, useEffect } from 'react'
import SelectWithCheckMarks from '../form-inputs/select-with-checkmarks'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { testActions } from '../../../reducers/test-reducer'
import { StyledButton, Textarea } from '../../reusable/styles'
import { forumActions } from '../../../reducers/forum-reducer'
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import { colorScheme } from '../../theme'
import { CSS_PROPERTIES } from '../../reusable'
import { TutorService } from '../../reusable/interfaces'
import { inquiryActions } from '../../../reducers/inquiry-reducer'

const ChoicesContainer = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        marginLeft: 0
    }
}))

const TextInput = styled(TextField)(({ theme }) => ({
    flex: 1
}))
const FormContainer = styled(Box)(({ theme }) => ({
    // width: '80%',
    //padding: 10,
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
        width: '97%'
    }
}))
const FormControl = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '20px 0'
}))


const MenuItemButton = styled(MenuItem)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    fontSize: 16,
    fontWeight: 600,
    margin: '5px 0',
    padding: '8px 15px',
    color: colorScheme(theme).TextColor,
    borderRadius: CSS_PROPERTIES.radius10,
    borderStyle: 'solid',
    borderWidth: 1,
    '&:hover': {
        backgroundColor: 'transparent',
        border: `1px solid ${theme.palette.mode === 'light' ? colors.teal[400] : colorScheme(theme).bgColor}`,
    },
    [theme.breakpoints.down('sm')]: {
        padding: '10px 15px',
    }
}))



type Props = {
    //  mode: 'post' | "update",
    submitHandler: () => void
}

export default function InquiryForm({ submitHandler }: Props) {
    const dispatch = useAppDispatch()
    const inquiry = useAppSelector((state) => state.InquiryReducer.inquiry)
    const isErr = useAppSelector((state) => state.InquiryReducer.isErr)




    function handleOnChange({ target: { name, value } }: any) {
        if (name === 'service') {
            const selected = tutorServices.find((service) => service.value === value)
            dispatch(inquiryActions.setInquiryProps({
                name,
                value: selected
            }))
        } else {
            dispatch(inquiryActions.setInquiryProps({
                name,
                value
            }))
        }
    }

    const disptchServiceMessage = useCallback(() => {
        let message
        switch (inquiry.service.value) {
            case 'class':
                message = classMessage(inquiry.dueDate ?? '', inquiry.subjects[0] ?? '')
                break
            case 'assignment':
                message = assignMentMessage(inquiry.dueDate ?? '')
                break
            case 'course':
                message = couseMessage(inquiry.dueDate ?? '', inquiry.topic ?? '')
                break
        }

        dispatch(inquiryActions.setInquiryProps({
            name: 'description',
            value: message?.toString()
        }))

    }, [dispatch, inquiry.dueDate, inquiry.topic, inquiry.service.value])

    useEffect(() => {
        disptchServiceMessage()
    }, [dispatch, inquiry.dueDate, inquiry.topic, inquiry.service.value])



    function handleSubmit() {
        if (!(inquiry.service.value)) {
            dispatch(inquiryActions.setError(true))
            return true
        } else {
            dispatch(inquiryActions.setError(false))
            console.log(inquiry)
            return false
        }
    }



    return (
        <FormContainer>
            <FormLabel sx={{ fontSize: 16, fontWeight: 600, my: .5, color: colors.teal[400], }} id="demo-controlled-radio-buttons-group">
                Select Service
            </FormLabel>
            <RadioGroup
                sx={{ flex: 1 }}
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="service"
                onChange={handleOnChange}
            >

                {tutorServices.map((service, index) => (
                    <TutorService
                        service={service}
                        error={isErr && !inquiry.service.value}
                    />
                ))}
            </RadioGroup>

            {inquiry.service.value !== 'assignment' && (
                <FormControl>
                    <TextInput sx={{ flexBasis: '50%' }}
                        error={isErr && !inquiry.topic}
                        value={inquiry.topic}
                        onChange={handleOnChange}
                        name="topic"
                        label={'Topic'}
                        placeholder={'Topic'} />
                </FormControl>
            )}
            <FormControl>

                <SelectWithCheckMarks error={isErr && !inquiry.subjects}
                    data={["Chemestry", "Physics", "Math"]}
                    label="Subjects"
                    name="subjects"
                    handleSelectedSection={handleOnChange}
                    value={inquiry.subjects ?? []}
                />


                <TextInput sx={{ flex: 1, ml: 1 }}
                    error={isErr && !inquiry.dueDate
                    }
                    type="date"
                    value={inquiry.dueDate}
                    onChange={handleOnChange}
                    name="dueDate"
                    label={'Due Date'}
                    placeholder={'Due Date'} />

            </FormControl>

            <ChoicesContainer>
                <FormControl>
                    <Textarea
                        minRows={6}
                        value={inquiry.description}
                        name="description"
                        onChange={handleOnChange}
                        sx={{ color: 'inherit', flex: 1, borderColor: isErr && !inquiry.description ? colors.red[400] : colors.grey[400] }}
                        placeholder={`Detailed description`} />
                </FormControl>
                <FormControl>
                    <StyledButton

                        sx={{
                            px: 1,
                            flexBasis: '49%',
                            fontSize: 15,
                            color: colors.teal[400],
                            border: 1,
                            borderColor: colors.teal[400],
                            backgroundColor: 'transparent',
                            transition: '0.3s all',
                            '&:hover': {
                                color: '#fff',
                                backgroundColor: colors.teal[400]
                            }
                        }}>
                        Cancel
                    </StyledButton>
                    <StyledButton
                        onClick={handleSubmit}
                        sx={{
                            px: 1,
                            flexBasis: '49%',
                            fontSize: 15,
                            border: 1,
                            borderColor: colors.teal[400],
                        }}>
                        <AddCommentOutlinedIcon fontSize='small' sx={{ mr: 1 }} />
                        Send Inquiry
                    </StyledButton>
                </FormControl>
            </ChoicesContainer>
        </FormContainer>
    )
}


type TutorServiceProps = {
    service: TutorService
    error: boolean

}

function TutorService({ service, error }: TutorServiceProps) {
    return (
        <MenuItemButton
            sx={(theme) => ({
                borderColor: error ? colors.red[400] :
                    `${theme.palette.mode === 'light' ? '#ddd' : colorScheme(theme).bgColor}`
            })}>
            <FormControlLabel sx={{ flex: 1 }}
                value={service.value} control={<Radio sx={RadioStyles} />} label={service.label} />
            <Typography sx={{ color: colors.teal[400] }}>{service.price}</Typography>
        </MenuItemButton>
    )
}

const RadioStyles = {
    color: '#ddd',
    '&.Mui-checked': {
        color: colors.teal[400]
    }
}

const tutorServices = [
    {
        name: '',
        perHour: true,
        price: '$24.60',
        label: 'Private class',
        value: 'class'
    },
    {
        name: '',
        perHour: false,
        price: '$15.60',
        label: 'Assignment solving',
        value: 'assignment'
    },
    {
        name: '',
        perHour: true,
        price: '$9.60',
        label: 'Video tutorial',
        value: 'course'
    }
]


const classMessage = (dueDate: string, subjects: string) => {
    if (!dueDate && !subjects) return ''
    return (
`Hi, i need you to conduct a private class/face to face where you will
teach me various topics in the following subjects ${subjects}. Class should be
conducted not after ${dueDate} please give me feedback as soon as possible.
`)
}


const assignMentMessage = (dueDate: string) => (
`Hi, i need you to solve an assignment for me, which should be ready
by ${dueDate} you will find the the assignment in the attatchment folder
please give me feedback as soon as possible.
`
)

const couseMessage = (dueDate: string, topic: string) => (
`Hi, i need you to prepare a video tutorial for me on the the topic ${topic}
which should be ready by ${dueDate} please give me feedback as soon as possible.
`
)