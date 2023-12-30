
import { styled, Box } from '@mui/material'
import { useState } from 'react'
import type { NextPage } from 'next'
import Layout from '../components/layout'
import { NextRouter, useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { StyledButton } from '../reusable/styles'
import Link from 'next/link'

const Container = styled(Box)(({ theme }) => ({

  [theme.breakpoints.down('sm')]: {
    flexWrap: 'wrap'
  },
}))


const IndexPage: NextPage = () => {
  const router: NextRouter = useRouter()
  const [URL, setCode] = useState<string>('')
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.AuthReducer.user)

  return (
    <Layout>
      <Container>
        <Link href='/tasks/vitetree/some-id'>
          <StyledButton>Tasks</StyledButton>
        </Link>
      </Container>
    </Layout>
  )
}

export default IndexPage



