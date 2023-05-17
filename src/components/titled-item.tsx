import { useTheme } from "@mui/material"
import { Box, Typography } from "@mui/material"
import { useColorScheme } from "../theme"

type TaskInfoItemProps = {
    title: string
    value: string
}

export default function TitledItem({ title, value }: TaskInfoItemProps) {
    const theme = useTheme()
    const _colorScheme = useColorScheme()
    return (
        <Box sx={{
            p: .6,
            flexBasis: '30%',
            border: `1px solid`,
            borderColor: theme.palette.mode === 'light' ? '#ddd' : _colorScheme.primaryColor,
            borderRadius: 29

        }}>
            <Typography sx={{ fontSize: 13, lineHeight: 1.2, textAlign: 'center' }}>{title}</Typography>
            <Typography sx={{ fontSize: 13, lineHeight: 1.2, textAlign: 'center' }}>{value}</Typography>
        </Box>
    )
}