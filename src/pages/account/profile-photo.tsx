import React from 'react'
import Header from './header'
import { Box, styled } from '@mui/material'
import Layout from '../../components/layout'
import DetailHeader from './detail-header'

const Container = styled(Box)(({ theme }) => ({
    width: '60%',
    margin: 'auto',
    [theme.breakpoints.down("sm")]: {
        width: '97%'
    }
}))
type Props = {}

export default function ProfilePhoto({ }: Props) {
    return (
        <Layout>
            <Container>
                <DetailHeader title='Profile Photo' />
                <Header height={140} />
            </Container>
        </Layout>

    )
}