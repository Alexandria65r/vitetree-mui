import React, { useCallback, useEffect } from 'react'
import Layout from '../../components/layout'
import { Box, styled } from '@mui/material'
import DetailHeader from './detail-header'
import { StyledBox, StyledButton } from '../../reusable/styles'
import InfoItem from './info-item'
import { RiBankCard2Line } from 'react-icons/ri'
import { Add } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import AddNewCardModal from '../modals/add-new-card'
import { authActions } from '../../../reducers/auth-reducer/auth-reducer'
import { fetchCardsThunk } from '../../../reducers/auth-reducer/auth-thunks'


const Container = styled(Box)(({ theme }) => ({
  width: '60%',
  margin: 'auto',
  [theme.breakpoints.down("sm")]: {
    width: '97%'
  }
}))


type Props = {}

export default function PaymentMethods({ }: Props) {
  const dispatch = useAppDispatch()
  const isAddNewCard = useAppSelector((state) => state.AuthReducer.isAddNewCard)
  const cards = useAppSelector((state) => state.AuthReducer.cards)
  const loadCards = useCallback(() => {
    dispatch(fetchCardsThunk())
  }, [])

  useEffect(() => {
    loadCards()
  }, [])

  return (
    <Layout>
      <Container>
        <DetailHeader title='Billing Information' />
        <br />

        {cards.map((card, index) => (
          <InfoItem
            key={index}
            StartIcon={RiBankCard2Line}
            title='Primary Card'
            description='Active'
            route={`/account/billing/card/${card._id}`}
          />
        ))}


        <StyledButton
          onClick={() => dispatch(authActions.toggleAddNewCard(!isAddNewCard))}
          sx={{ mb: 1 }}>
          <Add sx={{ mr: 1 }} />
          Add Card
        </StyledButton>
      </Container>
      <AddNewCardModal />
    </Layout>
  )
}