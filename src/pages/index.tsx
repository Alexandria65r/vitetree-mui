
import { styled, Box, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Layout from '../components/layout'
import { NextRouter, useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ButtonIcon, StyledButton } from '../reusable/styles'
import Link from 'next/link'
import RenderBoardsAndWorkSpaces from '../components/render-boards-and-workspaces'
import { ThemedText, colorScheme } from '../theme'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
const Container = styled(Box)(({ theme }) => ({
  padding: 15,
  [theme.breakpoints.up('xl')]: {
    width: '80%',
    margin: 'auto'
  }
}))
const Head = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: 15,
  alignItems: 'center',
  [theme.breakpoints.up('xl')]: {

  }
}))

const IndexPage: NextPage = () => {
  const _theme = useTheme()
  const router: NextRouter = useRouter()
  const [URL, setCode] = useState<string>('')
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.AuthReducer.user)

  // useEffect(() => {
  //   const workspaceId = localStorage.getItem('workspaceId');
  //   if (workspaceId) {
  //     router.push(`/workspace/${workspaceId}`)
  //   } else {
  //     router.push(`/workspaces`)
  //   }
  // }, [])

  return (
    <Layout>
      <Container>
        <Head>
          <ThemedText sx={{ flex: 1, fontSize: 18, fontWeight: 600 }}>Workspaces History</ThemedText>
          <ButtonIcon
            sx={{ backgroundColor: colorScheme(_theme).grayToSecondaryColor }}>
            <SearchOutlinedIcon />
          </ButtonIcon>
        </Head>
        <RenderBoardsAndWorkSpaces />
      </Container>
    </Layout>
  )
}

export default IndexPage



