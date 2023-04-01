
import { Box, styled, Typography, useMediaQuery } from '@mui/material'
import { ButtonIcon } from '../../reusable/styles'
import classes from '../../styles/thread.module.css'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

import { MessageThread } from '../../reusable/interfaces';
import * as types from '../../reusable'
import { useAppDispatch } from '../../../store/hooks';
import { mainActions } from '../../../reducers';
import { colorScheme } from '../../theme';
import chatClasses from '../../styles/chat.module.css'

const ThreadHead = styled(Box)(({ theme }) => ({
    position: 'absolute',
    bottom: -22,
    left: 0,
}))
const ThreadText = styled(Typography)(({ theme }) => ({
    color: theme.palette.grey[500]
}))
const ThreadOptions = styled(Box)(({ theme }) => ({
    transition: '0.3s all'
}))

const ThreadImageContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: 220,
    height: 160,
    padding: 8,
    borderRadius: 10,
    backgroundColor: colorScheme(theme).threadChildColor
}))
const ThreadAudioContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: 220,
    height: 40,
    padding: 8,
    borderRadius: 10,
    backgroundColor: colorScheme(theme).threadChildColor
}))
const ThreadOptionButton = styled(ButtonIcon)(({ theme }) => ({
    width: 30,
    height: 30,
    color: colorScheme(theme).TextColor,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
    backgroundColor: colorScheme(theme).chatPrimaryColor
}))


type Props = {
    message: MessageThread
}

export function ThreadHeader({ message }: Props) {

    return <ThreadHead className={classes.ThreadHead}
     sx={(theme)=>({
        left: !message.owner ? 0 : 'unset',
        right: message.owner ? 0 : 'unset',
        [theme.breakpoints.down("sm")]:{
            left: message.owner ? 0 : 'unset',
        }
    })}>
        <ThreadText sx={{ fontSize: 12 }}>
            {!message.owner ? ` ${message.name}, 15:47` : 'sent at 14:47'}
        </ThreadText>
    </ThreadHead>;
}

export function ThreadOption({ message }: Props) {
    const dispatch = useAppDispatch()
    const { ReactToMessage, MessageMoreOptions } = types.REUSABLE_POPPER
    const popperId = !message.owner ? `${message._id}${ReactToMessage.popperId}` : `${message._id}${MessageMoreOptions.popperId}`
    const isMobile = useMediaQuery('(max-width:600px)')
    function openMessageMoreOptions() {
        dispatch(mainActions.setPopperState({
            component: MessageMoreOptions.component,
            popperId,
            placement: isMobile ? 'auto-end' : MessageMoreOptions.placement
        }))
    }

    return (<ThreadOptions className={classes.threadOption}

        sx={{
            justifySelf: message.owner ? 'right' : 'left',
            margin: message.owner ? ' 0 -5px 0 0' : 0
        }}>
        <ThreadOptionButton onClick={openMessageMoreOptions}>
            <MoreVertOutlinedIcon fontSize='inherit' />
        </ThreadOptionButton>
    </ThreadOptions>);
}


export function ThreadImage({ message }: Props) {
    return (
        <ThreadImageContainer sx={{
            borderTopLeftRadius: !message.owner ? 0 : 10,
            borderBottomRightRadius: message.owner ? 0 : 5,
            borderBottomLeftRadius: message.owner ? 5 : 5,
        }}>
        </ThreadImageContainer>
    )
}
export function ThreadAudio({ message }: Props) {
    return (
        <ThreadAudioContainer sx={{
            borderTopLeftRadius: !message.owner ? 0 : 10,
            borderBottomRightRadius: message.owner ? 0 : 5,
            borderBottomLeftRadius: message.owner ? 5 : 5,
        }}>
        </ThreadAudioContainer>
    )
}