import React, { useCallback, useEffect, useState } from 'react'
import Layout from '../../components/layout'
import { Box, Skeleton, Typography, colors, styled, useMediaQuery } from '@mui/material'
import { colorScheme } from '../../theme'
import { ButtonIcon, SearchInput, SearchInputWrap } from '../../reusable/styles'
import WestIcon from '@mui/icons-material/West';
import NotificationItem from '../../components/notification-item'
import { BiSearchAlt } from 'react-icons/bi'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { fetchInquiriesThunk } from '../../../reducers/inquiry-reducer/inquiry-thunks'
import { inquiryActions } from '../../../reducers/inquiry-reducer'
import { useRouter } from 'next/router'
import InquiredItem from '../find-creators/inquiredItem'
import NotificationItemSkeleton from '../../components/notification-item-sekeleton'
import { Close, KeyboardBackspace } from '@mui/icons-material'
import ResponseFooter from '../../components/service-inquiry/response-footer'
import { fetchNotificationsThunk } from '../../../reducers/notification-reducer/notifications-thunks'
import { Notification } from '../../models/notifications'
import { notificationActions } from '../../../reducers/notification-reducer'
import InquiryFeedback from '../../components/inquiry-feedback/inquiry-feedback'


const Container = styled(Box)(({ theme }) => ({
    width: '90%',
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
    flexBasis: '40%',
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
    const notification = useAppSelector((state) => state.NotificationsReducer.notification)
    const notifications = useAppSelector((state) => state.NotificationsReducer.notifications)
    const NotificationNetworkStatus = useAppSelector((state) => state.NotificationsReducer.NotificationNetworkStatus)
    const user = useAppSelector((state) => state.AuthReducer.user)
    const params = router.query.params || []

    const [isSearchToggled, toggleSearch] = useState<boolean>(false)


    const loadInquiries = useCallback(() =>
        dispatch(fetchNotificationsThunk()),
        [dispatch, user, router.pathname])

    useEffect(() => {
        loadInquiries()
        return () => {
            dispatch(inquiryActions.setInquiries([]))
        }
    }, [dispatch, user, router.pathname])


    function handleOpen(notification: Notification) {
        router.replace(`/notifications/detail/${notification.refId}`)
        dispatch(notificationActions.setNotification(notification))
    }


    return (
        <Layout>
            <Container sx={(theme) => ({
                [theme.breakpoints.down('sm')]: {
                    display: 'block'
                }
            })}>
                <AsideLeft sx={(theme) => ({
                    [theme.breakpoints.down('sm')]: {
                        width: '100%',
                        display: params[0] === 'detail' ? 'none' : 'block'
                    }
                })}>
                    <AsideHeader sx={{}}>

                        {isSearchToggled ? (
                            <SearchInputWrap sx={{ order: isSearchToggled ? 2 : 1, flex: 1, px: 1.5, height: 44 }}>
                                <SearchInput
                                    placeholder='Search' />
                            </SearchInputWrap>) : (<>
                                <Typography sx={{ flex: 1, ml: .6, fontSize: 18, fontWeight: 500 }}>
                                    Notifications
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
                        {notifications.length && NotificationNetworkStatus !== 'fetch-notifications' ? (<>
                            {notifications.map((notification, index) => (
                                <NotificationItem
                                    key={index}
                                    link={notification.link}
                                    title={notification.title}
                                    createdAt={notification?.createdAt ?? ''}
                                    description={notification.description}
                                    type={`John Doe - student`}
                                    open={() => handleOpen(notification)}
                                />
                            ))}

                        </>) : !notifications.length && NotificationNetworkStatus === 'fetch-notifications' ?
                            <NotificationItemSkeleton /> : <></>}
                    </Box>

                </AsideLeft>
                <MainCol sx={(theme) => ({
                    [theme.breakpoints.down('sm')]: {
                        width: '100%',
                        display: !params[0] ? 'none' : 'block'
                    }
                })}>
                    <MainHeader>
                        <ButtonIcon
                            onClick={() => { router.push(`/notifications/selected=none`) }}
                            sx={{
                                display: isMobile && params[0] === 'detail' ? 'flex' : 'none',
                                bgcolor: 'transparent'
                            }}
                        >
                            <WestIcon />
                        </ButtonIcon>
                        <Typography sx={{ flex: 1, lineHeight: 1.3, ml: .5, fontSize: 18, fontWeight: 500 }}>
                            {notification.title || <Skeleton sx={{ width: 260 }} />}
                        </Typography>
                    </MainHeader>

                    <ItemContainer>
                        {notification.description}
                        {notification.type === 'inquiry-purchase-feedback' ||
                            notification.type === 'inquiry-terms-feedback' ?
                            <InquiryFeedback /> : <></>}

                    </ItemContainer>
                </MainCol>
            </Container>
        </Layout >
    )
}