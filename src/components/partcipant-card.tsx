import React from 'react'
import { Participant } from '../reusable/interfaces'
import { colorScheme } from '../theme'
import { Box, ButtonBase, Typography, colors, styled } from '@mui/material'
import { CSS_PROPERTIES } from '../reusable'
import { useRouter } from 'next/router'
import PartcipantsOptions from './menus/partcipant-menu'
import moment from 'moment'

const CardContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    minHeight: 260,
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: colorScheme(theme).secondaryColor,
    borderRadius: CSS_PROPERTIES.radius5,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
    [theme.breakpoints.down("sm")]: {
        marginLeft: 0,
    }
}))

const ScoreCircle = styled(Box)(({ theme }) => ({
    position: 'absolute',
    left: '50%',
    top: '30%',
    width: 140,
    height: 140,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 25,
    fontWeight: '600',
    cursor: 'pointer',
    transform: 'translateX(-50%)',
    color: '#fff',
    backgroundColor: colors.teal[400],
    transition: '0.3s all',
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
    '&:hover': {
        backgroundColor: colors.teal[400],
    }
}))

const CardFooter = styled(Box)(() => ({
    flexBasis: '100%',
    alignSelf: 'flex-end',
    display: 'flex',
    justifyContent: 'center',
    margin: '8px 0',
}))

const Button = styled(ButtonBase)(({ theme }) => ({
    padding: '4px 10px',
    width: '60%',
    fontSize: 12,
    fontWeight: 600,
    border: `1px solid ${colors.teal[200]}`,
    borderRadius: CSS_PROPERTIES.radius5,
    [theme.breakpoints.down("sm")]: {
        width: '40%',
    }
}))


type Props = {
    partcipant: Participant
    showDetailsButton?: boolean
}

export default function PartcipantCard({ partcipant, showDetailsButton }: Props) {
    const router = useRouter()

    function NavigateHandler() {
        if (router.pathname.includes('/partcipate')) {
            router.back()
        } else {
            router.push(`/partcipate/${partcipant._id}`)
        }
    }
    return (
        <CardContainer>
            <PartcipantsOptions />
            <Box sx={{ padding: 2, flexBasis: '100%' }}>
                <Typography sx={{ textAlign: 'center', fontWeight: 600 }}>
                    {partcipant.fullname}
                </Typography>
                <Typography sx={{ fontSize: 13, textAlign: 'center' }} >
                    {moment(partcipant.createdAt).format('DD/MM/YYYY')}
                </Typography>
            </Box>
            <ScoreCircle>
                {partcipant.score}
            </ScoreCircle>
            <CardFooter>
                <Button
                    onClick={NavigateHandler}>
                    {router.pathname.includes('/partcipate') ? 'Back' : 'View details'}
                </Button>
            </CardFooter>
        </CardContainer>
    )
}