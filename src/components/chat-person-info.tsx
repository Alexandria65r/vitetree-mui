import { Avatar, Box, SxProps, Theme, Typography, useTheme } from "@mui/material"
import { ActiveIndicator } from "../reusable/styles"

type ChatPersonInfoProps = {
    fullname: string
    fullnameStyles?: SxProps<Theme> | undefined
    avatarSize: number
    indicatorStyles: SxProps<Theme> | undefined
    subText: string

}


export default function ChatPersonInfo({ fullname, fullnameStyles, subText, avatarSize, indicatorStyles }: ChatPersonInfoProps) {
    const _theme = useTheme()
    return (
        <Box sx={{ display: 'flex', position: 'relative', alignItems: 'center' }}>
            <Avatar sx={{
                height: avatarSize, width: avatarSize,
                [_theme.breakpoints.down('sm')]: {
                    height: avatarSize, width: avatarSize,
                }
            }}>
            </Avatar>
            <ActiveIndicator sx={indicatorStyles} >

            </ActiveIndicator>
            <Box sx={{ ml: 1.5 }}>
                <Typography sx={{ flex: 1, fontWeight: 600, ...fullnameStyles, }}>
                    {fullname}
                </Typography>
                <Typography sx={{ flex: 1, fontSize: 14, color: 'GrayText', fontWeight: 500 }}>
                    {subText}
                </Typography>

            </Box>
        </Box>
    )
}