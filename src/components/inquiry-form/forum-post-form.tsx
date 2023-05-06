import { Box, TextField, colors, styled } from '@mui/material'
import React, { } from 'react'
import SelectWithCheckMarks from '../form-inputs/select-with-checkmarks'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { testActions } from '../../../reducers/test-reducer'
import { StyledButton, Textarea } from '../../reusable/styles'
import { forumActions } from '../../../reducers/forum-reducer'
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';

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



type Props = {
    //  mode: 'post' | "update",
    submitHandler: () => void
}

export default function InquiryForm({ submitHandler }: Props) {
    const dispatch = useAppDispatch()
    const post = useAppSelector((state) => state.ForumReducer.post)
    const isErr = useAppSelector((state) => state.ForumReducer.isErr)




    function handleOnChange({ target: { name, value } }: any) {
        dispatch(forumActions.setPostProps({
            name,
            value
        }))
    }


    function handleSubmit() {
        if (!(post.type && post.description && post.title)) {
            console.log('rrr')
            dispatch(testActions.setError(true))
            return true
        } else {
            dispatch(testActions.setError(false))
            submitHandler()
            return false
        }
    }



    return (
        <FormContainer>
            <FormControl>
                <TextInput sx={{ flexBasis: '50%' }}
                    error={isErr && !post.title
                    }
                    value={post.title}
                    onChange={handleOnChange}
                    name="title"
                    label={'Topic'}
                    placeholder={'Topic'} />
            </FormControl>
            <FormControl>

                <SelectWithCheckMarks error={isErr && !post?.subjects?.length}
                    data={["Chemestry", "Physics", "Math"]}
                    label="Subjects"
                    name="subjects"
                    handleSelectedSection={handleOnChange}
                    value={post.subjects ?? []} />


                <TextInput sx={{ flex: 1, ml: 1 }}
                    error={isErr && !post.title
                    }
                    type="date"
                    value={post.title}
                    onChange={handleOnChange}
                    name="title"
                    label={'Due Date'}
                    placeholder={'Due Date'} />

            </FormControl>

            <ChoicesContainer>
                <FormControl>
                    <Textarea minRows={6} value={post.description}
                        name="description"
                        onChange={handleOnChange}
                        sx={{ color: 'inherit', flex: 1, borderColor: isErr && !post.description ? colors.red[400] : colors.grey[400] }}
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