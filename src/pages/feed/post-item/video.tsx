import React from 'react'
import { Asset } from '../../../reusable/interfaces'
import { Box, styled } from '@mui/material'
import { colorScheme } from '../../../theme'

const PostCover = styled(Box)(({ theme }) => ({
    minHeight: 280,
    backgroundColor: colorScheme(theme).greyToTertiary,
    [theme.breakpoints.down('sm')]: {
        minHeight: 231,
    }
}))



type Props = {
    videoAssets: Asset
}

export default function PostVideo({ videoAssets }: Props) {
    return (
        <PostCover>
            <video className='html5-video-player' src={videoAssets?.secureURL} controls />


            <style jsx>{`
        @media (orientation: landscape) {
          .html5-video-player {
            position: relative;
            top: 0px !important;
            width: 100%;
            height: 100vh;
            object-fit: contain;
            overflow: hidden;
            z-index: 0;
            outline: 0;
            color: #eee;
            text-align: left;
            direction: ltr;
            font-size: 11px;
            line-height: 1.3;
            -webkit-font-smoothing: antialiased;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            -ms-touch-action: manipulation;
            touch-action: manipulation;
            -ms-high-contrast-adjust: none;
            border-radius:0px;
          }
        }

        @media (orientation: portrait) {
          .html5-video-player {
            position: relative;
            top: 0px !important;
            width: 100%;
            height: auto;
            object-fit: contain;
            overflow: hidden;
          }
        } 
        @media (min-width: 320px) {
          .html5-video-player {
            position: relative;
            top: 4px;
            width: 100%;
            height: 208px !important;
            object-fit: contain;
            overflow: hidden;
            z-index: 0;
            outline: 0;
            color: #eee;
            text-align: left;
            direction: ltr;
            font-size: 11px;
            line-height: 1.3;
            -webkit-font-smoothing: antialiased;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            -ms-touch-action: manipulation;
            touch-action: manipulation;
            -ms-high-contrast-adjust: none;
          }
          .html5-video-player {
            background-color: #000;
          }
          .html5-video-player.unstarted-mode,
          .html5-video-player.ad-showing,
          .html5-video-player.ended-mode,
          .html5-video-player.ytp-fullscreen {
            background-color: #000;
          }
        }

        @media (min-width: 375px) {
          .html5-video-player {
            position: relative;
            top: 4px;
            max-width: 1280px;
            height: 210px;
            object-fit: contain;
            overflow: hidden;
          }
        }
        @media (min-width: 412px) {
          .html5-video-player {
            position: relative;
            top: 4px;
            max-width: 1280px;
            height: 231px !important;
            object-fit: contain;
            overflow: hidden;
          }
        }
        @media (min-width: 712px) {
          .html5-video-player {
            position: relative;
            top: 4px;
            max-width: 1280px;
            height: 395px !important;
            object-fit: contain;
            overflow: hidden;
          }
        }
        @media (min-width: 768px) {
          .html5-video-player {
            position: relative;
            top: 4px;
            max-width: 1280px;
            height: 414px !important;
            object-fit: cover;
            overflow: hidden;
          }
        }

        @media (min-width: 1024px) {
          .html5-video-player {
            position: relative;
            top: 4px;
            max-width: 1280px;
            height: 535px !important;
            object-fit: contain;
            overflow: hidden;
          }
        }

        @media (min-width: 1280px) {
          .html5-video-player {
            position: relative;
            top: 4px;
            max-width: 1280px;
            height: 720px !important;
            object-fit: contain;
            overflow: hidden;
          }
        }
      `}</style>
        </PostCover>
    )
}