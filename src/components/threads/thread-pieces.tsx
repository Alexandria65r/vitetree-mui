
import { Box, styled, Typography } from '@mui/material'
import { ButtonIcon } from '../../reusable/styles'
import classes from '../../styles/thread.module.css'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import { MessageThread } from '../../reusable/interfaces';
const ThreadHead = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: -22,
    left: 0
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
    backgroundColor: theme.palette.grey[100]
}))
const ThreadAudioContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: 220,
    height: 40,
    padding: 8,
    borderRadius: 10,
    backgroundColor: theme.palette.grey[100]
}))
const ThreadOptionButton = styled(ButtonIcon)(({ theme }) => ({
    width: 30,
    height: 30,
    boxShadow:'0 1px 3px 0 #ccc',
    backgroundColor:'#fff'
}))


type Props = {
    message: MessageThread
}

export function ThreadHeader({ message }: Props) {
    return <ThreadHead sx={{
        left: !message.owner ? 0 : 'unset',
        right: message.owner ? 0 : 'unset',
    }}>
        <ThreadText sx={{ fontSize: 12 }}>
            {!message.owner ? `${message.name}, 15:47` : '14:47'}
        </ThreadText>
    </ThreadHead>;
}

export function ThreadOption({ message }: Props) {
    return <ThreadOptions className={classes.threadOption} sx={{
        justifySelf: message.owner ? 'right' : 'left',
        margin: message.owner ? ' 0 -5px 0 0' : 0
    }}>
        <ThreadOptionButton>
            {!message.owner ? <AddReactionOutlinedIcon fontSize='inherit' /> : <MoreVertOutlinedIcon fontSize='inherit' />}
        </ThreadOptionButton>
    </ThreadOptions>;
}


export function ThreadImage({ message }:Props) {
    return (
        <ThreadImageContainer sx={{
            borderTopLeftRadius: !message.owner ? 0 : 10,
            borderBottomRightRadius: message.owner ? 0 : 5,
            borderBottomLeftRadius: message.owner ? 5 : 5,
        }}>
        </ThreadImageContainer>
    )
}
export function ThreadAudio({ message }:Props) {
    return (
        <ThreadAudioContainer sx={{
            borderTopLeftRadius: !message.owner ? 0 : 10,
            borderBottomRightRadius: message.owner ? 0 : 5,
            borderBottomLeftRadius: message.owner ? 5 : 5,
        }}>
        </ThreadAudioContainer>
    )
}