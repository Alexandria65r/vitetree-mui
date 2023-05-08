import React, { useState, useEffect } from 'react'
import { Box, ButtonBase, CircularProgress, TextField, Typography, colors, styled } from '@mui/material'
import { CSS_PROPERTIES, SCHOOYARD_AUTH_TOKEN } from '../../reusable'
import { ContinueWith, ContinueWithOverlayText, FormContainer, FormHeader, FormLogo, RedirectingCard } from '../../reusable/styles'
import AuthAPI from '../../api-services/auth'
import { User } from '../../reusable/interfaces'
import { StudentInfo, StudentInquiry, TutorInfo, UserSchema } from '../../reusable/schemas'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { authActions } from '../../../reducers/auth-reducer'
import cookies from 'js-cookie'
import { getAuth } from "firebase/auth";
import SignInWithGoogleButton from '../../components/auth/google-button'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { fireBaseApp } from '../_app'
import Layout from '../../components/layout'
import StudentForm from './student-form'
import TutorForm from './tutor-form'








type Props = {}

export default function AccountSetup({ }: Props) {
  const router = useRouter()
  const dispatch = useAppDispatch()


  return (
    <Layout>
      {router.query.role === 'tutor' ? <TutorForm /> : router.query.role === 'student' ? <StudentForm /> : <></>}
    </Layout>
  )
}