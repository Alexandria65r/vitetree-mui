import { Box, Typography, colors, styled } from '@mui/material'
import React from 'react'
import { colorScheme } from '../theme'
import { CSS_PROPERTIES } from '../reusable'
import { useAppDispatch } from '../../store/hooks'
import { StyledButton } from '../reusable/styles'

import { mainActions } from '../../reducers'






const Container = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '35%',
    transform: 'translate(-50%, -50%)',
    borderRadius: CSS_PROPERTIES.radius10,
    backgroundColor: colorScheme(theme).secondaryColor,
    padding: 10,
    [theme.breakpoints.down("sm")]:{
        width: '96%',
        transform: 'translate(-50%, 0%)',
        top:'unset',
        bottom:10
    }
}))


type Props = {
    title: string,
    message: string,
    type: 'delete' | 'duplicate',
    proccedIcon:any,
    cancelHandler: () => void
    procceedAction: () => void
}


export default function ReusableAlert({ title, message, type, cancelHandler, procceedAction,proccedIcon }: Props) {

    return (
        <Container sx={{ boxShadow: 24 }}>
            <Typography id="modal-modal-title" sx={{ fontWeight: 600, }} variant="h6" component="h2">
                {title}
            </Typography>
            <Typography    id="modal-modal-description" sx={{ mt: 1, lineHeight: 1.2 }}
                dangerouslySetInnerHTML={{__html:message}}
            />
    
            <Box sx={{ display: 'flex', mt: 2, justifyContent: 'space-between' }}>
                <StyledButton
                    onClick={cancelHandler}
                    sx={(theme) => ({
                        height: 40,
                        flexBasis: '48%',
                        color: colorScheme(theme).TextColor,
                        backgroundColor: theme.palette.mode === 'light' ? colors.grey[300] : colorScheme(theme).secondaryColor
                    })}>Cancel</StyledButton>
                <StyledButton
                    onClick={procceedAction}
                    sx={{
                        height: 40,
                        flexBasis: '48%',
                        backgroundColor: type === 'delete' ? colors.red[400] : ''
                    }}>
                    {proccedIcon}
                    {type}
                </StyledButton>
            </Box>
        </Container>
    )
}