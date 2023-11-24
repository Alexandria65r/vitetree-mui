import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../../components/layout'
import { styled, Box, Theme, SxProps, useTheme, colors } from '@mui/material'
import { ThemedText, colorScheme } from '../../theme'
import UserAvatar from '../../components/user/user-avatar'
import { relative } from 'path'
import { ButtonIcon, StyledButton, StyledInput } from '../../reusable/styles'
import IosShareIcon from '@mui/icons-material/IosShare';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import { FaXTwitter } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
import YouTubeIcon from '@mui/icons-material/YouTube';
import { FormatMoney } from 'format-money-js'
import { formatMoney } from '../../reusable/helpers'
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
    height: 195,
    marginTop: 36,
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: `1px solid ${colorScheme(theme).grayToSecondaryColor}`,
    [theme.breakpoints.down('sm')]: {
        height: 167,
        marginTop: 36
    }
}))


const MappedSupportCards = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: 10,
    paddingBlock: 10,
    [theme.breakpoints.down('sm')]: {
        display: 'grid',
        padding: 10,
        gridTemplateColumns: 'repeat(2,1fr)'
    }
}))
const SupportCard = styled(Box)(({ theme }) => ({
    flex: 1,
    //height: 200,
    backgroundColor: colorScheme(theme).lightToSecondaryColor,
    //border: `1px solid ${colorScheme(theme).lightToSecondaryColor}`,
    borderRadius: 10,
    boxShadow: `0 1px 2px 0 #ccc`,
    [theme.breakpoints.down('sm')]: {
    }
}))
const CardHead = styled(Box)(({ theme }) => ({
    padding: 10,
    borderBottom: `1px solid ${colorScheme(theme).grayToSecondaryColor}`,
    [theme.breakpoints.down('sm')]: {

    }
}))
const CardBody = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    [theme.breakpoints.down('sm')]: {
        height: 50,
    }
}))
const CardFooter = styled(Box)(({ theme }) => ({
    padding: 10,
    [theme.breakpoints.down('sm')]: {

    }
}))



type Star = {
    name: string;
    amount: number;
    accent: string
}
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
        // borderRadius:'10px',
        transform: 'translateX(-50%)',
        [_theme.breakpoints.down('sm')]: {
            height: 80, width: 80,
            bottom: '-31px',
        }
    }

    const stars: Star[] = [
        { name: 'starter', amount: 10, accent: colors.teal[500] },
        { name: 'silver', amount: 20, accent: colors.grey[500] },
        { name: 'bronze', amount: 50, accent: colors.deepOrange[600] },
        { name: 'gold', amount: 100, accent: colors.amber[500] },
        { name: 'custom', amount: 100, accent: colors.green[500] },
    ]

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
                </PageInfo>
                <Box sx={{ display: 'grid', p: 2, justifyContent: 'center' }}>
                    <ThemedText sx={{ textAlign: 'center', fontSize: 24, fontWeight: 700 }}>
                        Send a star to support this creator
                    </ThemedText>
                    <ThemedText sx={{ textAlign: 'center' }}>Supporting John Doe will enable him to continue doing his work even more.</ThemedText>
                </Box>
                <MappedSupportCards>
                    {stars.map((item, index) => (
                        <SupportCard key={index}>
                            <CardHead sx={{ bgcolor: item.accent, borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                                <ThemedText
                                    sx={{ textAlign: 'center', color: '#fff', textTransform: 'capitalize', fontSize: 18, fontWeight: 700 }}>
                                    {item.name}
                                </ThemedText>
                            </CardHead>
                            <CardBody>
                                {item.name === 'custom' ? (<Box
                                    sx={{
                                        display:'flex',
                                        width: '60px',
                                        margin: 'auto',
                                        textAlign:'center'
                                    }}>
                                    <StyledInput
                                        value='0.00'
                                        sx={(theme) => ({
                                           width:'100%',
                                            height:'35px',
                                            fontSize:16,
                                            textAlign:'center!important',
                                            px: 1,
                                            color: colorScheme(theme).TextColor,
                                            bgcolor: colorScheme(theme).grayToSecondaryColor
                                        })}
                                        placeholder='Amount' />
                                </Box>) : (<>
                                    <ThemedText sx={{ textAlign: 'center', fontSize: 16, fontWeight: 700 }}> ZMW {formatMoney(item.amount)}</ThemedText>
                                </>)}

                            </CardBody>
                            <CardFooter>
                                <StyledButton
                                    sx={(theme) => ({
                                        width: '100%',
                                        color: colorScheme(theme).TextColor,
                                        backgroundColor: colorScheme(theme).grayToSecondaryColor
                                    })}>
                                    Select
                                </StyledButton>
                            </CardFooter>
                        </SupportCard>
                    ))}
                </MappedSupportCards>

            </Container>

        </Layout>
    )
}

export default index