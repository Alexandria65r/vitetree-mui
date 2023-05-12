import { Box, Typography, colors, styled, useTheme } from '@mui/material'
import React from 'react'
import { CustomFormControl, StyledButton, StyledButtonOutlined, TabButton, Textarea } from '../../reusable/styles'
import { inquiryActions } from '../../../reducers/inquiry-reducer'
import { StudentInquiry, UserSchema } from '../../reusable/schemas'
import { useAppDispatch } from '../../../store/hooks'
import { tutorsActions } from '../../../reducers/tutors-reducer'
import { colorScheme, useColorScheme } from '../../theme'
import { CSS_PROPERTIES } from '../../reusable'
import { Close, KeyboardArrowRightOutlined } from '@mui/icons-material'

const Container = styled(Box)(() => ({
    marginTop: 10,
}))
const ItemFooter = styled(Box)(() => ({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
}))

const ResponseCard = styled(Box)(({ theme }) => ({
    flexBasis: '49%',
    minHeight: 120,
    borderRadius: CSS_PROPERTIES.radius5,
    padding: 10,
    border: `1px solid ${colorScheme(theme).borderColor}`,
    [theme.breakpoints.down("sm")]: {
        flexBasis: '100%',
        marginBottom: 10
    }
}))


type Props = {}

export default function ResponseFooter({ }: Props) {
    const dispatch = useAppDispatch()
    const [selectedFeedback, setSelectedFeedback] = React.useState<'terms' | 'purchase' | ''>('')
    const _theme = useTheme()
    function handleClose() {
        dispatch(inquiryActions.setInquiry(StudentInquiry))
        dispatch(tutorsActions.setTutor(UserSchema))
    }


    return (
        <Container>
            <Typography sx={{ mb: .5, color: colors.teal[400], fontWeight: 600 }}>
                Send Feedback to John Doe - student
            </Typography>
            {selectedFeedback ? (
                <Box>
                    <Typography sx={{ textTransform: 'capitalize', mb: .5, fontSize: 14, color: colors.teal[400], fontWeight: 500 }}>
                        {selectedFeedback} Feedback
                    </Typography>
                    <CustomFormControl>
                        <Textarea
                            minRows={6}
                            value={''}
                            name="Message"
                            maxLength={300}
                            onChange={() => { }}
                            sx={{ color: 'inherit', flex: 1, borderColor: colors.grey[400] }}
                            placeholder={`Message`} />
                    </CustomFormControl>
                    <CustomFormControl sx={{ justifyContent: 'flex-end' }}>
                        <StyledButtonOutlined
                            onClick={() => setSelectedFeedback('')}
                            sx={{
                                flexBasis: '25%', mr: 2,
                                [_theme.breakpoints.down("sm")]: {
                                    flexBasis: '49%',
                                }
                            }}>
                            Cancel
                        </StyledButtonOutlined>
                        <StyledButton sx={{
                            flexBasis: '25%',
                            [_theme.breakpoints.down("sm")]: {
                                flexBasis: '49%',
                            }
                        }}>
                            Send Feedback
                        </StyledButton>
                    </CustomFormControl>
                </Box>
            ) : (
                <ItemFooter>
                    <RenderResponseCard
                        title="Terms Feedback"
                        clickHandler={() => setSelectedFeedback('terms')}
                        description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, deserunt?'
                    />
                    <RenderResponseCard
                        title="Purchase Feeback"
                        clickHandler={() => setSelectedFeedback('purchase')}
                        description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, deserunt?'
                    />
                </ItemFooter>
            )}

        </Container >
    )
}

type RenderResponseCardProps = {
    title: string,
    description: string
    clickHandler: () => void
}
const RenderResponseCard = ({ title, description, clickHandler }: RenderResponseCardProps) => {
    const _colorScheme = useColorScheme()
    return (
        <ResponseCard>
            <Typography sx={{ mb: .5, fontSize: 14, color: colors.teal[400], fontWeight: 500 }}>
                {title}
            </Typography>
            <Typography sx={{ my: 1, fontSize: 13, color: _colorScheme.TextColor }}>
                {description}
            </Typography>
            <Box sx={(theme) => ({
                display: 'flex',
                justifyContent: 'flex-end',
                [theme.breakpoints.down("sm")]: {

                }
            })}>
                <StyledButtonOutlined onClick={clickHandler}>
                    Send Feedback <KeyboardArrowRightOutlined />
                </StyledButtonOutlined>
            </Box>

        </ResponseCard>
    )
}