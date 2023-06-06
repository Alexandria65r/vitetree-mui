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
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import CardItem from './card-item'
import RemoveCartAlert from '../modals/remove-card-modal'

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
  const user = useAppSelector((state) => state.AuthReducer.user)
  const loadCards = useCallback(() => {
    dispatch(fetchCardsThunk())
  }, [dispatch, user])

  useEffect(() => {
    loadCards()
  }, [dispatch, user])

  return (
    <Layout>
      <Container>
        <DetailHeader title='Billing Information' />
        <br />

        {cards.map((card, index) => (
          <CardItem
            key={index}
            card={card}
            StartIcon={RiBankCard2Line}
            showEndIcon={true}
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
      <RemoveCartAlert />
    </Layout>
  )
}