import { Box, styled, Typography } from '@mui/material'
import React from 'react'
import { Avatar, ButtonIcon } from '../../reusable/styles'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import classes from '../../styles/thread.module.css'
import { colorScheme } from '../../theme';

const ThreadContainer = styled(Box)(({ theme }) => ({
  flexBasis: '100%',
  flexWrap: 'wrap'

}))
const ThreadText = styled(Typography)(({ theme }) => ({

}))

const Thread = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: 'fit-content',
  height: 'fit-content',
  padding: 8,
  borderRadius: 10,
  margin: '20px 0',
  backgroundColor: colorScheme(theme).secondaryColor
}))
const ChatAvatar = styled(Avatar)(({ theme }) => ({
  margin: '0 10px 0 0',
}))
const ThreadHead = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: -22,
  left: 0
}))
const ThreadOptions = styled(Box)(({ theme }) => ({
  transition: '0.3s all'
}))
const ThreadImage = styled(Box)(({ theme }) => ({

}))
const ThreadOptionButton = styled(ButtonIcon)(({ theme }) => ({
  width: 30,
  height: 30,
}))





type Props = {
  message: {
    body: string,
    owner: boolean
    name: string
  }
}

export default function ChatThread({ message }: Props) {
  return (

    <ThreadContainer className={classes.ThreadContainer} sx={{
      display: !message.owner ? 'flex' : 'grid',
      gridTemplateColumns: '1fr 30px'
    }}>
      {!message.owner && <ChatAvatar></ChatAvatar>}

      <Thread sx={{
        borderTopLeftRadius: !message.owner ? 0 : 10,
        borderBottomRightRadius: message.owner ? 0 : 10,
        justifySelf: message.owner ? 'right' : 'left'
      }}>

        <ThreadHead sx={{
          left: !message.owner ? 0 : 'unset',
          right: message.owner ? 0 : 'unset',
        }}>
          <ThreadText sx={{ fontSize: 12 }}>
            {!message.owner ? `${message.name}, 15:47` : '14:47'}
          </ThreadText>
        </ThreadHead>
        <ThreadText> {message.body}</ThreadText>
      </Thread>

      <ThreadOptions className={classes.threadOption} sx={{
        justifySelf: message.owner ? 'right' : 'left',
        margin: message.owner ? ' 0 -5px 0 0' : 0
      }}>
        <ThreadOptionButton >
          {!message.owner ? <AddReactionOutlinedIcon fontSize='inherit' /> : <MoreVertOutlinedIcon fontSize='inherit' />}
        </ThreadOptionButton>
      </ThreadOptions>

    </ThreadContainer >

  )
}