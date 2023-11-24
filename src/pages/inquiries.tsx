import React, { useCallback, useEffect, useState } from 'react'
import Layout from '../components/layout'
import { Box, Skeleton, Typography, colors, styled, useMediaQuery } from '@mui/material'
import { colorScheme } from '../theme'
import { ButtonIcon, SearchInput, SearchInputWrap } from '../reusable/styles'
import WestIcon from '@mui/icons-material/West';
import NotificationItem from '../components/notification-item'
import { BiSearchAlt } from 'react-icons/bi'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fetchInquiriesThunk } from '../../reducers/inquiry-reducer/inquiry-thunks'
import { inquiryActions } from '../../reducers/inquiry-reducer'
import { useRouter } from 'next/router'
import InquiredItem from './find-creators/inquiredItem'
import NotificationItemSkeleton from '../components/notification-item-sekeleton'
import { KeyboardBackspace } from '@mui/icons-material'
import ResponseFooter from '../components/service-inquiry/response-footer'
import NotificationInquiryItem from '../components/notification-inquiry-item-copy'


const Container = styled(Box)(({ theme }) => ({
    width: '80%',
    margin: '20px auto 0 auto',
    display: 'flex',
    height: 'calc(100vh - 100px)',
    borderRadius: 10,
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : colorScheme(theme).primaryColor,
    border: `1px solid ${colorScheme(theme).borderColor}`,
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        margin: 0,
        borderRadius: 0,
        height: 'auto',
    }
}))
const AsideLeft = styled(Box)(({ theme }) => ({
    flexBasis: '35%',
    height: '100%',
    borderRight: `1px solid ${colorScheme(theme).borderColor}`
}))
const MainCol = styled(Box)(() => ({
    flex: 1,

    //border:'1px solid '
}))

const Header = styled(Box)(({ theme }) => ({
    height: 66,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '0 10px',
    borderBottom: `1px solid ${colorScheme(theme).borderColor}`
}))
const AsideHeader = styled(Header)(({ theme }) => ({

}))
const MainHeader = styled(Header)(({ theme }) => ({

}))
const ItemContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    //width: '85%',
    height: 'calc(100% - 66px)',
    overflowY: 'auto',
    padding: 10,
    [theme.breakpoints.down("sm")]: {
        width: '100%',
    }
}))




type Props = {}

export default function Notifications({ }: Props) {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const isMobile = useMediaQuery('(max-width:600px)')
    const inquiry = useAppSelector((state) => state.InquiryReducer.inquiry)
    const inquiries = useAppSelector((state) => state.InquiryReducer.inquiries)
    const inquiryNetworkStatus = useAppSelector((state) => state.InquiryReducer.inquiryNetworkStatus)
    const user = useAppSelector((state) => state.AuthReducer.user)
    const params = router.query.params || []
    const isSidebarOpen = useAppSelector((state) => state.MainReducer.isSidebarOpen)
    const [isSearchToggled, toggleSearch] = useState<boolean>(false)


    const loadInquiries = useCallback(() =>
        dispatch(fetchInquiriesThunk()),
        [dispatch, user, router.pathname])

    useEffect(() => {
        loadInquiries()
        return () => {
            dispatch(inquiryActions.setInquiries([]))
        }
    }, [dispatch, user, router.pathname])


    function openInquiry(inquiryId: string) {
        router.replace(`/yard/inquiries/detail/${inquiryId}`)
    }


    return (
        <Layout>
            <Container sx={(theme) => ({
                width: !isSidebarOpen ? '90%' : '80%',
                [theme.breakpoints.down('sm')]: {
                    display: 'block',
                    width: '97%'
                },
                [theme.breakpoints.up('xl')]: {
                    width: !isSidebarOpen ? '80%' : '60%',
                }
            })}>
                <AsideLeft sx={(theme) => ({
                    [theme.breakpoints.down('sm')]: {
                        width: '100%',
                        display: params[2] === 'detail' ? 'none' : 'block'
                    }
                })}>
                    <AsideHeader sx={{}}>

                        {isSearchToggled ? (
                            <SearchInputWrap sx={{ order: isSearchToggled ? 2 : 1, flex: 1, px: 1.5, height: 44 }}>
                                <SearchInput
                                    placeholder='Search' />
                            </SearchInputWrap>) : (<>
                                <Typography sx={{ flex: 1, ml: .6, fontSize: 18, fontWeight: 500 }}>
                                    Service Inquiries
                                </Typography>
                            </>
                        )}

                        <ButtonIcon
                            onClick={() => toggleSearch(!isSearchToggled)}
                            sx={{
                                width: 40, height: 40,
                                order: isSearchToggled ? 1 : 2,
                                bgcolor: 'transparent',
                                '&:hover': {
                                    color: colors.teal[400],
                                }
                            }}>
                            {isSearchToggled ? <KeyboardBackspace /> : <BiSearchAlt size={23} />}
                        </ButtonIcon>
                    </AsideHeader>
                    <Box sx={(theme) => ({
                        height: 'calc(100vh - 168px)',
                        overflowY: 'auto',
                        [theme.breakpoints.down('sm')]: {
                            height: 'calc(100vh - 142px)',
                        }
                    })}>
                        {inquiries.length && inquiryNetworkStatus !== 'fetch-inquiries' ? (<>
                            {inquiries.map((inquiry, index) => (
                                <NotificationInquiryItem
                                    key={index}

                                    title={inquiry.service.label}
                                    createdAt={inquiry?.createdAt ?? ''}
                                    description={inquiry.description}
                                    type={`John Doe - student`}
                                    open={() => openInquiry(inquiry._id)}
                                />
                            ))}

                        </>) : !inquiries.length && inquiryNetworkStatus === 'fetch-inquiries' ?
                            <NotificationItemSkeleton /> : <></>}
                    </Box>

                </AsideLeft>
                <MainCol sx={(theme) => ({
                    [theme.breakpoints.down('sm')]: {
                        width: '100%',
                        display: !params[2] ? 'none' : 'block'
                    }
                })}>
                    <MainHeader>
                        <ButtonIcon
                            onClick={() => { router.push('/yard/inquiries') }}
                            sx={{
                                display: isMobile && params[2] === 'detail' ? 'flex' : 'none',
                                bgcolor: 'transparent'
                            }}
                        >
                            <WestIcon />
                        </ButtonIcon>
                        <Typography sx={{ flex: 1, ml: .5, fontSize: 18, fontWeight: 500 }}>
                            {params[2] === 'detail' ? `Service - ${inquiry.service.label}` : <Skeleton sx={{ width: 260 }} />}
                        </Typography>
                    </MainHeader>

                    <ItemContainer>
                        <Box sx={{ flexBasis: '100%', mt: 2 }}>
                            <Typography sx={(theme) => ({
                                flex: 1,
                                ml: 1,
                                color: theme.palette.mode === 'light' ? 'GrayText' : colorScheme(theme).TextColor,
                                fontSize: 17,
                                fontWeight: 500
                            })}>
                                {params[2] === 'detail' ? `John Doe - Student` : <Skeleton sx={{ width: 260 }} />}
                            </Typography>
                        </Box>
                        <InquiredItem
                            Footer={ResponseFooter}
                            inquiryId={params[3]}
                        />
                    </ItemContainer>


                </MainCol>
            </Container>
        </Layout >
    )
}