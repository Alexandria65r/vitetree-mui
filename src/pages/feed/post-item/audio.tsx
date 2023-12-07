import React from 'react'
import { Asset } from '../../../reusable/interfaces'
import { Box } from '@mui/material'

type Props = {
  audioAssets:Asset
}

export default function PostAudio({ audioAssets }: Props) {
  return (
    <Box sx={{height:100,display:'flex',alignItems:'center', justifyContent:'center'}}>
      <audio src='https://res.cloudinary.com/alexandriah65/video/upload/v1679314196/audios/aqcszapett05dldh5244.mp3' controls />
    </Box>
  )
}