import { Box, Typography, styled } from '@mui/material'
import React from 'react'
import { ButtonIcon } from '../../reusable/styles'
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { useRouter } from 'next/router';



const Container = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    height: 66,
}))


type Props = {
    title: string
}

export default function DetailHeader({ title }: Props) {
    const router = useRouter()
    return (
        <Container>
            <ButtonIcon
                onClick={() => router.back()}
                sx={{ mr: 1, }}>
                <KeyboardBackspaceOutlinedIcon />
            </ButtonIcon>
            <Typography sx={{ textTransform: 'capitalize', fontSize: 18, fontWeight: 600 }}>
                {title}
            </Typography>
        </Container>
    )
}