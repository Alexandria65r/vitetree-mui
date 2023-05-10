import React from 'react'
import Layout from '../../components/layout'
import { Box, Typography, colors, styled } from '@mui/material'
import { colorScheme } from '../../theme'
import { ActiveIndicator, Avatar as AvatarContainer, ButtonIcon } from '../../reusable/styles'
import { CSS_PROPERTIES } from '../../reusable'
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

const Container = styled(Box)(({ theme }) => ({
  width: '80%',
  margin: 'auto',
  [theme.breakpoints.down("sm")]: {
    width: '97%'
  }
}))
const TopHeader = styled(Box)(({ theme }) => ({
  height: 200,
  display: 'flex',
  alignItems: 'center',
  //backgroundColor:'#ddd'
}))
const Avatar = styled(AvatarContainer)(({ theme }) => ({
  width: 140,
  height: 140,
  [theme.breakpoints.down("sm")]: {
    width: 120,
    height: 120,
  }

}))
const UsernameColumn = styled(Box)(({ theme }) => ({
  position:'relative',
  margin: '-15px 0 0 15px',
  [theme.breakpoints.down("sm")]: {
    margin: '0px 0 0 15px',
  }
}))
const InfoItem = styled(Box)(({ theme }) => ({
  height: 100,
  display: 'flex',
  marginBottom: 15,
  borderRadius: CSS_PROPERTIES.radius10,
  boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : colorScheme(theme).secondaryColor
}))
const InfoMainColumn = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: 18,
}))
const InfoRightColumn = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center'
}))



type Props = {}

export default function Profile({ }: Props) {
  return (
    <Layout>
      <Container>
        <TopHeader>
          <Avatar></Avatar>
          <UsernameColumn>
            <Typography sx={{ fontSize: 18, fontWeight: 500 }}>
              Robert Ching'ambu
            </Typography>
            <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
              robertchingambu65@mail.com
            </Typography>
            <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
              Available
            </Typography>
              <ActiveIndicator sx={{position:'absolute',left:55,bottom:3 }}></ActiveIndicator>
          </UsernameColumn>
        </TopHeader>
        <InfoItem>
          <InfoMainColumn>
            <Typography sx={{ fontSize: 18, fontWeight: 500 }}>
              Primary Information
            </Typography>
            <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
              Primary Information
            </Typography>
          </InfoMainColumn>
          <InfoRightColumn>
            <ButtonIcon sx={{ backgroundColor: 'transparent' }}>
              <ChevronRightOutlinedIcon fontSize='large' />
            </ButtonIcon>
          </InfoRightColumn>
        </InfoItem>
        <InfoItem>
          <InfoMainColumn>
            <Typography sx={{ fontSize: 18, fontWeight: 500 }}>
              Role Information
            </Typography>
            <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
              Primary Information
            </Typography>
          </InfoMainColumn>
          <InfoRightColumn>
            <ButtonIcon sx={{ backgroundColor: 'transparent' }}>
              <ChevronRightOutlinedIcon fontSize='large' />
            </ButtonIcon>
          </InfoRightColumn>
        </InfoItem>
        <InfoItem>
          <InfoMainColumn>
            <Typography sx={{ fontSize: 18, fontWeight: 500 }}>
              Payment Methods
            </Typography>
            <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
              Primary Information
            </Typography>
          </InfoMainColumn>
          <InfoRightColumn>
            <ButtonIcon sx={{ backgroundColor: 'transparent' }}>
              <ChevronRightOutlinedIcon fontSize='large' />
            </ButtonIcon>
          </InfoRightColumn>
        </InfoItem>
      </Container>
    </Layout>
  )
}   