import { Box, Typography, colors, styled } from '@mui/material'
import React from 'react'
import { CSS_PROPERTIES } from '../../reusable'
import { colorScheme } from '../../theme'
import { useRouter } from 'next/router'
import CardOptions from '../menus/card-options'
import { Card } from '../../models/card'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


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
    flexBasis: 45,
    display: 'flex',
    alignItems: 'center'
}))




type Props = {
    card: Card
    StartIcon: any
}

export default function CardItem({ card, StartIcon }: Props) {
    const router = useRouter()
    return (

        <Container>
            <LeftIconColumn>
                <StartIcon size={20} />
            </LeftIconColumn>
            <InfoMainColumn>
                <Typography sx={{ textTransform: 'capitalize', fontSize: 18, fontWeight: 500 }}>
                    Card {card.cardNumber.slice(15, 19)}
                </Typography>
                {card.preffered && (
                    <Box sx={{ display: 'flex', alignItems: 'center', color: colors.teal[400] }}>
                        <CheckCircleIcon sx={{mr:.3}}  />
                        <Typography sx={{
                            fontSize: 14,
                            fontWeight: 500,
                            color: colors.teal[400]
                        }}>
                            Active
                        </Typography>
                    </Box>
                )}
            </InfoMainColumn>
            <InfoRightColumn>
                <CardOptions cardId={card._id} preffered={card.preffered} />
            </InfoRightColumn>
        </Container>
    )
}