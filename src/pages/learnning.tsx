
import { Box, Button, Typography, styled, InputBase, colors } from '@mui/material'
import React from 'react'
import Layout from '../components/layout'
import { VideoCall, Add } from '@mui/icons-material';
import { NextRouter, useRouter } from 'next/router';
import { ButtonIcon, Container, Hero } from '../reusable/styles';
import { cartegories } from '../reusable/helpers';
import { colorScheme, isDarkMode } from '../theme';


const GroupHeader = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    height: 60,
    padding: '0 10px',
    margin: '20px 0',
    [theme.breakpoints.down('sm')]: {

    }
}))

const HeaderRightCol = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    justifySelf: 'right'
})
const CreateCommunityButton = styled(Button)(({ theme }) => ({
    textTransform: 'capitalize',
    height: 45,
    borderRadius: 5,
    color: isDarkMode(theme) ? '#fff': '#fff',
    [theme.breakpoints.down('sm')]: {
        display: 'none'
    },
}))
const ActionIconButton = styled(ButtonIcon)(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.down('sm')]: {
        display: 'flex',
        color: '#fff',
        width: 48,
        height: 48,
    },
}))

const CommunitiesWrapper = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(3,1fr)',
    gap: 10,
    [theme.breakpoints.down('sm')]: {
        gap: 0,
        padding: 5,
        gridTemplateColumns: 'repeat(2,1fr)',
    },
}))

const CommunityCartegoryHeader = styled(Box)(({ theme }) => ({
    position: 'relative',
    height: 1,
    borderRadius: 10,
    backgroundColor: colorScheme(theme).borderColor,
    [theme.breakpoints.down('sm')]: {
        margin: '14px 10px',

    },
}))
const MappedCommunity = styled(Box)(({ theme }) => ({
    marginTop: 45
}))
const CartegoryText = styled(Typography)(({ theme }) => ({
    textTransform: 'capitalize',
    userSelect: 'none',
    fontSize: 18,
    fontWeight: '600',
    position: 'absolute',
    top: -14,
    left: 0,
    borderRadius: 10,
    color: isDarkMode(theme) ? colors.grey[200] : colors.grey[800],
    backgroundColor: colorScheme(theme).primaryColor,
}))
const CommunityCard = styled(Box)(({ theme }) => ({
    height: 180,
    margin: '20px 0 ',
    borderRadius: 12,
    padding: 10,
    backgroundColor: colorScheme(theme).secondaryColor,
    [theme.breakpoints.down('sm')]: {
        margin: 5,
        borderRadius: 15,
    },
}))

const CardText = styled(Typography)(({ theme }) => ({
    color: colorScheme(theme).TextColor,
}))


const SearchContainer = styled(Box)(({ theme }) => ({
    flex: 1,
    [theme.breakpoints.down('sm')]: {
        //width: '70%',
    },
}))
const SearchInput = styled(InputBase)(({ theme }) => ({
    height: 45,
    width: '100%',
    padding: '0 10px',
    border: 0,
    borderRadius: 29,
    [theme.breakpoints.up('sm')]: {
        width: 300,
    },
    backgroundColor: colorScheme(theme).secondaryColor,
}))



type Props = {}

export default function communites({ }: Props) {
    const router: NextRouter = useRouter()
    return (
        <Layout>
            <Container>
                <Hero></Hero>
                <GroupHeader>
                    <SearchContainer>
                        <SearchInput placeholder='Search courses' />
                    </SearchContainer>
                    <HeaderRightCol>
                        <ActionIconButton color="secondary"
                            onClick={() => router.push('/start-community')}
                            sx={{
                                backgroundColor: '#9c27b0',
                                '&:hover': { backgroundColor: '#9c27b0' }
                            }}>
                            <Add />
                        </ActionIconButton>
                        <ActionIconButton onClick={() => router.push('/launch-meet')} color="info" sx={{
                            backgroundColor: '#0288d1', ml: 1,
                            '&:hover': { backgroundColor: '#0288d1' }
                        }}>
                            <VideoCall />
                        </ActionIconButton>
                        <CreateCommunityButton onClick={() => router.push('/start-community')} color="secondary" variant="contained" startIcon={<Add />}>
                           Hire Tutor
                        </CreateCommunityButton>
                        <CreateCommunityButton
                            onClick={() => router.push('/launch-meet')}
                            sx={{ ml: 1 }} color="info" variant="contained" startIcon={<VideoCall />}>
                            Meet now
                        </CreateCommunityButton>
                    </HeaderRightCol>
                </GroupHeader>

                <MappedCommunity>
                    {cartegories.map((cartegory) => (
                        <Box sx={{ margin: '10px 0' }}>
                            <CommunityCartegoryHeader>
                                <CartegoryText>{cartegory}</CartegoryText>
                            </CommunityCartegoryHeader>
                            <CommunitiesWrapper>
                                {communities.filter(com => com.cartegory === cartegory).map((community) => (
                                    <CommunityCard onClick={() => router.push('/chat/community-name')}>
                                        <CardText style={{ fontSize: 13, fontWeight: 500, margin: 0 }} >{community.title}</CardText>
                                    </CommunityCard>
                                ))}
                            </CommunitiesWrapper>


                        </Box>
                    ))}
                </MappedCommunity>



            </Container>
        </Layout>
    )
}





const communities = [
    { cartegory: 'business', title: 'Business model guides' },
    { cartegory: 'business', title: 'Real estate' },
    { cartegory: 'business', title: 'Investing' },
    { cartegory: 'health', title: 'Healthy diet' },
    { cartegory: 'health', title: 'Top foods' },
    { cartegory: 'health', title: 'Dr Aski' },
    { cartegory: 'programming', title: 'React Native' },
    { cartegory: 'programming', title: 'Kotlin for android' },
    { cartegory: 'programming', title: 'Javascritp Mastery' },
    { cartegory: 'sports', title: 'Manchester United fans' },
    { cartegory: 'sports', title: 'Arsenal fans' },
    { cartegory: 'sports', title: 'Laliga Stats' },
];