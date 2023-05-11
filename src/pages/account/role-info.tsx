import React from 'react'
import { Box, styled } from '@mui/material'
import Layout from '../../components/layout'
import DetailHeader from './detail-header'
import { useAppSelector } from '../../../store/hooks'

const Container = styled(Box)(({ theme }) => ({
  width: '60%',
  margin: 'auto',
  [theme.breakpoints.down("sm")]: {
    width: '97%'
  }
}))

type Props = {}

export default function RoleInfo({ }: Props) {
  const user = useAppSelector((state) => state.AuthReducer.user)
  return (
    <Layout>
      <Container>
        <DetailHeader title={`${user.role} Information`} />
      </Container>
    </Layout>

  )
}