import { Box, Skeleton, SxProps, Theme, Typography, colors, styled, useTheme } from '@mui/material'
import React from 'react'
import { CSS_PROPERTIES } from '../reusable'
import { colorScheme } from '../theme'
import { ButtonIcon, StyledButton, StyledButtonOutlined } from '../reusable/styles'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';

import { useAppDispatch, useAppSelector } from '../../store/hooks'

import { inquiryActions } from '../../reducers/inquiry-reducer'
import Randomstring from 'randomstring'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { nomalizedText } from '../reusable/helpers'
import { useRouter } from 'next/router'
import { StudentInquiry } from '../reusable/schemas'
import Link from 'next/link'
import UserAvatar from './user/user-avatar'
import { East } from '@mui/icons-material'
import { User } from '../models/user'
import { Page } from '../models/page/page.model'



const PageContainer = styled(Box)(({ theme }) => ({
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

const PageItemBody = styled(Box)(({ theme }) => ({
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    flexBasis: '100%',
    [theme.breakpoints.down("sm")]: {

    }
}))
const ItemFooter = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-end',
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
    page: Page,
}





export default function PageItem({ page, }: Props) {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const _theme = useTheme()
    const user = useAppSelector((state) => state.AuthReducer.user)


    const [sort, _inquiry]: any = router.query.params || []



    function viewPage() {
        router.push(`/@creator_id/send-star`)
        dispatch(inquiryActions.setInquiryNetworkStatus(''))
    }

    const avatarStyles: SxProps<Theme> | undefined = {
        height: 80, width: 80,
        [_theme.breakpoints.down('sm')]: {
            height: 80, width: 80,
        }
    }
    return (
        <PageContainer
            sx={{
                transition: '0.3s all',
            }}>
            <Box sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center', }}>
                <UserAvatar imageURL={page?.imageAssets?.profile?.secureURL??''} avatarStyles={avatarStyles} />
                <PageItemBody>
                    {page.pageId ? (
                        <Box>
                            <Typography sx={{ fontSize: 16, lineHeight: 1.2, fontWeight: 600 }}>
                                {page.name}
                            </Typography>
                            <Typography sx={{ fontSize: 14, fontWeight: 600, textTransform: 'capitalize' }}>
                                {page.cartegory}
                            </Typography>
                            <Typography sx={{ fontSize: 13, lineHeight: 1.2, mt: .5, color: 'GrayText', fontWeight: 500 }}>
                                {page.bio}
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
                </PageItemBody>
            </Box>

            <ItemFooter>
                <Link href={`/${page.pageId}/send-star`} style={{ flexBasis: '60%', }}>
                    <StyledButtonOutlined
                        sx={(theme) => ({
                            width:'100%',
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
                </Link>


                {page.pageId ? (<ButtonIcon sx={{
                    ml: 1,
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




            </ItemFooter>
        </PageContainer>
    )
}