import { Box, TextField, styled } from '@mui/material'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { StyledButton } from '../../reusable/styles'
import { courseActions } from '../../../reducers/course-reducer'

const ChoicesContainer = styled(Box)(({ theme }) => ({
    //marginLeft: 20,
    [theme.breakpoints.down('sm')]: {
        marginLeft: 0
    }
}))

const TextInput = styled(TextField)(() => ({
    marginTop: 5
}))
const FormContainer = styled(Box)(() => ({
    width: '100%',
    padding: 10,
}))

const FormControl = styled(Box)(() => ({
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '20px 0'
}))
const Label = styled('label')(() => ({
    flexBasis: '100%',
    fontSize: 14
}))







type Props = {
   
}

export default function CreditCardForm({ }: Props) {
    const dispatch = useAppDispatch()
    const newTest = useAppSelector((state) => state.TestReducer.newTest)
    const isErr = useAppSelector((state) => state.TestReducer.isErr)
    const course = useAppSelector((state) => state.CourseReducer.video)
    

    function handleOnChange({ target: { name, value } }: any) {
        dispatch(courseActions.setVideoProperties({
            name,
            value
        }))
    }


    function handleSubmit() {
        if (!(course.title && course.description && course.imageAsset.secureURL && course.vidAsset.secureURL)) {
            console.log('rrr')
            dispatch(courseActions.setError(true))
            return true
        } else {
            dispatch(courseActions.setError(false))
            
            return false
        }
    }






    return (
        <FormContainer>
            <ChoicesContainer>

                <FormControl>
                    <Label sx={{ flexBasis: '100%', }}>Card number</Label>
                    <TextInput sx={{ flexBasis: '100%' }}
                        error={isErr && !course.title
                        }
                        value={course.title}
                        onChange={handleOnChange}
                        name="title"
                        label='Card number'
                        placeholder='1234 1234 1234 1234' />
                </FormControl>
                <FormControl>
                    <Box sx={{ flexBasis: '48%' }}>
                        <Label sx={{ flexBasis: '48%', }}>Expires</Label>
                        <TextInput fullWidth
                            error={isErr && !course.title
                            }
                            value={course.title}
                            onChange={handleOnChange}
                            name="title"
                            label='Expiring Date'
                            placeholder='MM/YY' />
                    </Box>
                    <Box sx={{ flexBasis: '48%' }}>
                        <Label sx={{ flexBasis: '48%', }}>cvc</Label>
                        <TextInput fullWidth
                           
                            error={isErr && !course.title
                            }
                            value={course.title}
                            onChange={handleOnChange}
                            name="title"
                            label='CVC'
                            placeholder='CVC' />
                    </Box>

                </FormControl>


                <FormControl onClick={handleSubmit} sx={{ justifyContent: 'flex-end' }}>
                    <StyledButton sx={{ px: 2 }}>
                        Continue
                    </StyledButton>
                </FormControl>
            </ChoicesContainer>
        </FormContainer>
    )
}