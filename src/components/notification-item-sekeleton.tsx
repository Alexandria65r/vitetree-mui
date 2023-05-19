import React from 'react'
import { colorScheme } from '../theme'
import { Box, Skeleton, styled } from '@mui/material'



const Card = styled(Box)(({ theme }) => ({
    flexBasis: '30%',
    marginTop: '10px',
    padding: '0px 10px',
    borderBottom: `1px solid ${colorScheme(theme).borderColor}`,
    [theme.breakpoints.down("sm")]: {
        flexBasis: '100%',
        marginTop: '10px',
        marginLeft: 0,
    }
}))

const CardFooter = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    padding: 10,
    justifyContent: 'flex-end'
}))



export default function NotificationItemSkeleton() {
    return (<>
        {[1, 2, 3, 4].map((index) => (
            <Card key={index}>
                <Skeleton sx={{ width: 160 }} />
                <Skeleton sx={{ width: 100 }} />
                <Box sx={{}}>
                    <Skeleton sx={{}} />
                    <Skeleton sx={{}} />
                </Box>
                <CardFooter>

                </CardFooter>
            </Card>
        ))}
    </>

    )
}