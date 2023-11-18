import { styled, Box, colors, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import { BsCheckCircleFill } from 'react-icons/bs'
import VideoPopperMenu from './video-popper-menu'
import Link from "next/link";
import { Image, Transformation } from "cloudinary-react";

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ChannelAvatar from './channel-avatar'
import VideoUndoAction from './video-undo-action'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { normalizedDate } from '../../../reusable/helpers';
import { colorScheme, ThemedText, useColorScheme } from '../../../theme';
import { VideoCourse } from '../../../reusable/interfaces';



const VideoCardContainer = styled(Box)(({ theme }) => ({
    margin: 0,
    [theme.breakpoints.down('sm')]: {
        backgroundColor: 'transparent',
        padding: 0,
        marginTop: 4,
        marginBottom: 10
    },
}))

const TitleCol = styled(Box)(({ theme }) => ({
    width: 200,
    [theme.breakpoints.up('lg')]: {
        width: 180,
    },
    [theme.breakpoints.up('xl')]: {
        width: 220,
    }
}))

const ChannelNameCol = styled(Box)(({ theme }) => ({
    flexBasis: '100%',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
        flex: 'unset'
    },

}))
const VideoCardBody = styled(Box)(() => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-start',
    marginTop: 10,
}))


const VideoThumbnail = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? colors.grey[300] : colorScheme(theme).secondaryColor,
    borderRadius: 10,
}))


type Props = {
    isGrid?: boolean
    video: VideoCourse
    videoIndex: number
   // parentComponent: RenderVideoParentComponent
}

function VideoCard({ isGrid, video, videoIndex }: Props) {
    const dispatch = useAppDispatch()
    const isMobile = useMediaQuery('(max-width:600px)')
    const _theme = useTheme()
 
    return (
        <VideoCardContainer
            id="video-card"
            sx={{
                position: 'relative',
                paddingBottom: 1,
                display: isGrid ? 'grid' : '',
                gridTemplateColumns: '1fr 1fr'
            }}>
{/* 
            {video?.user_actions_type === "delete_video" ||
                video?.user_actions_type === "hide_video" ? (
                <VideoUndoAction videoIndex={videoIndex} video={video} />
            ) : (
                ""
            )} */}

            <Link href={`/course/${video._id}`}>
                <Image
                    cloudName="alexandriah65"
                    publicId={video?.imageAsset.publicId}
                    style={{ width: '100%', borderRadius: isMobile ? 10 : '10px',border:`1px solid ${colorScheme(_theme).greyToTertiary}`, }}
                >
                    <Transformation width="686" height="386" crop="thumb" />
                    <Transformation fetchFormat="webp" />
                </Image>
            </Link>
            <VideoCardBody>
                {!isGrid && isMobile ? (
                    <ChannelAvatar
                        href={''}
                        publicId={video.imageAsset.publicId}
                        name={video.author?.name}
                        classes={{}}
                                           />
                ) : !isGrid && isMobile ? (
                    <ChannelAvatar
                        href={''}
                         publicId={video.imageAsset.publicId}
                        name={video.author.name}
                        classes={{}}
                        />
                ) : !isGrid && !isMobile ? (
                    <ChannelAvatar
                        href={''}
                         publicId={video.imageAsset.publicId}
                        name={video.author?.name}
                        classes={{}}
                        />
                )
                    : <></>
                }

                <Link href={`/course/${video._id}`}>



                    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                        <TitleCol sx={(theme) => ({
                            [theme.breakpoints.down('sm')]: {
                                width: isGrid ? 160 : 250,
                            },
                            [theme.breakpoints.up('md')]: {
                                width: isGrid ? 120 : 120,
                            },
                            [theme.breakpoints.up('lg')]: {
                                width: 180,
                            },
                            [theme.breakpoints.up('xl')]: {
                                width: 220,
                            }
                        })}>
                            <ThemedText ml={1} sx={{
                                fontSize: 14, lineHeight: 1.4, overflow: 'hidden',
                                display: '-webkit-box',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'normal',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 2,
                                color: useColorScheme().TextColor,
                                fontWeight: 600
                            }}>
                                {video.title}
                            </ThemedText>
                        </TitleCol>
                        <ChannelNameCol>
                            <ThemedText ml={1} fontSize={14} sx={{ color:  'GrayText' }}>
                                FreeMan
                            </ThemedText>
                            <BsCheckCircleFill size={14} style={{ marginLeft: 5, color: colors.green[400] }} />
                        </ChannelNameCol>
                        <FiberManualRecordIcon
                            sx={{
                                ml: .9,
                                mt: -.4,
                                fontSize: 7,
                                color:  'GrayText',
                                display: 'none',
                                [_theme.breakpoints.down('sm')]: {
                                    display: 'flex',
                                }
                            }} />
                        <Box sx={{
                            flexBasis: '100%',
                            display: 'flex', alignItems: 'center', flexWrap: 'wrap',
                            [_theme.breakpoints.down('sm')]: {
                                flex: isMobile && !isGrid ? 1 : 'unset'
                            }
                        }}>
                            <ThemedText ml={1} fontSize={14} sx={{ color:  'GrayText' }}>
                               10 Views
                            </ThemedText>
                            <FiberManualRecordIcon sx={{ ml: .9, mt: -.4, fontSize: 7, color: 'GrayText' }} />
                            <ThemedText ml={1} sx={{ color:  'GrayText' }} fontSize={14}>
                                {normalizedDate(video?.createdAt)}{" "}
                                {normalizedDate(video?.createdAt).includes("min") ? (
                                    ""
                                ) : normalizedDate(video?.createdAt).includes("now") ? (
                                    ""
                                ) : <></>}
                            </ThemedText>
                        </Box>
                    </Box>
                </Link>
                <VideoPopperMenu videoId={video._id} video={video} />
            </VideoCardBody>
        </VideoCardContainer>

    )
}

export default VideoCard