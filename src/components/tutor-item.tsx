import { Box, Skeleton, SxProps, Theme, Typography, colors, styled, useTheme } from '@mui/material'
import React from 'react'
import { CSS_PROPERTIES } from '../reusable'
import { colorScheme } from '../theme'
import { ButtonIcon, StyledButton, StyledButtonOutlined } from '../reusable/styles'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import { User } from '../reusable/interfaces'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { tutorsActions } from '../../reducers/tutors-reducer'
import { inquiryActions } from '../../reducers/inquiry-reducer'
import Randomstring from 'randomstring'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { nomalizedText } from '../reusable/helpers'
import { useRouter } from 'next/router'
import { StudentInquiry } from '../reusable/schemas'
import Link from 'next/link'
import UserAvatar from './user/user-avatar'
import { East } from '@mui/icons-material'



const TutorContainer = styled(Box)(({ theme }) => ({
    padding: 10,
    flexBasis: '49%',
    gridTemplateColumns: 'repeat(2,1fr)',
    borderRadius: CSS_PROPERTIES.radius10,
    backgroundColor: colorScheme(theme).secondaryColor,
    boxShadow: `0 1px 3px 0px ${theme.palette.mode === 'light' ? '#ddd' : 'transparent'}`,
    flexWrap: 'wrap',
    alignContent: 'center',
    [theme.breakpoints.down("sm")]: {

    }
}))

const TutorItemBody = styled(Box)(({ theme }) => ({
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    flexBasis: '100%',
    [theme.breakpoints.down("sm")]: {

    }
}))
const ItemFooter = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    margin: 0,
    borderRadius: CSS_PROPERTIES.radius10,
    backgroundColor: colorScheme(theme).secondaryColor,
    [theme.breakpoints.down('sm')]: {
        width: '100%',
    }
}))





type Props = {
    tutor: User,
    mode: 'Send inquiry' | 'View inquiry' | 'read-only' | ''
}





export default function TutorItem({ tutor, mode }: Props) {
    const _theme = useTheme()
    const dispatch = useAppDispatch()
    const router = useRouter()
    const user = useAppSelector((state) => state.AuthReducer.user)
    const inquiry = useAppSelector((state) => state.InquiryReducer.inquiry)
    const selectedTutor = useAppSelector((state) => state.TutorsReducer.tutor)
    const theme = useTheme()
    const inquiryId = Randomstring.generate(17)
    const inquiredList = user.inquiredList

    const [sort, _inquiry]: any = router.query.params || []


    const inquired = (function () {
        const inquired = inquiredList?.find((item) => item.tutorId === tutor._id && item.status === 'active')
        console.log(inquired)
        return inquired
    })()

    function viewTutor() {
        router.push(`/@creator_id`)
        dispatch(inquiryActions.setInquiryNetworkStatus(''))
        dispatch(tutorsActions.setTutor(tutor))
    }

    const avatarStyles: SxProps<Theme> | undefined = {
        height: 80, width: 80,
        [theme.breakpoints.down('sm')]: {
            height: 80, width: 80,
        }
    }
    return (
        <TutorContainer
            sx={{
                border: 1,
                transition: '0.3s all',
                borderColor: selectedTutor._id === tutor._id && router.pathname.includes('/tutors') ? colors.teal[400] : 'transparent'
            }}>
            <Box sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center', }}>
                <UserAvatar imageURL={user.imageAsset?.secureURL} avatarStyles={avatarStyles} />
                <TutorItemBody>
                    {tutor._id ? (
                        <Box>
                            <Typography sx={{ fontSize: 16, lineHeight: 1.2, fontWeight: 600 }}>
                                {tutor.firstName} {tutor.lastName}
                            </Typography>
                            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                                Music Artist
                            </Typography>
                            <Typography sx={{ fontSize: 13, lineHeight: 1.2, mt: .5, color: 'GrayText', fontWeight: 500 }}>
                                This is a description of this creator.
                            </Typography>
                        </Box>) : (<Box sx={(theme) => ({
                            p: 1,
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            [theme.breakpoints.down('sm')]: {
                                width: '80%',
                                margin: 'auto',
                            }
                        })}>
                            <Box sx={{ display: 'grid' }}>
                                <Skeleton width={180} />
                                <Skeleton width={140} sx={{ mt: 1, justifySelf: 'center' }} />
                                <Skeleton width={180} sx={{ justifySelf: 'center' }} />
                                <Skeleton width={140} sx={{ justifySelf: 'center' }} />
                                <Box sx={{ mt: 1.5, flexBasis: '80%' }}>
                                    <Skeleton />
                                    <Skeleton />
                                    <Skeleton />
                                    <Skeleton />
                                </Box>
                            </Box>
                        </Box>)}
                </TutorItemBody>
            </Box>

            <ItemFooter>
                {tutor._id ? (<ButtonIcon sx={{
                    m: 0,
                    color: colors.teal[400],
                    border: 2,
                    borderColor: colors.teal[400],
                    backgroundColor: colorScheme(_theme).greyToTertiary,
                    transition: '0.3s all',
                    '&:hover': {
                        color: '#fff',
                        backgroundColor: colors.teal[400]
                    }
                }}>
                    <FavoriteBorderOutlinedIcon fontSize='small' />
                </ButtonIcon>) : (
                    <Skeleton width={48} height={80} sx={{ borderRadius: '50%' }} />
                )}
                {tutor._id ? (<>
                    {mode === 'read-only' ? (
                        <Link href={`/tutor/${user.tutorInfo?.tutorId}`}
                            style={{ flexBasis: '60%' }}>
                            <StyledButtonOutlined
                                sx={{ width: '100%', }}>
                                <VisibilityOutlinedIcon fontSize='small' sx={{ mr: 1 }} />
                                View Profile
                            </StyledButtonOutlined>
                        </Link>
                    ) : <></>}

                </>) : (
                    <Skeleton width={148} height={60} sx={{ mr: .5 }} />
                )}

                {mode !== 'read-only' ? (
                    <StyledButtonOutlined
                        onClick={viewTutor}
                        sx={(theme) => ({
                            flexBasis: '60%',
                            fontSize: 14,
                            fontWeight: 600,
                            color: colorScheme(theme).TextColor,
                            me: 1,
                            border: 0,
                            bgcolor: colorScheme(theme).greyToTertiary, borderBottom: `2px solid ${colors.teal[500]}`
                        })}>
                        View Creator
                        <East fontSize='small' sx={{ ml: 1 }} />
                    </StyledButtonOutlined>
                ) : <></>}
            </ItemFooter>
        </TutorContainer>
    )
}