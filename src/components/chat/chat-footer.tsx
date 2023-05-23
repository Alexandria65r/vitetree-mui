import React from 'react'
import { Box, ButtonBase, colors, styled, useMediaQuery } from '@mui/material'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import MicIcon from '@mui/icons-material/Mic';
import KeyboardVoiceOutlinedIcon from '@mui/icons-material/KeyboardVoiceOutlined';
import { BiImageAdd } from 'react-icons/bi'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { ImAttachment } from 'react-icons/im'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import { ButtonIcon } from '../../reusable/styles';
import { Textarea } from '@mui/joy';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import emotionStyled from '@emotion/styled'
import { useAppDispatch } from '../../../store/hooks';
import * as types from '../../reusable'
import { mainActions } from '../../../reducers/main-reducer';
import { colorScheme, isDarkMode } from '../../theme';


const ChatTextFieldWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    //flexBasis: '55%',
    flex: 1,
    alignItems: 'center',
    position: 'relative',
    borderRadius: 29,
    height: 50,
    transition: '0.3s all',
    transformOrigin: 'left',
    backgroundColor: colorScheme(theme).chatPrimaryColor,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
    [theme.breakpoints.down('sm')]: {
        flex: 1,
        width: '5%',
    },
}))

const FooterRightCol = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    transition: '0.3s all',
}))

const ChatTextField = styled(TextareaAutosize)(({ theme }) => ({
    fontFamily: 'inherit',
    // overflow: 'hidden',
    flex: 1,
    border: 0,
    outline: 'none!important',
    resize: 'none',
    borderRadius: 29,
    paddingTop: 6,
    padding: '0 10px',
    alignItems: 'center',
    transition: '0.3s all',
    transformOrigin: 'left',
    backgroundColor: colorScheme(theme).chatPrimaryColor,


}))

const EmojiPickerButton = styled(ButtonBase)(({ theme }) => ({
    width: 30,
    height: 30,
    margin: '5px',
    borderRadius: '50%',
    color: colorScheme(theme).TextColor,
    backgroundColor: colorScheme(theme).chatPrimaryColor
    // boxShadow: '0 1px 3px 0 #ccc',
}))
const IconButton = styled(ButtonIcon)(({ theme }) => ({
    transition: '0.3s all',
    backgroundColor: colorScheme(theme).chatPrimaryColor,
    color: colorScheme(theme).TextColor,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`
}))
type Props = {
    showSendIcon?: boolean,
    showMic?: boolean,
    showAttatchFile?: boolean,
    showOptionsIcon?: boolean
}

export default function ChatFooter({
    showSendIcon,
    showMic,
    showAttatchFile,
    showOptionsIcon, }: Props) {
    const dispatch = useAppDispatch()
    const isMobile = useMediaQuery('(max-width:600px)')
    const is360 = useMediaQuery('(max-width:375px)')
    const isXs = useMediaQuery('(max-width:320px)')
    console.log(isMobile)
    const [isFocused, setIsFocused] = React.useState<boolean>(false)
    const [typedText, setTypedText] = React.useState<string>("")


    function handleOnChange({ target }: any) {
        setTypedText(target.value)
        // const textFieldWrapper: any = document.getElementById("textFieldWrapper")
        // const textField: any = document.getElementById("textField");
        // textField.style.cssText = 'height:0px';
        // setTimeout(() => {
        //     const height = Math.min(50 * 5, textField?.scrollHeight);
        //     textFieldWrapper.style.cssText = 'height:' + height + "px"
        //     textField.style.cssText = 'height:' + height + "px"
        // }, 0)


    }

    function toggleFilesOptions() {
        dispatch(mainActions.setPopperState({
            ...types.REUSABLE_POPPER.FilesOptions
        }))
    }

    return (
        <>
            <ChatTextFieldWrapper id="textFieldWrapper" sx={{}}>
                <EmojiPickerButton>
                    <SentimentSatisfiedAltIcon />
                </EmojiPickerButton>
                <ChatTextField
                    // color='success'
                    id="textField"
                    maxRows={2}
                    onChange={handleOnChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={!isFocused && isMobile ? 'Message...' : 'Write your message'}
                />

            </ChatTextFieldWrapper>

            {typedText || showSendIcon ? (
                <FooterRightCol>
                    <IconButton sx={(theme) => ({
                        color: typedText || showSendIcon ? theme.palette.primary.light : ''
                    })}>
                        <SendOutlinedIcon />
                    </IconButton>
                </FooterRightCol>

            ) : (<>
                {isMobile && isFocused ? (
                    <FooterRightCol>
                        <IconButton>
                            <ChevronLeftOutlinedIcon />
                        </IconButton>
                    </FooterRightCol>
                ) : (
                    <FooterRightCol>
                        {showAttatchFile ? (
                            <IconButton id={types.REUSABLE_POPPER.FilesOptions.popperId} onClick={toggleFilesOptions}>
                                <AddPhotoAlternateOutlinedIcon />
                            </IconButton>
                        ) : <></>}


                        {!isXs && showMic ? (
                            <IconButton>
                                <KeyboardVoiceOutlinedIcon />
                            </IconButton>
                        ) : <></>}


                        {showOptionsIcon ? (
                            < IconButton >
                                <MoreHorizOutlinedIcon />
                            </IconButton>
                        ) : <></>}


                    </FooterRightCol>
                )}
            </>)}
        </>
    )
}