import React from 'react'
import Layout from '../../components/layout'
import { Box, colors, styled } from '@mui/material'
import { useRouter } from 'next/router'
import Banner from '../../components/creator-page/banner'
import { StyledButton } from '../../reusable/styles'
import { ThemedText, colorScheme } from '../../theme'
import IosShareIcon from '@mui/icons-material/IosShare';
import PageTabs from '../../components/page-tab-bar'
import { useAppDispatch } from '../../../store/hooks'
import { pageActions } from '../../../reducers/page-reducer'
import PageForm from './page-form'


const Container = styled(Box)(({ theme }) => ({
    //position:'relative',
    [theme.breakpoints.up('xl')]: {
        width: '70%',
        margin: 'auto'
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


type Props = {}

export default function Creator({ }: Props) {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const [pageId, ...rest]: any = router.query.params || []

    console.log(pageId)

    function Payout() {
        if (pageId === 'setup') {
            dispatch(pageActions.setIsFormOpen(true))
        } else {
            //go to payout page
        }
    }

    return (
        <Layout>
            <Container>
                <PageForm/>
                <Banner />
                <PageInfo>
                    <Box sx={{ display: 'grid', mb: 2, justifyContent: 'center' }}>
                        <ThemedText sx={{ textAlign: 'center', fontSize: 24, fontWeight: 700 }}>John Doe</ThemedText>
                        <ThemedText sx={{ textAlign: 'center' }}>this is a breif description of this page</ThemedText>
                        <Box sx={{ display: 'flex', gap: 1, mt: 2, alignItems: 'center' }}>
                            <StyledButton onClick={Payout} sx={{ flex: 1, fontWeight: 700, borderBottom: `3px solid ${colors.teal[500]}` }}>
                                {pageId === 'setup' ? 'Create' : 'Payout'}
                            </StyledButton>
                            <StyledButton
                                sx={(theme) => ({ fontSize: 14, bgcolor: colorScheme(theme).grayToSecondaryColor, color: colorScheme(theme).TextColor })} >
                                <IosShareIcon sx={{ mb: .8, fontSize: 18 }} /> Share
                            </StyledButton>
                        </Box>
                    </Box>
                    <PageTabs links={['send-star', 'exclusive', 'about']} path={`page/pageid`} mode='page-user' />
                </PageInfo>
            </Container>
        </Layout>
    )
}