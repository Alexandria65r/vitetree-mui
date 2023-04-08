
import { colors, Theme } from "@mui/material";
import { createContext } from "react";

export const ColorModeContext = createContext({ toggleColorMode: () => { } })
export const isDarkMode = (theme: Theme) => theme.palette.mode === 'dark';



export const colorScheme = (theme: Theme) => ({
    // BASIC COLORSCHEME
    primaryColor: isDarkMode(theme) ? '#181b34' : '#f4fcff',
    secondaryColor: isDarkMode(theme) ? '#292d48' : '#fff',
    // NAVBAR
    primaryToGrey100Color: isDarkMode(theme) ? '#181b34' : colors.grey[100],
    // CHAT COLORSCHEME
    chatBGColor: isDarkMode(theme) ? colors.grey[900] : '#FFFFFF',
    chatBodyBGColor: isDarkMode(theme) ? '#1b1d31' : '#f4fcff',
    threadChildColor: isDarkMode(theme) ? '#292d48': colors.grey[100],
    chatPrimaryColor: isDarkMode(theme) ?'#292d48' : '#FFFFFF',
    chatSecondaryColor: isDarkMode(theme) ?'#33385d' : '#FFFFFF',
    chatAvatarColor: isDarkMode(theme) ? '#FFFFFF' : '#33385d',
    chatBoarderColor: isDarkMode(theme) ?'#181b34' : '#ccc',

    // SIDEBAR
    sideBarColor: isDarkMode(theme) ? '#181b34': '#FFFFFF',

    //BORDERS
    borderColor: isDarkMode(theme) ? '#292d48': colors.grey[200],

    //MENU ITEM
    menuItemHoverColor: isDarkMode(theme) ? '#33385d' : colors.grey[200],
    //BUTTON ICON

    buttonIconBGColor: isDarkMode(theme) ? '#33385d' : colors.grey[300],

    bgColor: isDarkMode(theme) ? colors.grey[800] : '#FFFFFF',
    SearchInputBG: isDarkMode(theme) ? colors.grey[800] : colors.grey[200],
    CardBg: isDarkMode(theme) ? colors.grey[800] : colors.grey[200],
    TextColor: isDarkMode(theme) ? colors.grey[200] : colors.grey[800],
})






