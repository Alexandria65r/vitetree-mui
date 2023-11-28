import React, { useCallback, useEffect } from 'react'
import Layout from '../../components/layout'
import { Box, colors, styled } from '@mui/material'
import { useRouter } from 'next/router'
import Banner from '../../components/creator-page/banner'
import { ButtonIcon, StyledButton } from '../../reusable/styles'
import { ThemedText, colorScheme } from '../../theme'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { pageActions } from '../../../reducers/page-reducer'
import PageForm from './page-form'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { fetchPageThunk } from '../../../reducers/page-reducer/page-thunks'
import AboutPage from '../../components/creator-page/about-page'
import PageInfo from '../../components/creator-page/page-info'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PageOptionsPopper from '../../components/creator-page/page-options-popper'

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

    const MainButton = () => (
        <StyledButton onClick={() => { }} sx={{ flexBasis: '70%', fontWeight: 700, borderBottom: `0 px solid ${colors.teal[500]}` }}>
            more options <KeyboardArrowDownIcon sx={{ ml: 1 }} />
        </StyledButton>
    )

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
                <Banner mode='author' />
                <PageInfo
                    mainButton={<PageOptionsPopper />}
                    page={page}
                    links={['send-star', 'exclusive', 'about']}
                    path={`page/${page.pageId}`} mode='author' />
                {secondParam === 'about' && <AboutPage page={page} mode='author' />}
            </Container>
        </Layout>
    )
}


