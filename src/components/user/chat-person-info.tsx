import { Avatar as AvatarIcon, Box, SxProps, Theme, Typography, useTheme } from "@mui/material"
import { ActiveIndicator, Avatar } from "../../reusable/styles"
import UserAvatar from "./user-avatar"






type ChatPersonInfoProps = {
    userId: string
    fullname: string
    fullnameStyles?: SxProps<Theme> | undefined
    avatarSize: number
    indicatorStyles: SxProps<Theme> | undefined
    subText: string
    changeImagePreview?:any
    changeProfileImage?: () => void

}


export default function ChatPersonInfo({ userId, fullname,
    fullnameStyles, subText, avatarSize,
    indicatorStyles, changeProfileImage, changeImagePreview }: ChatPersonInfoProps) {
    const _theme = useTheme()

    const avatarStyles: SxProps<Theme> | undefined = {
        height: avatarSize, width: avatarSize,
        [_theme.breakpoints.down('sm')]: {
            height: avatarSize, width: avatarSize,
        }
    }
    return (
        <Box sx={{ display: 'flex', position: 'relative', alignItems: 'center' }}>
            <UserAvatar userId={userId}
                changeImagePreview={changeImagePreview}
                changeProfileImage={changeProfileImage} avatarStyles={avatarStyles} />
            <ActiveIndicator sx={indicatorStyles} >

            </ActiveIndicator>
            <Box sx={{ ml: 1.5 }}>
                <Typography sx={{ flex: 1,textTransform:'capitalize', fontWeight: 600, ...fullnameStyles, }}>
                    {fullname}
                </Typography>
                <Typography sx={{ flex: 1, fontSize: 14, color: 'GrayText', fontWeight: 500 }}>
                    {subText}
                </Typography>

            </Box>
        </Box>
    )
}