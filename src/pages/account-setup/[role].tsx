import React, {  } from 'react'
import { useRouter } from 'next/router'
import { useAppDispatch } from '../../../store/hooks'
import Layout from '../../components/layout'
import StudentForm from './student-form'
import TutorForm from './tutor-form'

type Props = {}

export default function AccountSetup({ }: Props) {
  const router = useRouter()

  return (
    <Layout>
      {router.query.role === 'tutor' ? <TutorForm /> : router.query.role === 'student' ? <StudentForm /> : <></>}
    </Layout>
  )
}