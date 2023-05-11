import React from 'react'
import Layout from '../../components/layout'
import { Box, styled } from '@mui/material'
import { useAppSelector } from '../../../store/hooks'
import InfoItem from './info-item'
import { RiContactsLine } from 'react-icons/ri'
import { MdOutlineAddAPhoto, MdPayment } from 'react-icons/md'
import { FaGraduationCap } from 'react-icons/fa'
import Header from './header'
import AccountLinks from './links'
import { useRouter } from 'next/router'
import ProfilePhoto from './profile-photo'
import PrimaryInfo from './primary-info'
import RoleInfo from './role-info'
import PaymentMethods from './payment-methods'





type Props = {}

export default function Profile({ }: Props) {
  const router = useRouter()
  const params = router.query.params || []
  const user = useAppSelector((state) => state.AuthReducer.user)
  console.log(router.query)
  return (
    <>
      {params[0] === user?._id ? <AccountLinks /> : <></>}
      {params[0] === 'profile-photo' ? <ProfilePhoto /> : <></>}
      {params[0] === 'primary-info' ? <PrimaryInfo /> : <></>}
      {params[0] === 'role-info' ? <RoleInfo /> : <></>}
      {params[0] === 'payment-methods' ? <PaymentMethods /> : <></>}
    </>
  )
}   