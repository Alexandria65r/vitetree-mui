import { Box, Typography, colors, styled } from "@mui/material"
import { StyledButtonOutlined } from "../../reusable/styles"
import { CSS_PROPERTIES } from "../../reusable"
import { colorScheme, useColorScheme } from "../../theme"
import { KeyboardArrowRightOutlined } from '@mui/icons-material'



const Container = styled(Box)(({ theme }) => ({
    flexBasis: '49%',
    minHeight: 120,
    borderRadius: CSS_PROPERTIES.radius5,
    padding: 10,
    border: `1px solid ${colorScheme(theme).borderColor}`,
    [theme.breakpoints.down("sm")]: {
        flexBasis: '100%',
        marginBottom: 10
    }
}))



type RenderResponseCardProps = {
    title: string,
    btValue?: string,
    description: string
    clickHandler: () => void
}
const ResponseCard = ({ title, btValue, description, clickHandler }: RenderResponseCardProps) => {
    const _colorScheme = useColorScheme()
    return (
        <Container>
            <Typography sx={{fontSize: 15, color: colors.teal[400], fontWeight: 500 }}>
                {title}
            </Typography>
            <Typography sx={{ my: 1, fontSize: 13,lineHeight:1.3, color: _colorScheme.TextColor }}>
                {description}
            </Typography>
            <Box sx={(theme) => ({
                display: 'flex',
                justifyContent: 'flex-end',
                [theme.breakpoints.down("sm")]: {

                }
            })}>
                <StyledButtonOutlined onClick={clickHandler}>
                    {btValue || 'Send Feedback'}  <KeyboardArrowRightOutlined />
                </StyledButtonOutlined>
            </Box>

        </Container>
    )
}

export default ResponseCard