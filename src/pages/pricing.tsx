import React from 'react'
import Layout from '../components/layout'
import { Box, styled } from '@mui/material'
import { useAppSelector } from '../../store/hooks'
import InfoItem from '../components/account/info-item'
import { RiContactsLine } from 'react-icons/ri'
import { MdOutlineAddAPhoto, MdPayment } from 'react-icons/md'
import { FaGraduationCap } from 'react-icons/fa'
import { useRouter } from 'next/router'
import AccountLinks from '../components/account/links'
import PaymentMethods from '../components/account/payment-methods'
import PrimaryInfo from '../components/account/primary-info'
import ProfilePhoto from '../components/account/profile-photo'
import RoleInfo from '../components/account/role-info'


const Container = styled(Box)(({ theme }) => ({
  width: '70%',
  margin: '10px auto',
  [theme.breakpoints.down("sm")]: {
    width: '97%'
  }
}))



type Props = {}

export default function Profile({ }: Props) {
  const router = useRouter()
  const params = router.query.params || []
  const user = useAppSelector((state) => state.AuthReducer.user)
  return (
    <Layout page='pricing'>
      <Container>
        
      </Container>
    </Layout>
  )
}   