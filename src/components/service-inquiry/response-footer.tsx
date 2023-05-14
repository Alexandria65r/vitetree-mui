import { Box, MenuItem, Select, TextField, Typography, colors, styled, useTheme } from '@mui/material'
import React from 'react'
import { CustomFormControl, StyledButton, StyledButtonOutlined, TabButton, Textarea } from '../../reusable/styles'
import { inquiryActions } from '../../../reducers/inquiry-reducer'
import { StudentInquiry, UserSchema } from '../../reusable/schemas'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { tutorsActions } from '../../../reducers/tutors-reducer'
import { colorScheme, useColorScheme } from '../../theme'
import { CSS_PROPERTIES } from '../../reusable'
import { KeyboardArrowRightOutlined } from '@mui/icons-material'
import Randomstring from 'randomstring'
import { inquiryFeedbackModel } from '../../models/inquiry-feedback'
import { sendInquiryFeedbackThunk } from '../../../reducers/inquiry-reducer/inquiry-thunks'
import { AppSpinner } from '../activity-indicators'
import ResponseCard from '../inquiry-feedback/response-card'

const Container = styled(Box)(() => ({
    marginTop: 10,
}))
const ItemFooter = styled(Box)(() => ({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
}))





const TextInput = styled(TextField)(({ theme }) => ({

}))


type Props = {}

export default function ResponseFooter({ }: Props) {
    const dispatch = useAppDispatch()
    const [selectedFeedback, setSelectedFeedback] = React.useState<'terms' | 'purchase' | ''>('')
    const _theme = useTheme()
    const inquiry = useAppSelector((state) => state.InquiryReducer.inquiry)
    const inquiryFeedback = useAppSelector((state) => state.InquiryReducer.inquiryFeedback)
    const inquiryNetworkStatus = useAppSelector((state) => state.InquiryReducer.inquiryNetworkStatus)

    function handleClose() {
        dispatch(inquiryActions.setInquiry(StudentInquiry))
        dispatch(tutorsActions.setTutor(UserSchema))
    }

    function handleOnChange({ target: { name, value } }: any) {
        if (name === 'price' || name === 'dueDate') {
            dispatch(inquiryActions.setInquiryFeedbackProps({
                name: 'serviceTerms',
                value: { ...inquiryFeedback.serviceTerms, [name]: value }
            }))
        } else {
            dispatch(inquiryActions.setInquiryFeedbackProps({
                name,
                value
            }))
        }

    }

    function selectFeedbackType(type: 'terms' | 'purchase') {
        const _id = Randomstring.generate(14)
        dispatch(inquiryActions.setInquiryFeedback({
            ...inquiryFeedback,
            _id,
            type: type,
            tutorId: inquiry.tutorId,
            studentId: inquiry.authorId,
            service: inquiry.service,
            inquiryId: inquiry._id,
            serviceTerms: {
                price: inquiry.service.price,
                dueDate: inquiry.dueDate ?? ''
            },
        }))
        setSelectedFeedback(type)
    }

    function sendFeedback() {
        console.log(inquiryFeedback)
        dispatch(sendInquiryFeedbackThunk(inquiryFeedback))
    }


    return (
        <Container>
            <Typography sx={{ mb: .5, color: colors.teal[400], fontWeight: 600 }}>
                Send Feedback to John Doe - student
            </Typography>
            {inquiryFeedback.type ? (
                <Box>
                    <Typography sx={{ textTransform: 'capitalize', mb: .5, fontSize: 14, color: colors.teal[400], fontWeight: 600 }}>
                        {inquiryFeedback.type} Feedback
                    </Typography>
                    {inquiryFeedback.type === 'terms' && (
                        <CustomFormControl>
                            <TextInput sx={{ flexBasis: '48%' }}
                                error={false}
                                type="date"
                                value={inquiryFeedback.serviceTerms.dueDate}
                                onChange={handleOnChange}
                                name="dueDate"
                                label={'Due Date'}
                                placeholder={'Due Date'} />

                            <Select
                                error={false}
                                value={inquiryFeedback.serviceTerms.price}
                                onChange={handleOnChange}
                                name='price'
                                defaultValue='Select Pricing'
                                sx={{ flexBasis: '48%' }}>
                                <MenuItem value="Select Pricing">Select Pricing</MenuItem>
                                <MenuItem value="$9.60">$9.60</MenuItem>
                                <MenuItem value="$12.60">$12.60</MenuItem>
                                <MenuItem value="$24.60">$24.60</MenuItem>
                                <MenuItem value="Free">Free</MenuItem>
                            </Select>
                        </CustomFormControl>

                    )}

                    <CustomFormControl>
                        <Textarea
                            minRows={6}
                            value={inquiryFeedback.description}
                            name="description"
                            maxLength={300}
                            onChange={handleOnChange}
                            sx={{ color: 'inherit', flex: 1, borderColor: colors.grey[400] }}
                            placeholder={`Message`} />
                    </CustomFormControl>
                    <CustomFormControl sx={{ justifyContent: 'flex-end' }}>
                        <StyledButtonOutlined
                            onClick={() => dispatch(inquiryActions.setInquiryFeedback(inquiryFeedbackModel))}
                            sx={{
                                flexBasis: '25%', mr: 2,
                                [_theme.breakpoints.down("sm")]: {
                                    flexBasis: '49%',
                                }
                            }}>
                            Cancel
                        </StyledButtonOutlined>
                        <StyledButton
                            onClick={sendFeedback}
                            sx={{
                                flexBasis: '25%',
                                [_theme.breakpoints.down("sm")]: {
                                    flexBasis: '49%',
                                }
                            }}>
                            Send Feedback <AppSpinner
                                visible={inquiryNetworkStatus === 'send-inquiry-feedback'}
                            />
                        </StyledButton>
                    </CustomFormControl>
                </Box>
            ) : (
                <ItemFooter>
                    <ResponseCard
                        title="Change Terms Feedback"
                        clickHandler={() => selectFeedbackType('terms')}
                        description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, deserunt?'
                    />
                    <ResponseCard
                        title="Purchase Feeback"
                        clickHandler={() => selectFeedbackType('purchase')}
                        description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, deserunt?'
                    />
                </ItemFooter>
            )}

        </Container >
    )
}

