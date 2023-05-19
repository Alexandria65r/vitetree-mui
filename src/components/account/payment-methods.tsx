import React from 'react'
import Layout from '../../components/layout'
import { Box, styled } from '@mui/material'
import DetailHeader from './detail-header'
import { StyledBox, StyledButton } from '../../reusable/styles'
import InfoItem from './info-item'
import { RiBankCard2Line } from 'react-icons/ri'
import { Add } from '@mui/icons-material'


const Container = styled(Box)(({ theme }) => ({
  width: '60%',
  margin: 'auto',
  [theme.breakpoints.down("sm")]: {
    width: '97%'
  }
}))


type Props = {}

export default function PaymentMethods({ }: Props) {
  return (
    <Layout>
      <Container>
        <DetailHeader title='Billing Information' />
        <br/>
        <InfoItem
          StartIcon={RiBankCard2Line}
          title='Primary Card'
          description='Active'
          route={`/account/billing/card/cardid`}
        />
        <InfoItem
          StartIcon={RiBankCard2Line}
          title='Card-678hg'
          description='Inactive'
          route={`/account/billing/card/cardid`}
        />

        <StyledButton sx={{ mb: 1 }}>
          <Add sx={{mr:1}}/>
          Add Card
        </StyledButton>
      </Container>
    </Layout>
  )
}