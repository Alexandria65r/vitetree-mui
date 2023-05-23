import { Box, MenuItem, Select, TextField, colors, styled } from '@mui/material'
import React, { } from 'react'
import SelectWithCheckMarks from '../form-inputs/select-with-checkmarks'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { testActions } from '../../../reducers/test-reducer'
import { Textarea } from '../../reusable/styles'
import { forumActions } from '../../../reducers/forum-reducer'
import { tutorServices } from '../../reusable/helpers'


const ChoicesContainer = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        marginLeft: 0
    }
}))

const TextInput = styled(TextField)(({ theme }) => ({
    flex: 1
}))
const FormContainer = styled(Box)(({ theme }) => ({
    width: '80%',
    padding: 10,
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
    mode: 'post' | "update",
    submitHandler: () => void
}

export default function ForumPostForm({ mode, submitHandler }: Props) {
    const dispatch = useAppDispatch()
    const post = useAppSelector((state) => state.ForumReducer.post)
    const isErr = useAppSelector((state) => state.ForumReducer.isErr)




    function handleService({ target: { name, value } }: any) {
        dispatch(forumActions.setPostProps({
            name: 'service',
            value: {
                ...post.service,
                [name]: value
            }
        }))
    }

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
                    label={post.type === 'academic question' ? 'Question' : 'Title'}
                    placeholder={post.type === 'academic question' ? 'Question' : 'Title'} />
            </FormControl>
            <FormControl>

                <SelectWithCheckMarks error={isErr && !post?.subjects?.length}
                    data={["Chemestry", "Physics", "Math"]}
                    label="Subjects"
                    name="subjects"
                    handleSelectedSection={handleOnChange}
                    value={post.subjects ?? []} />
                {post.type === 'hire tutor' && (
                    <TextInput
                        error={isErr && !post.service?.price}
                        sx={{ flex: 1, marginLeft: 1 }}
                        onChange={handleOnChange}
                        name="dueDate"
                        value={post.dueDate ?? ''}
                        type='date'
                        label="Due Date"
                        placeholder="Due Date"
                    />
                )}

            </FormControl>

            <ChoicesContainer>
                {post.type === 'hire tutor' && (
                    <FormControl>
                        <Select sx={{ flex: 1 }}
                            defaultValue='Service'
                            error={isErr && !post.service}
                            onChange={handleService}
                            value={post.service?.label || undefined}
                            name='label'>
                            <MenuItem value='Service'>Service</MenuItem>
                            {tutorServices.map((service, index) => (
                                <MenuItem key={index} value={service.label}>{service.label}</MenuItem>
                            ))}
                        </Select>

                        <TextInput
                            error={isErr && !post.service?.price}
                            sx={{ flex: 1, marginLeft: 1 }}
                            onChange={handleService}
                            name="price"
                            value={post.service?.price}
                            type='number'
                            label="Budget"
                            placeholder="Budget"
                        />
                    </FormControl>
                )}
                <FormControl>
                    <Textarea minRows={6} value={post.description}
                        name="description"
                        onChange={handleOnChange}
                        sx={{ color: 'inherit', flex: 1, borderColor: isErr && !post.description ? colors.red[400] : colors.grey[400] }}
                        placeholder={`Detailed description`} />
                </FormControl>
            </ChoicesContainer>
        </FormContainer>
    )
}