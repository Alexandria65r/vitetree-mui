import React, { useState } from 'react'
import Layout from '../../components/layout'
import { Box, Typography, styled, useMediaQuery } from '@mui/material'
import { colorScheme } from '../../theme'
import { CSS_PROPERTIES } from '../../reusable'
import { ButtonIcon } from '../../reusable/styles'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import WestIcon from '@mui/icons-material/West';
import { normalizedDate } from '../../reusable/helpers'
import NotificationItem from '../../components/notification-item'


const Container = styled(Box)(({ theme }) => ({
    margin: 15,
    display: 'flex',
    height: 'calc(100vh - 100px)',
    borderRadius: 10,
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : colorScheme(theme).primaryColor,
    border: `1px solid ${colorScheme(theme).borderColor}`,
    [theme.breakpoints.down('sm')]: {
        margin: 0,
        borderRadius: 0,
        height: 'calc(100vh - 60px)',
    }
}))
const AsideLeft = styled(Box)(({ theme }) => ({
    flexBasis: '30%',
    height: '100%',
    borderRight: `1px solid ${colorScheme(theme).borderColor}`
}))
const MainCol = styled(Box)(() => ({
    flex: 1,
}))

const Header = styled(Box)(({ theme }) => ({
    height: 66,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '0 10px',
    borderBottom: `1px solid ${colorScheme(theme).borderColor}`
}))
const AsideHeader = styled(Header)(({ theme }) => ({

}))
const MainHeader = styled(Header)(({ theme }) => ({

}))








type Props = {}

export default function Notifications({ }: Props) {
    const [isOpen, setOpen] = useState<boolean>(false)
    const isMobile = useMediaQuery('(max-width:600px)')
    return (
        <Layout>
            <Container sx={(theme) => ({
                [theme.breakpoints.down('sm')]: {
                    display: 'block'
                }
            })}>
                <AsideLeft sx={(theme) => ({
                    [theme.breakpoints.down('sm')]: {
                        width: '100%',
                        display: isOpen ? 'none' : 'block'
                    }
                })}>
                    <AsideHeader sx={{}}>
                        <Typography sx={{ flex: 1, fontSize: 18, fontWeight: 600 }}>
                            Notifications
                        </Typography>
                        <ButtonIcon sx={{ bgcolor: 'transparent' }}>
                            <NotificationsNoneIcon />
                        </ButtonIcon>
                    </AsideHeader>

                    <NotificationItem title='' description='' createdAt=''  type="Bid" isOpen={isOpen} setOpen={setOpen} />
                    <NotificationItem title='' description='' createdAt='' type="Answer" isOpen={isOpen} setOpen={setOpen} />
                </AsideLeft>
                <MainCol sx={(theme) => ({
                    [theme.breakpoints.down('sm')]: {
                        width: '100%',
                        display: !isOpen ? 'none' : 'block'
                    }
                })}>
                    <MainHeader>
                        <ButtonIcon sx={{
                            display: isMobile && isOpen ? 'flex' : 'none',
                            bgcolor: 'transparent'
                        }}
                            onClick={() => setOpen(!isOpen)}
                        >
                            <WestIcon />
                        </ButtonIcon>
                    </MainHeader>
                </MainCol>
            </Container>
        </Layout>
    )
}