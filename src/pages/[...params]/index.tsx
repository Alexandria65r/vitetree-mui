import { useRouter } from 'next/router'
import React, { useCallback, useEffect } from 'react'
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
import Banner from '../../components/creator-page/banner'
import { fetchPageThunk } from '../../../reducers/page-reducer/page-thunks'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import AboutPage from '../../components/creator-page/about-page'
import EditIcon from '@mui/icons-material/Edit';
import PageInfo from '../../components/creator-page/page-info'




const Container = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up('xl')]: {
        width: '70%',
        margin: 'auto'
    }
}))


const SocialLinks = styled(Box)(({ theme }) => ({
    display: 'flex', justifyContent: 'center',
    [theme.breakpoints.up('xl')]: {

    }
}))




const InfoHead = styled(Box)(({ theme }) => ({
    width: '100%',
    margin: 'auto',
    //display: 'grid',
    marginBottom: 8,
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
    }
}))




type Props = {}

function index({ }: Props) {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const [pageId, secondParam]: any = router.query.params || []
    const page = useAppSelector((state) => state.PageReducer.page)
    const _theme = useTheme()

    console.log(secondParam)
    console.log(router.query)

    const loadPageData = useCallback(() => {
        if (pageId) {
            dispatch(fetchPageThunk(pageId))
        }
    }, [pageId])

    useEffect(() => {
        loadPageData()
    }, [pageId])


    const MainButton = () => (
        <StyledButton onClick={() => { }} sx={{ flexBasis: '70%', fontWeight: 700, borderBottom: `0px solid ${colors.teal[500]}` }}>
            Follow
        </StyledButton>
    )

    return (
        <Layout>
            <Container>
                <Banner mode='read-only' />
                <PageInfo
                    page={page}
                    mainButton={<MainButton />}
                    links={['send-star', 'exclusive', 'about']}
                    path={page.pageId} mode='read-only' />
                {secondParam ? (<>
                    {secondParam === 'send-star' && <SupportCreator page={page} />}
                    {secondParam === 'about' && <AboutPage page={page} mode='read-only' />}
                </>) : <></>}
            </Container>
        </Layout>
    )
}

export default index