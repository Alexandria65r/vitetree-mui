import React from 'react'
import { Asset } from '../../../reusable/interfaces'
import { Box, styled, useMediaQuery } from '@mui/material'
import post from '../../../api-services/post'
import { colorScheme } from '../../../theme'
import { Post } from '../../../models/post'
import PostImage from './image'
import PostAudio from './audio'
import PostVideo from './video'










type Props = {
    post: Post
}

export default function RenderVideoAsset({ post }: Props) {
    return (
        <>
            {post?.type === 'photo' ? (<PostImage imageAssets={post.postAssets?.image as Asset} />)
            : post.type === 'video' ? <PostVideo videoAssets={post.postAssets?.video as Asset} /> :
            post?.type === 'audio' ? (<PostAudio audioAssets={post.postAssets?.audio as Asset} />) : <></>}
        </>
    )
}
