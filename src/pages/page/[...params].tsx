import React, { useCallback, useEffect, useState } from 'react'
import Layout from '../../components/layout'
import { Box, colors, styled, useMediaQuery } from '@mui/material'
import { useRouter } from 'next/router'
import Banner from '../../components/creator-page/banner'
import { ButtonIcon, StyledButton } from '../../reusable/styles'
import { ThemedText, colorScheme } from '../../theme'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { pageActions } from '../../../reducers/page-reducer'
import PageForm from './page-form'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { fetchPageThunk, updatePageThunk } from '../../../reducers/page-reducer/page-thunks'
import AboutPage from '../../components/creator-page/about-page'
import PageInfo from '../../components/creator-page/page-info'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddIcon from '@mui/icons-material/Add';
import { mainActions } from '../../../reducers/main-reducer'
import { createToastThunk } from '../../../reducers/main-reducer/main-thunks'
import { AppSpinner } from '../../components/activity-indicators'
import Link from 'next/link'

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
    const isMobile = useMediaQuery('(max-width:600px)')

    const [isPublishing, setIsPublishing] = useState<boolean>(false)


    const loadPageData = useCallback(() => {
        if (pageId !== 'create' || pageId !== 'update') {
            dispatch(fetchPageThunk(pageId))
        }
    }, [pageId])

    useEffect(() => {
        loadPageData()
    }, [pageId])

    function close() {
        dispatch(pageActions.setPageData({ ...page, published: true }))
    }
    function openMoreOptionsMenu() {
        if (isMobile) {
            dispatch(mainActions.setCardMenu({ component: 'page-more-options-menu', title: 'What is in your mind?' }))
        } else {
            dispatch(mainActions.setModal({ component: 'page-more-options-menu' }))
        }
    }
    //todo: if more options we will use this button :)
    //lets keep things simple for now
    const MainButton = () => (
        <StyledButton onClick={openMoreOptionsMenu}
            sx={{ flexBasis: '70%', fontWeight: 700, borderBottom: `0 px solid ${colors.teal[500]}` }}>
            more options <KeyboardArrowDownIcon sx={{ ml: 1 }} />
        </StyledButton>
    )

    const PostAJobButton = () => (
        <Link href='/new-job'>
            <StyledButton
                sx={{ flexBasis: '70%', fontWeight: 700, borderBottom: `0 px solid ${colors.teal[500]}` }}>
                <AddIcon/>  Post a Job 
            </StyledButton>
        </Link>
    )


    async function publishPage() {
        if (!(page.about && page.bio && page.imageAssets.profile.publicId && page.imageAssets.background.publicId)) {
            dispatch(createToastThunk("Page cannot be published! update all that is requred!"))
        } else {

            const { payload } = await dispatch(updatePageThunk({
                pageId: page.pageId,
                target: 'other',
                update: {
                    published: true
                }
            }))

            if (payload.success) {
                dispatch(pageActions.setPageData({ ...page, published: true }))
                dispatch(createToastThunk("Your page has been published."))
            }

        }

    }

    return (
        <Layout>
            <Container>
                <PageForm />
                {!page.published && pageId !== 'create' && (
                    <PublishPageAlert className='trans-from-to '>
                        <ThemedText sx={{ fontWeight: 500 }}>Ready to publish?</ThemedText>
                        <StyledButton onClick={publishPage} sx={{ fontSize: 13, height: 30, borderBottom: `3px solid ${colors.teal[600]}` }}>
                            {isPublishing ? <AppSpinner visible={isPublishing} /> : 'Publish Page'}
                        </StyledButton>
                        <ButtonIcon onClick={close} sx={{ position: 'absolute', right: 0, height: 40, width: 40 }}>
                            <CloseOutlinedIcon />
                        </ButtonIcon>
                    </PublishPageAlert>
                )}
                <Banner mode='author' />
                <PageInfo
                    mainButton={<PostAJobButton />}
                    page={page}
                    links={['jobs', 'salaries', 'about',]}
                    path={`page/${page.pageId}`} mode='author' />
                {secondParam === 'about' && <AboutPage page={page} mode='author' />}
            </Container>
        </Layout>
    )
}


