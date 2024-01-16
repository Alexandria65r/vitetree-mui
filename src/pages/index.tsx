
import { styled, Box } from '@mui/material'
import { useState } from 'react'
import type { NextPage } from 'next'
import Layout from '../components/layout'
import { NextRouter, useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { StyledButton } from '../reusable/styles'
import Link from 'next/link'
import RenderBoardsAndWorkSpaces from '../components/render-boards-and-workspaces'
import { ThemedText } from '../theme'

const Container = styled(Box)(({ theme }) => ({
  padding: 15,
  [theme.breakpoints.up('xl')]: {
    width: '80%',
    margin: 'auto'
  }
}))


const IndexPage: NextPage = () => {
  const router: NextRouter = useRouter()
  const [URL, setCode] = useState<string>('')
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.AuthReducer.user)

  return (
    <Layout>
      <Container>
        <ThemedText sx={{ fontSize: 18, mb: 2, fontWeight: 600 }}>Workspace History</ThemedText>
        <RenderBoardsAndWorkSpaces />
      </Container>
    </Layout>
  )
}

export default IndexPage



