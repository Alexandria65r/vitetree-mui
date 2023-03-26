import {styled,Box} from '@mui/material'

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
