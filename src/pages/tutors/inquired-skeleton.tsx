import { Box, Skeleton, styled, useTheme } from '@mui/material'
import React from 'react'


const Container = styled(Box)(() => ({
    padding: 10,
}))
const Detailed = styled(Box)(() => ({
    marginBottom: 10,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
}))
const ItemFooter = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'space-between'
}))


type Props = {}

export default function InquiredSkeleton({ }: Props) {
    const _theme = useTheme()
    return (
        <Container>
            <Skeleton sx={{ width: 120, height: 25 }} />
            <Skeleton sx={{ height: 78, my: -1 }} />
            <Detailed>
                <Skeleton sx={{
                    width: 120, height: 85,my:-1.3,
                    [_theme.breakpoints.down("sm")]: {
                        flexBasis: '48%',
                        my: -1
                    }
                }} />
                <Skeleton sx={{
                    width: 120, height: 85,my:-1.3,
                    [_theme.breakpoints.down("sm")]: {
                        flexBasis: '48%',
                        my: -1
                    }
                }} />
                <Skeleton sx={{
                    width: 200, height: 85,my:-1.3,
                    [_theme.breakpoints.down("sm")]: {
                        flexBasis: '100%',
                        my: -1.3
                    }
                }} />
            </Detailed>
            <Skeleton sx={{ width: 120, mt: -1.5, mb: .5, height: 25 }} />
            <Skeleton sx={{ height: 25, my: -1 }} />
            <Skeleton sx={{ height: 25, my: -1 }} />
            <Skeleton sx={{ height: 25, my: -1 }} />
            <Skeleton sx={{ width: 200, height: 25, my: -1 }} />
            <ItemFooter>
                <Skeleton sx={{
                    width: 240, height: 78, [_theme.breakpoints.down("sm")]: {
                        flexBasis: '48%',
                    }
                }} />
                <Skeleton sx={{
                    width: 240, height: 78, [_theme.breakpoints.down("sm")]: {
                        flexBasis: '48%',
                    }
                }} />
            </ItemFooter>
        </Container>
    )
}