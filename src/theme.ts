
import { colors, styled, Theme, Typography, useTheme } from "@mui/material";
import { createContext } from "react";
export const ColorModeContext = createContext({ toggleColorMode: () => { } })
export const isDarkMode = (theme: Theme) => theme.palette.mode === 'dark';



export const colorScheme = (theme: Theme) => ({
    // BASIC COLORSCHEME
    primaryColor: isDarkMode(theme) ? '#0f0f0f' : '#fff',
    lightToprimaryColor: isDarkMode(theme) ? '#0f0f0f' : '#fff',
    lightToSecondaryColor: isDarkMode(theme) ? '#272727' : '#fff',
    grayToprimaryColor: isDarkMode(theme) ? '#0f0f0f' : '#e2e6ea',
    secondaryColor: isDarkMode(theme) ? '#272727' : '#fff',
    grayToSecondaryColor: isDarkMode(theme) ? '#272727' : '#e2e6ea',
    // NAVBAR
    primaryToGrey100Color: isDarkMode(theme) ? '#0f0f0f' : colors.grey[100],
    // CHAT COLORSCHEME
    chatBGColor: isDarkMode(theme) ? colors.grey[900] : '#FFFFFF',
    chatBodyBGColor: isDarkMode(theme) ? '#1b1d31' : '#f4fcff',
    threadChildColor: isDarkMode(theme) ? '#292d48' : colors.grey[100],
    chatPrimaryColor: isDarkMode(theme) ? '#292d48' : '#FFFFFF',
    chatSecondaryColor: isDarkMode(theme) ? '#33385d' : '#FFFFFF',
    chatAvatarColor: isDarkMode(theme) ? '#FFFFFF' : '#33385d',
    chatBoarderColor: isDarkMode(theme) ? '#0f0f0f' : '#ccc',
    lightToTertiary: isDarkMode(theme) ? '#393939' : '#FFF',
    greyToTertiary: isDarkMode(theme) ? '#393939' : '#e2e6ea',
    darkGreyToTertiary: isDarkMode(theme) ? '#393939' : '#c3c5c7',
    tertiary: isDarkMode(theme) ? '#28282d' : '#e2e6ea',
    quaternay: isDarkMode(theme) ? '#3a3a3f' : '#c8cdd1',
    // SIDEBAR
    sideBarColor: isDarkMode(theme) ? '#0f0f0f' : '#FFFFFF',
    shadowColor: isDarkMode(theme) ? '#0f0f0f' : '#ddd',
    //181b34
    //f4fcff
    //BORDERS
    borderColor: isDarkMode(theme) ? '#28282d' : colors.grey[300],

    lightBorderColor: isDarkMode(theme) ? colors.grey[800] : colors.grey[300],

    //MENU ITEM
    menuItemHoverColor: isDarkMode(theme) ? '#33385d' : colors.grey[200],
    //BUTTON ICON

    buttonBGColor: isDarkMode(theme) ? '#272727' : '#e2e6ea',

    bgColor: isDarkMode(theme) ? colors.grey[800] : '#FFFFFF',
    SearchInputBG: isDarkMode(theme) ? colors.grey[800] : colors.grey[200],
    CardBg: isDarkMode(theme) ? colors.grey[800] : colors.grey[200],
    TextColor: isDarkMode(theme) ? colors.grey[200] : colors.grey[800],
})

export function useColorScheme() {
    const _theme = useTheme()
    return colorScheme(_theme)
}

export const ThemedText = styled(Typography)(() => ({
    color: useColorScheme().TextColor
}))






