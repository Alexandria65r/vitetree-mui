import { styled, Box, ButtonBase, colors } from '@mui/material'
import { colorScheme } from '../theme'
import { CSS_PROPERTIES } from '.'

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
    marginTop:10,
    borderRadius:CSS_PROPERTIES.radius5,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor:colorScheme(theme).secondaryColor,
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
    color: colorScheme(theme).TextColor,
    backgroundColor: colorScheme(theme).buttonIconBGColor
}))


export const Avatar = styled(Box)(({ theme }) => ({
    width: 45,
    height: 45,
    borderRadius: '50%',
    backgroundColor: colorScheme(theme).chatSecondaryColor,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
    [theme.breakpoints.down('sm')]: {
        width: 43,
        height: 43,
    }
}))
