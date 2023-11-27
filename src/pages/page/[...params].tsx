import React, { useCallback, useEffect } from 'react'
import Layout from '../../components/layout'
import { Box, colors, styled } from '@mui/material'
import { useRouter } from 'next/router'
import Banner from '../../components/creator-page/banner'
import { ButtonIcon, StyledButton } from '../../reusable/styles'
import { ThemedText, colorScheme } from '../../theme'
import IosShareIcon from '@mui/icons-material/IosShare';
import PageTabs from '../../components/page-tab-bar'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { pageActions } from '../../../reducers/page-reducer'
import PageForm from './page-form'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { fetchPageThunk } from '../../../reducers/page-reducer/page-thunks'
import AboutPage from '../../components/creator-page/about-page'

const Container = styled(Box)(({ theme }) => ({
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
    },
    [theme.breakpoints.up('md')]: {
        width: '90%',
        margin: 'auto',
    },
    [theme.breakpoints.up('xl')]: {
        width: '70%',
        margin: 'auto',
    },
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
const PublishPageAlert = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: -30,
    left: '50%',
    zIndex: 200,
    height: 50,
    width: '50%',
    display: 'flex',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingInline: 10,
    borderRadius: 10,
    transform: 'translateX(-50%)',
    boxShadow: `0 1px 3px ${colorScheme(theme).shadowColor}`,
    backgroundColor: colorScheme(theme).lightToSecondaryColor,
    [theme.breakpoints.down('sm')]: {
        width: '90%',
    },
    [theme.breakpoints.up('md')]: {
        width: '38%',
    },
    [theme.breakpoints.up('xl')]: {
        width: '28%',
    }
}))


type Props = {}

export default function Creator({ }: Props) {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const [pageId, secondParam]: any = router.query.params || []
    const page = useAppSelector((state) => state.PageReducer.page)


    const loadPageData = useCallback(() => {
        if (pageId !== 'create' || pageId !== 'update') {
            dispatch(fetchPageThunk(pageId))
        }
    }, [pageId])

    useEffect(() => {
        loadPageData()
    }, [pageId])





    function Payout() {
        if (pageId === 'setup') {
            dispatch(pageActions.setIsFormOpen(true))
        } else {
            //go to payout page
        }
    }


    function close() {
        dispatch(pageActions.setPageData({ ...page, published: true }))
    }

    return (
        <Layout>
            <Container>
            <PageForm />
                {!page.published && pageId !== 'create' && (
                    <PublishPageAlert className='trans-from-to '>
                        <ThemedText sx={{ fontWeight: 500 }}>Ready to publish?</ThemedText>
                        <StyledButton sx={{ fontSize: 13, height: 30, borderBottom: `3px solid ${colors.teal[600]}` }}>
                            Publish Page
                        </StyledButton>
                        <ButtonIcon onClick={close} sx={{ position: 'absolute', right: 0, height: 40, width: 40 }}>
                            <CloseOutlinedIcon />
                        </ButtonIcon>
                    </PublishPageAlert>
                )}
                <Banner />
                <PageInfo>
                    <InfoHead>
                        <ThemedText sx={{ textTransform: 'capitalize', textAlign: 'center', fontSize: 24, fontWeight: 700 }}>
                            {page.name || 'Page Name'}
                        </ThemedText>
                        <ThemedText sx={{ textAlign: 'center', fontSize: 13, lineHeight: 1.2, }}>{page.bio}</ThemedText>
                        <Box sx={{display: 'flex', gap: 1, mt: 2, alignItems: 'center' }}>
                            <StyledButton onClick={Payout} sx={{ flexBasis:'70%', fontWeight: 700, borderBottom: `3px solid ${colors.teal[500]}` }}>
                                Payout
                            </StyledButton>
                            <StyledButton
                                sx={(theme) => ({ fontSize: 14, bgcolor: colorScheme(theme).grayToSecondaryColor, color: colorScheme(theme).TextColor })} >
                                <IosShareIcon sx={{ mb: .8, fontSize: 18 }} /> Share
                            </StyledButton>
                        </Box>
                    </InfoHead>
                    <PageTabs links={['send-star', 'exclusive', 'about']} path={`page/${page.pageId}`} mode='page-user' />
                </PageInfo>
                {secondParam === 'about' && <AboutPage page={page} mode='author' />}
            </Container>
        </Layout>
    )
}