import React from 'react'
import Layout from '../../components/layout'
import RenderJobDetail from '../../components/job/render-job-details'
import { Box, styled } from '@mui/material'

const Container = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down("sm")]: {
        width: '100%',
    },
    [theme.breakpoints.up("xl")]: {
        width: '55%',
    }
}))


type Props = {}

export default function JobDetail({ }: Props) {
    return (
        <Layout>
            <Container>
                <RenderJobDetail />
            </Container>
        </Layout>
    )
}