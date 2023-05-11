import { Box, Typography, styled } from '@mui/material'
import React from 'react'
import { CSS_PROPERTIES } from '../../reusable'
import { ButtonIcon } from '../../reusable/styles'
import { colorScheme } from '../../theme'
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import { useRouter } from 'next/router'

const Container = styled(Box)(({ theme }) => ({
    height: 100,
    display: 'flex',
    alignItems: 'center',
    marginBottom: 15,
    borderRadius: CSS_PROPERTIES.radius10,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : colorScheme(theme).secondaryColor
}))
const LeftIconColumn = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    flexBasis: 40,
    padding: 18,
}))
const InfoMainColumn = styled(Box)(({ theme }) => ({
    flex: 1,
    padding: 18,
}))
const InfoRightColumn = styled(Box)(({ theme }) => ({
    flexBasis:45,
    display: 'flex',
    alignItems: 'center'
}))




type Props = {
    title: string
    description: string,
    routeParam: string
    StartIcon:any
}

export default function InfoItem({ title, description,StartIcon, routeParam }: Props) {
    const router =useRouter()
    return (
        <Container>
            <LeftIconColumn>
                <StartIcon size={20} />
            </LeftIconColumn>
            <InfoMainColumn>
                <Typography sx={{textTransform:'capitalize', fontSize: 18, fontWeight: 500 }}>
                    {title}
                </Typography>
                <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
                    {description}
                </Typography>
            </InfoMainColumn>
            <InfoRightColumn>
                <ButtonIcon
                onClick={()=> router.push(`/account/${routeParam}`)}
                 sx={{ backgroundColor: 'transparent' }}>
                    <ChevronRightOutlinedIcon fontSize='medium' />
                </ButtonIcon>
            </InfoRightColumn>
        </Container>
    )
}