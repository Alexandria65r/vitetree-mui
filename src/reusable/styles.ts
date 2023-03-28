import {styled,Box, ButtonBase} from '@mui/material'

export const Container = styled(Box)(({ theme }) => ({
    width: '80%',
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
    },
}))


export const Hero = styled(Box)(({ theme }) => ({
    height: 250,
    width: '100%',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: theme.palette.grey[300],
    [theme.breakpoints.down('sm')]: {
        height: 180,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 9,
        borderBottomRightRadius: 9,
    }
}))

export const ButtonIcon = styled(ButtonBase)(({ theme }) => ({
    width: 45,
    height: 45,
    margin: '0 5px',
    borderRadius: '50%',
    backgroundColor: theme.palette.grey[300]
}))
