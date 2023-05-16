import React, { useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { fetchInquiryThunk } from '../../../reducers/tutors-reducer/tutors-thunks'
import { Box, Skeleton, Typography, colors, styled, useTheme } from '@mui/material'
import { CSS_PROPERTIES } from '../../reusable'
import { colorScheme } from '../../theme'
import { nomalizedText } from '../../reusable/helpers'
import { StyledButton, StyledButtonOutlined } from '../../reusable/styles'
import { inquiryActions } from '../../../reducers/inquiry-reducer'
import { StudentInquiry, UserSchema } from '../../reusable/schemas'
import { tutorsActions } from '../../../reducers/tutors-reducer'
import InquiredSkeleton from './inquired-skeleton'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'



const Container = styled(Box)(() => ({
    padding: 10,
}))
const Service = styled(Box)(() => ({
    display: 'flex',
    padding: 10,
    marginBottom: 10,
    border: '1px solid ',
    borderRadius: CSS_PROPERTIES.radius5,
    borderColor: colors.teal[400]
}))
const Detailed = styled(Box)(() => ({
    marginBottom: 10,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
}))
const DetailedItemContainer = styled(Box)(({ theme }) => ({
    flexBasis: '33%',
    padding: '5px 15px',
    borderRadius: CSS_PROPERTIES.radius5,
    backgroundColor: theme.palette.mode === 'light' ? colors.grey[300] : colorScheme(theme).primaryColor
}))
const Description = styled(Box)(() => ({
    padding: 10,
}))
const ItemFooter = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 10,
}))



type Props = {
    inquiryId: string
    Footer?: any
}

export default function InquiredItem({ inquiryId, Footer }: Props) {
    const dispatch = useAppDispatch()
    const tutor = useAppSelector((state) => state.TutorsReducer.tutor)
    const inquiry = useAppSelector((state) => state.InquiryReducer.inquiry)
    const _theme = useTheme()


    const loadTutors = useCallback(() => {
        dispatch(fetchInquiryThunk(inquiryId ?? ''))
    }, [inquiryId])


    useEffect(() => {
        loadTutors()
        return () => {
            dispatch(inquiryActions.setInquiry(StudentInquiry))
        }
    }, [inquiryId])





    return (
        <>
            {inquiry._id ? (
                <Container>
                    <Typography sx={{ mb: .5, color: colors.teal[400], fontWeight: 600 }}>
                        Inquired Service
                    </Typography>
                    <Service>
                        <Typography sx={{ flex: 1, fontWeight: 500 }}>
                            {inquiry.service.label}
                        </Typography>
                        <Typography sx={{ color: colors.teal[400] }}>
                            {inquiry.service.price}
                        </Typography>
                    </Service>
                    <Detailed>
                        <DetailedItem title="Topic" text={inquiry.topic ?? ''} />
                        <DetailedItem title="Due Date" text={inquiry.dueDate ?? ''} />

                        <DetailedItemContainer sx={(theme) => ({
                            [theme.breakpoints.down("sm")]: {
                                flexBasis: '100%',
                                mt: 1
                            }
                        })}>
                            <Typography sx={(theme) => ({ fontSize: 14, color: colorScheme(theme).TextColor })}>
                                Subjects
                            </Typography>
                            <Typography sx={{ fontSize: 13, lineHeight: 1.2, color: colors.teal[400] }}>
                                {inquiry?.subjects.map((subject, index) => (
                                    <>
                                        {subject}
                                        {nomalizedText(inquiry?.subjects ?? [], index)}
                                    </>
                                ))}
                            </Typography>
                        </DetailedItemContainer>
                    </Detailed>

                    <Typography sx={{ mb: .5, fontSize: 13, color: colors.teal[400], fontWeight: 600 }}>
                        Description
                    </Typography>
                    <Typography
                        sx={{
                            mb: .5, fontSize: 15,
                            color: _theme.palette.mode === 'light' ? 'graytext' : colorScheme(_theme).TextColor,
                            fontWeight: 500
                        }}>
                        {inquiry.description}
                    </Typography>
                    {Footer ? <Footer /> : <></>}
                </Container>
            ) : <InquiredSkeleton />}
        </>
    )
}

type DetailedItemProps = {
    title: string
    text: string
}
const DetailedItem = ({ title, text }: DetailedItemProps) => (
    <DetailedItemContainer sx={(theme) => ({
        [theme.breakpoints.down("sm")]: {
            flexBasis: '48%'
        }
    })}>
        <Typography sx={(theme) => ({ fontSize: 14, color: colorScheme(theme).TextColor })}>
            {title}
        </Typography>
        <Typography sx={{ fontSize: 13, color: colors.teal[400] }}>
            {text}
        </Typography>
    </DetailedItemContainer>
)

