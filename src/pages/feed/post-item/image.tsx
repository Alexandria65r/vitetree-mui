import React from 'react'
import { Asset } from '../../../reusable/interfaces'
import { Box, styled, useMediaQuery } from '@mui/material'
import { colorScheme } from '../../../theme'
import { Image, Transformation } from 'cloudinary-react'
import { useWindowSize } from 'react-use'

const PostCover = styled(Box)(({ theme }) => ({
  height: 'auto',
  backgroundColor: colorScheme(theme).greyToTertiary,
  [theme.breakpoints.down('sm')]: {
    //height: 180,
  }
}))



type Props = {
  imageAssets:Asset
}

export default function PostImage({ imageAssets }: Props) {
  const { width, height } = useWindowSize()
  const isMobile = useMediaQuery('(max-width:600px)')

  return (
    <PostCover>
      <Image style={{ width: '100%', height: '100%' }} cloudName='alexandriah65' publicId={imageAssets?.publicId ?? ''}>
          {isMobile ?
            <Transformation width={width - 15} height={200} crop="thumb" />
            :
            <Transformation width={686} height={386} crop="thumb" />
          }
        </Image>
    </PostCover>
  )
}