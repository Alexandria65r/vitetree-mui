import React from 'react'
import Layout from '../components/layout'
import { Box, styled } from '@mui/material'

const Container = styled(Box)(({ theme }) => ({
    width: '80%',
    margin: 'auto'
}))



type Props = {}

export default function Tasks({ }: Props) {
    return (
        <Layout>
            <Container>
                <div>Tasks</div>
            </Container>
        </Layout>
    )
}