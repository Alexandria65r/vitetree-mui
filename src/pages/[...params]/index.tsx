import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../../components/layout'
import { styled, Box, Theme, SxProps, useTheme, colors } from '@mui/material'
import { ThemedText, colorScheme } from '../../theme'
import UserAvatar from '../../components/user/user-avatar'
import { ButtonIcon, StyledButton } from '../../reusable/styles'
import IosShareIcon from '@mui/icons-material/IosShare';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import { FaXTwitter } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
import YouTubeIcon from '@mui/icons-material/YouTube';
import PageTabs from '../../components/page-tab-bar'
import SupportCreator from '../../components/support-creator'
const Container = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up('xl')]: {
        width: '70%',
        margin: 'auto'
    }
}))

const Banner = styled(Box)(({ theme }) => ({
    position: 'relative',
    height: 400,
    borderRadius: 10,
    backgroundColor: colorScheme(theme).grayToSecondaryColor,
    [theme.breakpoints.down('sm')]: {
        height: 160,
        margin: 10,
    },
}))


const SocialLinks = styled(Box)(({ theme }) => ({
    display: 'flex', justifyContent: 'center',
    [theme.breakpoints.up('xl')]: {

    }
}))

const PageInfo = styled(Box)(({ theme }) => ({
    marginTop: 36,
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: `1px solid ${colorScheme(theme).grayToSecondaryColor}`,
    [theme.breakpoints.down('sm')]: {
        marginTop: 36
    }
}))

const About = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    width: '60%',
    margin: 'auto',
    minHeight: 100,
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
        width: '90%',
    }
}))





type Props = {}

function index({ }: Props) {
    const router = useRouter()
    const params: any = router.query.params || []
    const _theme = useTheme()
    const avatarStyles: SxProps<Theme> | undefined = {
        height: 180, width: 180,
        position: 'absolute',
        left: '50%',
        bottom: '-31px',
        transform: 'translateX(-50%)',
        [_theme.breakpoints.down('sm')]: {
            height: 80, width: 80,
            bottom: '-31px',
        }
    }

    return (
        <Layout>
            <Container>
                <Banner>
                    <UserAvatar imageURL={''} avatarStyles={avatarStyles} />
                </Banner>
                <PageInfo>
                    <Box sx={{ display: 'grid', justifyContent: 'center' }}>
                        <ThemedText sx={{ textAlign: 'center', fontSize: 24, fontWeight: 700 }}>John Doe</ThemedText>
                        <ThemedText sx={{ textAlign: 'center' }}>this is a breif description of this page</ThemedText>
                        <Box sx={{ display: 'flex', gap: 1, mt: 2, alignItems: 'center' }}>
                            <StyledButton sx={{ flex: 1, fontWeight: 700, borderBottom: `3px solid ${colors.teal[500]}` }}>Follow</StyledButton>
                            <StyledButton
                                sx={(theme) => ({ fontSize: 14, bgcolor: colorScheme(theme).grayToSecondaryColor, color: colorScheme(theme).TextColor })} >
                                <IosShareIcon sx={{ mb: .8, fontSize: 18 }} /> Share
                            </StyledButton>
                        </Box>
                    </Box>
                    <SocialLinks>
                        <ButtonIcon sx={{ color: colors.blue[500] }}>
                            <FacebookOutlinedIcon />
                        </ButtonIcon>
                        <ButtonIcon>
                            <FaXTwitter />
                        </ButtonIcon>
                        <ButtonIcon sx={{ color: colors.red[500] }}>
                            <YouTubeIcon />
                        </ButtonIcon>
                        <ButtonIcon >
                            <FaTiktok />
                        </ButtonIcon>
                    </SocialLinks>
                    <PageTabs />
                </PageInfo>
                {params?.length ? (<>
                    {params[1] === 'send-star' && <SupportCreator />}
                    {params[1] === 'about' && (
                        <About>
                            <Box sx={{ display: 'grid', p: 2, justifyContent: 'center' }}>
                                <ThemedText sx={{ textAlign: 'center', fontSize: 24, fontWeight: 700 }}>
                                    About Creator
                                </ThemedText>
                                <ThemedText sx={{ textAlign: 'center' }}>
                                    Supporting John Doe will enable him to continue doing his work even more.
                                </ThemedText>
                            </Box>
                        </About>
                    )}

                </>) : <></>}
            </Container>
        </Layout>
    )
}

export default index