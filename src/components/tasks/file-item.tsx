import { styled, Box, Typography, LinearProgress, useTheme, colors } from '@mui/material'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { colorScheme } from '../../theme'
import { ButtonIcon } from '../../reusable/styles'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import { FileAsset } from '../../models/task'
const Container = styled(Box)(() => ({

}))


const MappedUploadedFiles = styled(Box)(({ theme }) => ({
  //display: 'flex',
  gap: 5,
  flexBasis: '100%',
  padding: '10px',
}))

const ListItem = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  columnGap: 5,
  cursor: 'pointer',
  //backgroundColor: colors.grey[50]
  boxShadow: '0 1px 3px 0px #ddd',
  marginBottom: 5,
}))

const Image = styled(Box)(({ theme }) => ({
  alignSelf: 'center',
  margin: 3,
  width: 50,
  height: 50,
  borderRadius: 0,
  backgroundColor: colorScheme(theme).primaryToGrey100Color
}))

const Text = styled(Typography)(({ theme }) => ({

}))


type Props = {
  item: FileAsset,
  isLoading?: boolean
  buttonIcon: React.ReactNode
  onClick?: () => void
  hideButton?: boolean
}

export default function FileItem({ item, isLoading, buttonIcon, onClick, hideButton }: Props) {
  const _theme = useTheme()
  return (
    <ListItem className='FileItem'>
      <Image>

      </Image>
      <Box sx={{ flexBasis: '65%', }}>
        <Text sx={{
          width: '200px',
          lineHeight: 1.2, fontSize: '14px',
          whiteSpace: 'nowrap',
          overflowX: 'hidden',
          textOverflow: 'ellipsis',
          [_theme.breakpoints.down('sm')]: {
            width: '180px',
          }
        }}>{item.name}</Text>
        <Text sx={{ fontSize: '13px' }}>{item.format}</Text>
      </Box>
      {!hideButton && (
        <ButtonIcon onClick={onClick}
          sx={{ alignSelf: 'center' }}>
          {buttonIcon}
        </ButtonIcon>
      )}
      <Box sx={{ flexBasis: '100%', display: isLoading ? 'flex' : 'none', position: 'relative', width: '100%', alignSelf: "flex-end" }}>
        <LinearProgress color='info' variant='indeterminate'
          sx={{ flex: 1, mt: 0 }}
        />
      </Box>
    </ListItem>
  )
}