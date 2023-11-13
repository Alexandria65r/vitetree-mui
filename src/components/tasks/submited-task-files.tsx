import { styled, Box, Typography, LinearProgress, useTheme, colors } from '@mui/material'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { colorScheme } from '../../theme'
import { ButtonIcon } from '../../reusable/styles'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import FileItem from './file-item'
import { downloadTaskFileThunk } from '../../../reducers/tasks-reducer/task-thunks'
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

const RatingItem = styled(Box)(({ theme }) => ({
  padding: 4,
  cursor: 'pointer',
  borderRadius: '29px',
  transition: '0.3s all',
  whiteSpace: 'nowrap',
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
  const ratings = ['🙂Happy', '😍 Very happy', '☹️ Unhappy']
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
          <Text sx={{ fontWeight: 500, fontSize: '16px', lineHeight: '1.2' }}>Describe your satisfaction by the service offered.</Text>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, py: 2 }}>
          {ratings.map((item) => (
            <RatingItem key={item}
              sx={(theme) => ({})}>
              <Text> {item}</Text>
            </RatingItem>
          ))}
        </Box>
      </RateTutor>
    </Container>
  )
}