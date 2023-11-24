import React, { useCallback, useEffect, useState } from 'react'
import Layout from '../../components/layout'
import { Box, Typography, colors, styled } from '@mui/material'
import { colorScheme } from '../../theme'
import { useRouter } from 'next/router'
import { CSS_PROPERTIES } from '../../reusable'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import TutorItem from '../../components/tutor-item'
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { Avatar, ButtonIcon, SearchInput, SearchInputWrap, TabButton } from '../../reusable/styles'
import InquiryForm from '../../components/inquiry-form/forum-post-form'
import SearchIcon from '@mui/icons-material/Search';
import { fetchTutorsThunk } from '../../../reducers/tutors-reducer/tutors-thunks'
import { tutorsActions } from '../../../reducers/tutors-reducer'
import { StudentInquiry, UserSchema } from '../../reusable/schemas'
import InquireSuccess from './inquire-success'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import InquiredItem from './inquiredItem'
import SelectTutor from './select-tutor'
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import InquiredFooter from '../../components/service-inquiry/inquired-footer'
import { inquiryActions } from '../../../reducers/inquiry-reducer'

const Container = styled(Box)(({ theme }) => ({
    maxWidth: '95%',
    margin: '20px auto',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'start',
    justifyContent: 'space-between',
    [theme.breakpoints.down("sm")]: {
        margin: '10px auto',
    },
    [theme.breakpoints.up("xl")]: {
        maxWidth: '35%',
    }
}))


const CheckoutHeader = styled(Box)(({ theme }) => ({
    flexBasis: '100%',
    //height: 60,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: '0 10px',
    marginBottom: 10,
    //backgroundColor: colorScheme(theme).secondaryColor,
    borderRadius: CSS_PROPERTIES.radius10,
    borderEndEndRadius: 0,
    borderBottomLeftRadius: 0,
    // boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
    [theme.breakpoints.down("sm")]: {

    }
}))

const TutorsColumn = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gridTemplateColumns: 'repeat(2,1fr)',
    justifyContent: 'space-between',
    marginRight: 15,
    gap: 10,
    flex: 1,
    // padding: 10,
    minHeight: 60,
    //  borderRadius: CSS_PROPERTIES.radius5,
    // backgroundColor: colorScheme(theme).secondaryColor,
    //boxShadow: `0 1px 3px 0px ${theme.palette.mode === 'light' ? '#ddd' : 'transparent'}`,
    [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: '1fr',
    }
}))



const TutorDetail = styled(Box)(({ theme }) => ({
    position: 'sticky',
    top: 20,
    flexBasis: '40%',
    minHeight: 260,
    borderRadius: CSS_PROPERTIES.radius10,
    backgroundColor: colorScheme(theme).secondaryColor,
    boxShadow: `0 1px 3px 0px ${theme.palette.mode === 'light' ? '#ddd' : 'transparent'}`,
    [theme.breakpoints.down("sm")]: {
        flexBasis: '100%',
        margin: '10px 0',
    }
}))

const DetailHeader = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    height: 60,
    padding: '0 15px',
    [theme.breakpoints.down("sm")]: {
        padding: '0 15px 0 5px',
    }
}))
const FormContainer = styled(Box)(({ theme }) => ({
    padding: 15,
    [theme.breakpoints.down("sm")]: {

    }
}))
const TabHeader = styled(Box)(({ theme }) => ({
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    padding: '5px 10px',

    borderRadius: CSS_PROPERTIES.radius5,

    [theme.breakpoints.down('sm')]: {
        width: '94vw',
        overflowX: 'auto',

    },
    "::-webkit-scrollbar": {
        display: 'none'
    }
}))


type Props = {}

export default function Tutors({ }: Props) {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const isSidebarOpen = useAppSelector((state) => state.MainReducer.isSidebarOpen)
    const tutors = useAppSelector((state) => state.TutorsReducer.tutors)
    const tutor = useAppSelector((state) => state.TutorsReducer.tutor)
    const inquiryNetworkStatus = useAppSelector((state) => state.InquiryReducer.inquiryNetworkStatus)
    const user = useAppSelector((state) => state.AuthReducer.user)
    const [sort, inquiry, inquiryId]: any = router.query.params || []
    const inquiredList = user.inquiredList
    console.log(inquiryId)

    const loadTutors = useCallback(() => {
        dispatch(fetchTutorsThunk())
    }, [router.pathname])


    useEffect(() => {
        loadTutors()
        return () => {
            dispatch(tutorsActions.setTutors([]))
        }
    }, [router.pathname])

    const inquired = (function () {
        const inquired = inquiredList?.find(
            (item) => item.tutorId === tutor._id && item.status === 'active')
        return inquired
    })()

    return (
        <Layout>
            <Container sx={(theme) => ({
                // maxWidth: !isSidebarOpen ? '97%' : '90%',
                [theme.breakpoints.down('sm')]: {
                    display: 'block',
                    maxWidth: tutor?._id ? '97%' : '93%',
                }
            })}>
                <CheckoutHeader>
                    <ButtonIcon
                        sx={(theme) => ({
                            flexBasis: 45, mr: 1,
                            display: 'none',
                            backgroundColor: 'transparent',
                            [theme.breakpoints.down("sm")]: {
                                display: tutor?._id ? 'flex' : 'none',
                                ml: -1.5
                            }
                        })}
                        onClick={() => {
                            dispatch(inquiryActions.setInquiry(StudentInquiry))
                            dispatch(tutorsActions.setTutor(UserSchema))
                        }}>
                        <KeyboardBackspaceOutlinedIcon />
                    </ButtonIcon>
                    <Typography
                        sx={(theme) => ({
                            fontSize: 25,
                            fontWeight: 600,
                            [theme.breakpoints.down("sm")]: {
                                fontSize: 22
                            }
                        })}>
                        Find Creators You Love
                    </Typography>
                </CheckoutHeader>

                <TutorsColumn
                    sx={(theme) => ({
                        [theme.breakpoints.down('sm')]: {
                            display: tutor?._id ? 'none' : 'grid'
                        }
                    })}>
                    <Box sx={{ flexBasis: '100%', ml: 0, my: 1 }}>
                        <SearchInputWrap sx={{ ml: 0, my: 1 }}>
                            <SearchIcon sx={(theme) => ({
                                flexBasis: '6%',
                                ml: .5,
                                [theme.breakpoints.down("sm")]: {
                                    flexBasis: '16%',
                                }
                            })} />
                            <SearchInput placeholder='Search for creator' />
                        </SearchInputWrap>
                        <TabHeader>
                            <TabButton
                                onClick={() => router.push(`/find-creators/all`)}
                                sx={{
                                    backgroundColor: sort === 'all' ? colors.teal[400] : '',
                                    color: sort === 'all' ? '#fff' : ''
                                }}
                            >
                                <PersonSearchOutlinedIcon fontSize='small' style={{ marginRight: '.1em' }} />
                                All
                            </TabButton>
                            <TabButton
                                onClick={() => router.push(`/find-creators/available`)}
                                sx={{
                                    backgroundColor: sort === 'available' ? colors.teal[400] : '',
                                    color: sort === 'available' ? '#fff' : ''
                                }}
                            >
                                <CoPresentIcon fontSize='small' sx={{ mr: .5 }} />
                                Available
                            </TabButton>
                            <TabButton
                                onClick={() => router.push(`/find-creators/favourites`)}
                                sx={{
                                    backgroundColor: sort === 'favourites' ? colors.teal[400] : '',
                                    color: sort === 'favourites' ? '#fff' : ''
                                }}
                            >
                                <FavoriteBorderOutlinedIcon fontSize='small' sx={{ mr: .5 }} />
                                Favourites
                            </TabButton>
                            <TabButton
                                sx={{
                                    backgroundColor: sort === 'inquired' ? colors.teal[400] : '',
                                    color: sort === 'inquired' ? '#fff' : ''
                                }}
                                onClick={() => router.push(`/find-creators/inquired`)}>
                                <ManageSearchOutlinedIcon fontSize='small' sx={{ mr: .5 }} />
                                Supported
                            </TabButton>
                        </TabHeader>
                    </Box>
                    {tutors.map((tutor, index) => (
                        <TutorItem key={index}
                            tutor={tutor} mode='Send inquiry' />
                    ))}
                </TutorsColumn>
                {/* <TutorDetail sx={(theme) => ({
                    [theme.breakpoints.down('sm')]: {
                        display: tutor?._id ? 'block' : 'none'
                    }
                })}>
                    {inquiryNetworkStatus !== 'creatingInquirySuccess' && tutor._id && (
                        <DetailHeader sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Avatar sx={{ ml: 1, mr: 1.4 }}>

                            </Avatar>
                            <Typography sx={{ flex: 1, fontSize: 16, fontWeight: 600 }}>
                                {tutor.firstName} {tutor.lastName}
                            </Typography>
                        </DetailHeader>
                    )}

                    {inquiryNetworkStatus === 'creatingInquirySuccess' ? (
                        <InquireSuccess />
                    ) : (
                        <>
                            {inquiry === 'inquiry' ? (
                                <InquiredItem Footer={InquiredFooter} inquiryId={inquiryId} />
                            ) : tutor._id !== inquired?.tutorId ? (
                                <FormContainer>
                                    <InquiryForm
                                        tutor={tutor}
                                        submitHandler={() => { }}
                                    />
                                </FormContainer>
                            ) : <SelectTutor />}

                        </>
                    )}
                </TutorDetail> */}
            </Container>
        </Layout >
    )
}





