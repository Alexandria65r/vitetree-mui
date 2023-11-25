import { styled, Box, ButtonBase, colors, TextareaAutosize, InputBase } from '@mui/material'
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
    marginTop: 10,
    borderRadius: CSS_PROPERTIES.radius5,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: colorScheme(theme).grayToSecondaryColor,
    [theme.breakpoints.down('sm')]: {
        marginTop: 0,
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
    transition: '0.3s all',
    //backgroundColor: colorScheme(theme).grayToSecondaryColor,
    backgroundColor: 'transparent',
    '&:hover': {
        backgroundColor: colorScheme(theme).grayToSecondaryColor
    }
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

export const ActiveIndicator = styled(Box)(({ theme }) => ({
    display: 'inline-block',
    marginLeft: 5,
    height: 14,
    width: 14,
    borderRadius: 29,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: theme.palette.mode === 'light' ? '#fff' : colorScheme(theme).secondaryColor,
    backgroundColor: colors.teal[400],
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
}))

export const CustomFormControl = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '20px 0',
    [theme.breakpoints.down("sm")]: {
        margin: '10px 0',
    }
}))


// auth pages
export const FormContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    flexBasis: '35%',
    padding: 20,
    backgroundColor: colorScheme(theme).secondaryColor,
    borderRadius: CSS_PROPERTIES.radius10,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
    [theme.breakpoints.down("sm")]: {
        flexBasis: '96%'
    },
    [theme.breakpoints.up("xl")]: {
        flexBasis: '25%',
    }
}))

export const FormLogo = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: -40,
    left: '50%',
    width: 60,
    height: 60,
    borderRadius: '50%',
    backgroundColor: colorScheme(theme).secondaryColor,
    transform: 'translate(-50%)',
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
}))
export const FormHeader = styled(Box)(({ theme }) => ({
    marginTop: 20,
    fontSize: 20,
    fontWeight: 700,
    textAlign: 'center'
}))
export const ContinueWith = styled(Box)(({ theme }) => ({
    flexBasis: '100%',
    position: 'relative',
    marginBottom: 15,
    borderBottom: `1px solid ${colorScheme(theme).quaternay}`
}))
export const ContinueWithOverlayText = styled(Box)(({ theme }) => ({
    position: 'absolute',
    left: '50%',
    top: -12,
    backgroundColor: colorScheme(theme).secondaryColor,
    transform: 'translate(-50% )'
}))

export const Textarea = styled(TextareaAutosize)(({ theme }) => ({
    padding: 10,
    resize: 'none',
    fontFamily: 'inherit',
    outline: 'none',
    borderRadius: CSS_PROPERTIES.radius5,
    color: colorScheme(theme).TextColor,
    backgroundColor: colorScheme(theme).secondaryColor,
    borderColor: theme.palette.grey[400],
    transition: '0.3s all',
    '&:hover': {
        borderBottom: `4px solid ${colors.teal[400]}`
    },
    [theme.breakpoints.down("sm")]: {
        flex: 1
    }
}))

export const SearchInputWrap = styled(Box)(({ theme }) => ({
    flexBasis: '78%',
    display: 'flex',
    alignItems: 'center',
    transition: '0.3s all',
    backgroundColor: colorScheme(theme).secondaryColor,
    borderRadius: CSS_PROPERTIES.radius5,
    border: `1px solid ${colorScheme(theme).chatBoarderColor}`,
    '&:hover': {
        borderBottom: `4px solid ${colors.teal[400]}`
    },
    [theme.breakpoints.down("sm")]: {
        flex: 1
    }
}))
export const SearchInput = styled(InputBase)(({ theme }) => ({
    flex: 1,
    padding: '8px 10px 8px 0',
    backgroundColor: 'transparent',
    borderRadius: CSS_PROPERTIES.radius5,
}))
export const StyledInput = styled('input')(({ theme }) => ({
    flex: 1,
    outline:'none',
    padding: '8px 10px 8px 0',
    backgroundColor: 'transparent',
    border:0,
    borderRadius: CSS_PROPERTIES.radius5,
}))


export const StyledButton = styled(ButtonBase)(({ theme }) => ({
    textTransform: 'capitalize',
    fontWeight: 500,
    padding: '0 10px',
    height: 40,
    color: '#fff',
    fontSize: 16,
    alignItems:'center',
    borderRadius: CSS_PROPERTIES.radius5,
    backgroundColor: colors.teal[400],
}))
export const StyledButtonOutlined = styled(StyledButton)(({ theme }) => ({
    fontSize: 15,
    padding: '0 10px',
    color: colors.teal[400],
    border: '1px solid',
    borderColor: colors.teal[400],
    backgroundColor: 'transparent',
    transition: '0.3s all',
    '&:hover': {
        color: '#fff',
        backgroundColor: colors.teal[400]
    }
}))

export const TabButton = styled(StyledButton)(({ theme }) => ({
    fontWeight: 500,
    padding: '0 10px',
    margin: '0 5px',
    fontSize: 13,
    whiteSpace: 'nowrap',
    borderRadius: 29,
    color: colorScheme(theme).TextColor,
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : colorScheme(theme).secondaryColor,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
}))


export const RedirectingCard = styled(Box)(({ theme }) => ({
    width: '100%',
    height: 200,
    fontSize: 20,
    fontWeight: 600,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.teal[400]
}))

export const Badge = styled(Box)(({ theme }) => ({
    position: 'absolute',
    right: 0,
    top: 0,
    width: 15,
    height: 15,
    borderRadius: 29,
    fontSize: 13,
    color: '#fff',
    backgroundColor: colors.teal[400]
}))


export const CartAndWishListModalContainer = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '35%',
    height: 'auto',
    transform: 'translate(-50%, -50%)',
    borderRadius: CSS_PROPERTIES.radius10,
    backgroundColor: colorScheme(theme).secondaryColor,
    [theme.breakpoints.down("sm")]: {
        position: 'absolute',
        left: 0,
        width: '100%',
        transform: 'none',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        top: 'unset',
        bottom: 0
    }
}))

export const StyledBox = styled(Box)(({ theme }) => ({
    //minHeight: 100,
    padding: 10,
    borderRadius: CSS_PROPERTIES.radius10,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : colorScheme(theme).secondaryColor
}))