
import { Box, Button, Typography, styled, OutlinedInput, IconButton } from '@mui/material'
import React from 'react'
import Layout from '../components/layout'
import { VideoCall, Add } from '@mui/icons-material';

const Container = styled(Box)(({ theme }) => ({
    width: '80%',
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
    },
}))

const Hero = styled(Box)(({ theme }) => ({
    height: 250,
    width: '100%',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: theme.palette.grey[300],
    [theme.breakpoints.down('sm')]: {
        height:180,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 9,
        borderBottomRightRadius: 9,
    }
}))


const GroupHeader = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(2,1fr)',
    alignItems: 'center',
    height: 60,
    padding: '0 10px',
    margin: '20px 0',
    [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: '1fr 20%'
    }
}))

const HeaderRightCol = styled(Box)({
    //border: '1px solid',
    // width: '32%',
    display: 'flex',
    justifyContent: 'space-between',
    justifySelf: 'right'
})
const CreateCommunityButton = styled(Button)(({ theme }) => ({
    textTransform: 'capitalize',
    height: 45,
    borderRadius: 5,
    [theme.breakpoints.down('sm')]: {
        display: 'none'
    },
}))
const ActionIconButton = styled(Button)(({ theme }) => ({
    display: 'none',
    width: 45,
    height: 45,
    color: '#fff',
    [theme.breakpoints.down('sm')]: {
        display: 'flex',
        width: 45,
        height: 45,
    },
}))

const CommunitiesWrapper = styled(Box)(({ theme }) => ({
    display: 'grid',
    padding: 10,
    gridTemplateColumns: 'repeat(3,1fr)',
    [theme.breakpoints.down('sm')]: {
        padding: 5,
        gridTemplateColumns: 'repeat(2,1fr)',
    },
}))

const CommunityCartegoryHeader = styled(Box)(({ theme }) => ({
    position: 'relative',
    height: 1,
    borderRadius: 10,
    backgroundColor: '#e2e6ea',
    [theme.breakpoints.down('sm')]: {
        margin: '14px 0',
        
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
    padding: '0 10px 0 20px',
    position: 'absolute',
    top: -14,
    left: 0,
    backgroundColor: '#fff',
    borderRadius: 10
}))
const CommunityCard = styled(Box)(({ theme }) => ({
    height: 180,
    margin: 10,
    borderRadius: 12,
    padding: 10,
    backgroundColor: theme.palette.grey[200],
    [theme.breakpoints.down('sm')]: {
        margin: 5,
        borderRadius: 15,
    },
}))

const SearchContainer = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        width: '70%',
    },
}))
const SearchInput = styled(OutlinedInput)(({ theme }) => ({
    height: 45,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        width: 300,
    },
    backgroundColor: theme.palette.grey[200]
}))





type Props = {}

export default function communites({ }: Props) {
    return (
        <Layout>
            <Container>
                <Hero></Hero>
                <GroupHeader>
                    <SearchContainer>
                        <SearchInput placeholder='Search community' />
                    </SearchContainer>
                    <HeaderRightCol>
                        <ActionIconButton color="secondary" sx={{
                            backgroundColor: '#9c27b0',
                            '&:hover': { backgroundColor: '#9c27b0' }
                        }}>
                            <Add />
                        </ActionIconButton>
                        <ActionIconButton color="info" sx={{
                            backgroundColor: '#0288d1', ml: 1,
                            '&:hover': { backgroundColor: '#0288d1' }
                        }}>
                            <VideoCall />
                        </ActionIconButton>
                        <CreateCommunityButton color="secondary" variant="contained" startIcon={<Add />}>
                            Start community
                        </CreateCommunityButton>
                        <CreateCommunityButton sx={{ ml: 1 }} color="info" variant="contained" startIcon={<VideoCall />}>
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
                                    <CommunityCard>
                                        <p style={{ fontSize: 13, fontWeight: 500, margin: 0 }} >{community.title}</p>
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




const cartegories = ["sports", "programming", "health", "business"];
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