import React from 'react'
import { Asset } from '../../../reusable/interfaces'
import { Box, styled, useMediaQuery } from '@mui/material'
import post from '../../../api-services/post'
import { colorScheme } from '../../../theme'
import { Post } from '../../../models/post'
import PostImage from './image'
import PostAudio from './audio'
import PostVideo from './video'
import { useAppSelector } from '../../../../store/hooks'










type Props = {
    post: Post
}

export default function RenderVideoAsset({post }: Props) {
   
    return (
        <>
            {post?.type === 'photo' && post?.postAssets?.image?.secureURL && (<PostImage imageAssets={post?.postAssets?.image as Asset} />)}
            {post?.type === 'video' && post?.postAssets?.video?.secureURL && <PostVideo videoAssets={post?.postAssets?.video as Asset} />}
            {post?.type === 'text' ? (<PostAudio audioAssets={post?.postAssets?.audio as Asset} />) : <></>}
        </>
    )
}
