import { styled, Box, Typography, LinearProgress, useTheme, colors } from '@mui/material'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { colorScheme } from '../../theme'
import { ButtonIcon, StyledButton, Textarea } from '../../reusable/styles'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import FileItem from './file-item'
import { downloadTaskFileThunk } from '../../../reducers/tasks-reducer/task-thunks'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';



const Container = styled(Box)(() => ({

}))


const MappedUploadedFiles = styled(Box)(({ theme }) => ({
  //display: 'flex',
  gap: 5,
  flexBasis: '100%',
  padding: '10px',
}))

const FileIte = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  gap: 5,
  cursor: 'pointer',
  //backgroundColor: colors.grey[50]
  boxShadow: '0 1px 3px 0px #ddd'
}))

const Image = styled(Box)(({ theme }) => ({
  width: 50,
  height: 50,
  marginBottom: 5,
  borderRadius: 0,
  backgroundColor: colorScheme(theme).primaryToGrey100Color
}))

const Text = styled(Typography)(({ theme }) => ({

}))

const RateTutor = styled(Box)(({ theme }) => ({

}))

const RatingItem = styled(StyledButton)(({ theme }) => ({
  height: 30,
  padding: 4,
  cursor: 'pointer',
  borderRadius: '29px',
  transition: '0.3s all',
  whiteSpace: 'nowrap',
  backgroundColor: 'transparent',
  color: colorScheme(theme).TextColor,
  border: `1px solid ${colorScheme(theme).borderColor}`,
  '&:hover': {
    color: colors.orange[500],
    borderColor: colors.orange[500],
    transform: 'scale(1.1)',
    fontWeight: 500,
  }
}))

type Props = {}

export default function SubmitedTaskFiles({ }: Props) {
  const _theme = useTheme()
  const dispatch = useAppDispatch()
  const task = useAppSelector((state) => state.TaskReducer.task)
  const [rating, setRating] = useState<{name:string; description:string}>({
    name: '',
    description:''
  })
 
  const ratings = ['🙂 Happy', '😍 Very happy', '☹️ Unhappy', '🙄 Poor']



  function submitRating () {
    console.log(rating)
  }
  return (
    <Container>

      <MappedUploadedFiles>
        {task.delivered?.files.map((item, index) => (
          <FileItem
            key={index}
            item={item}
            isLoading={item.status === 'downloading'}
            buttonIcon={<DownloadOutlinedIcon />}
            onClick={() => dispatch(downloadTaskFileThunk(item))}
          />
        ))}
      </MappedUploadedFiles>

      <RateTutor>
        <Box sx={(theme) => ({ p: 1, borderBottom: `1px solid ${colorScheme(theme).borderColor}` })}>
          <Text sx={{ fontWeight: 500, fontSize: '16px', lineHeight: '1.2' }}>Describe your satisfaction by the service delivered to you.</Text>
        </Box>
        <Box sx={{ display: 'flex',justifyContent:'center', flexWrap: 'wrap', gap: 1, py: 2 }}>
          {ratings.map((item) => (
            <RatingItem key={item}
              onClick={() => setRating({...rating, name:item})}
              sx={(theme) => ({ borderColor: rating?.name === item ? colors.orange[500] : '' })}>
              <Text sx={{ fontSize: '14px' }}>{item}</Text>
            </RatingItem>
          ))}
        </Box>
        {rating.name ? (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent:'center', alignItems: 'center' }}>
            <Text sx={{ flexBasis: '100%', fontSize: 13, fontWeight: 600 }}>Description</Text>
            <Box sx={{ flex: 1 }}>
              <Textarea
                value={rating.description}
                onChange={({ target }) => setRating({...rating, description:target.value})}
                sx={{ width: '100%' }}
                placeholder='Brief discription about your choice..'
              />
            </Box>
            <ButtonIcon
              onClick={submitRating}
            sx={{
              backgroundColor: rating.description ? colors.teal[500] : '',
              color: rating.description ? '#fff' : ''
            }}>
              <SendOutlinedIcon />
            </ButtonIcon>
          </Box>
        ):<></>}

      </RateTutor>
    </Container>
  )
}