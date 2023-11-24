import { useRouter } from 'next/router'
import React from 'react'
import { styled, Box, useTheme, colors } from '@mui/material'
import { ThemedText, colorScheme } from '../../theme'
import { StyledButton, StyledInput } from '../../reusable/styles'
import { formatMoney } from '../../reusable/helpers'
const Container = styled(Box)(({ theme }) => ({
    width: '100%'
}))

const MappedSupportCards = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: 10,
    paddingBlock: 10,
    [theme.breakpoints.down('sm')]: {
        display: 'grid',
        padding: 10,
        gridTemplateColumns: 'repeat(2,1fr)'
    }
}))
const SupportCard = styled(Box)(({ theme }) => ({
    flex: 1,
    backgroundColor: colorScheme(theme).lightToSecondaryColor,
    borderRadius: 10,
    boxShadow: `0 1px 2px 0 ${colorScheme(theme).grayToSecondaryColor}`,
    [theme.breakpoints.down('sm')]: {
    }
}))
const CardHead = styled(Box)(({ theme }) => ({
    padding: 10,
    borderBottom: `1px solid ${colorScheme(theme).grayToSecondaryColor}`,
    [theme.breakpoints.down('sm')]: {

    }
}))
const CardBody = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    [theme.breakpoints.down('sm')]: {
        height: 60,
    }
}))
const SupportHeader = styled(Box)(({ theme }) => ({
    width: '80%',
    display: 'grid',
    padding: 8,
    margin: '10px auto',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
        width: '90%',
    },
    [theme.breakpoints.down('sm')]: {
       
    },
}))
const CardFooter = styled(Box)(({ theme }) => ({
    padding: 10,
    [theme.breakpoints.down('sm')]: {
        padding: '0 10px 10px 10px',
    }
}))



type Star = {
    name: string;
    amount: number;
    accent: string
}
type Props = {}

export default function SupportCreator({ }: Props) {

    const stars: Star[] = [
        { name: 'starter', amount: 10, accent: colors.teal[500] },
        { name: 'silver', amount: 20, accent: colors.grey[500] },
        { name: 'bronze', amount: 50, accent: colors.deepOrange[600] },
        { name: 'gold', amount: 100, accent: colors.amber[500] },
        { name: 'custom', amount: 100, accent: colors.green[500] },
    ]

    return (

        <Container>
            <SupportHeader>
                <ThemedText sx={{ textAlign: 'center', fontSize: 24, fontWeight: 700 }}>
                    Support  Creator
                </ThemedText>
                <ThemedText sx={{ textAlign: 'center',lineHeight:1.3 }}>Supporting John Doe will enable him to continue doing his work even more.</ThemedText>
            </SupportHeader>
            <MappedSupportCards>
                {stars.map((item, index) => (
                    <SupportCard key={index} sx={{ border: `1px solid ${item.accent}`, }}>
                        <CardHead sx={{ bgcolor: item.accent, borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                            <ThemedText
                                sx={{ textAlign: 'center', color: '#fff', textTransform: 'capitalize', fontSize: 16, fontWeight: 700 }}>
                                {item.name}
                            </ThemedText>
                        </CardHead>
                        <CardBody>
                            {item.name === 'custom' ? (<Box
                                sx={{
                                    display: 'flex',
                                    width: '60px',
                                    margin: 'auto',
                                    textAlign: 'center'
                                }}>
                                <StyledInput
                                    value='0.00'
                                    sx={(theme) => ({
                                        width: '100%',
                                        height: '35px',
                                        fontSize: 16,
                                        textAlign: 'center!important',
                                        px: 1,
                                        color: colorScheme(theme).TextColor,
                                        bgcolor: colorScheme(theme).grayToSecondaryColor
                                    })}
                                    placeholder='Amount' />
                            </Box>) : (<>
                                <ThemedText sx={{ textAlign: 'center', fontSize: 16, fontWeight: 700 }}> ZMW {formatMoney(item.amount)}</ThemedText>
                            </>)}

                        </CardBody>
                        <CardFooter>
                            <StyledButton
                                sx={(theme) => ({
                                    width: '100%',
                                    fontSize: 14,
                                    height: '35px',
                                    color: colorScheme(theme).TextColor,
                                    backgroundColor: colorScheme(theme).greyToTertiary,
                                })}>
                                Select
                            </StyledButton>
                        </CardFooter>
                    </SupportCard>
                ))}
            </MappedSupportCards>
        </Container>
    )
}

