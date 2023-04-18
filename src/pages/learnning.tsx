import React from 'react'
import Layout from '../components/layout'
import { Box, styled } from '@mui/material'

const Container = styled(Box)(({ theme }) => ({
    
}))

type Props = {}

export default function Learnning({ }: Props) {
    return (
        <Layout>
            <Container>
                <div>learn</div>
            </Container>
        </Layout>
    )
}