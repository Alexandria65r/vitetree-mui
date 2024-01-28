import React from 'react'
import Layout from '../../components/layout'
import { Box, styled } from '@mui/material'
import DetailHeader from './detail-header'

const Container = styled(Box)(({ theme }) => ({
  width: '60%',
  margin: 'auto',
  [theme.breakpoints.down("sm")]: {
    width: '97%'
  }
}))

type Props = {}

export default function PrimaryInfo({ }: Props) {
  return (
    <Layout page='Primary information'>
      <Container>
        {/* <DetailHeader title='Primary Information' /> */}
      </Container>
    </Layout>
  )
}