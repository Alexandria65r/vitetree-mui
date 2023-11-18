

import { Box, styled, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { BsBookmarksFill, BsBookmarks, BsGraphUp } from 'react-icons/bs'
import { FiShare } from 'react-icons/fi'
import { MdContentCopy, MdHideSource } from 'react-icons/md'




import { RiDeleteBin7Line } from 'react-icons/ri'

import * as types from "../../../reusable";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { RWebShare } from "react-web-share";
import { colorScheme } from '../../../theme'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { VideoCourse } from '../../../reusable/interfaces'
import { StyledButton } from '../../../reusable/styles'



const Container = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr',
    padding: 10,
    margin: 1,
    borderRadius: types.CSS_PROPERTIES.radius5,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).primaryColor}`,
    backgroundColor: colorScheme(theme).secondaryColor,
    transition: '0.3s all',
    [theme.breakpoints.down("sm")]: {
        padding: 5,
    }
}))
const MenuItemButton = styled(StyledButton)(({ theme }) => ({
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    color: colorScheme(theme).TextColor,
    fontSize: 16,
    '&:hover': {
        backgroundColor: colorScheme(theme).grayToprimaryColor,
    },
    [theme.breakpoints.up("sm")]: {
        fontSize: 15,
    }
}))


// function useVideoSource(parentComponent: RenderVideoParentComponent) {
//     const { videos, library_videos, relatedVideos } = useAppSelector((state) => state.VideoReducer);
//     const { channelVideos } = useAppSelector((state) => state.ChannelReducer);
//     console.log(parentComponent)
//     switch (parentComponent) {
//         case 'search-videos':
//             return videos
//         case 'library-videos':
//             return library_videos
//         case 'channel-videos':
//             return channelVideos
//         case 'related-videos':
//             return relatedVideos
//         default:
//             return videos
//     }
// }


type Props = {
    videoId?: string
    video:VideoCourse
}

function VideoMenuItems({  videoId, video }: Props) {
    const dispatch = useAppDispatch();
    const isMobile = useMediaQuery('(max-width:600px)')
    const [isCopied, setIsCopy] = useState<boolean>(false);
    const [isVideoSaved, setIsVideoSaved] = useState<boolean>(false);
    const User  = useAppSelector((state) => state.AuthReducer.user);




    useEffect(() => {
        resetIsCopied();
    }, [isCopied]);

    useEffect(() => {
        checkIfVideosIsaved(video?._id);
    }, [User, video]);

    function resetIsCopied() {
        if (isCopied) {
            setTimeout(() => {
                setIsCopy(false);
            }, 3000);
        }
    }

    function handleCopy() {
        setIsCopy(true);
        setTimeout(() => {
            //closeVidMenu(videos, videoIndex, dispatch);
        }, 2000);
    }

    function checkIfVideosIsaved(id:string) {
        // const saved_video = User?.saved_videos?.find((vid) => vid.id === id);
        // console.log(saved_video)
        // if (saved_video?.id) {
        //     setIsVideoSaved(true);
        // } else {
        //     setIsVideoSaved(false);
        // }
    }


 
    const linkToCopy = `${types.host}/watch/${video?._id}`;
    const iconSS = { marginTop: 4, marginRight: 12, }
    return (
        <Container>
            <RWebShare
                data={{
                    text: `Watch ${video?.author?.name} from vitetube a place where content is valued`,
                    title: video?.title,
                    url: `${types.host}/watch/${video?._id}`,
                }}
                onClick={() => console.log("shared successfully..")}
            >
                <MenuItemButton >
                    <FiShare style={iconSS} /> Share
                </MenuItemButton>
            </RWebShare>
            <CopyToClipboard text={linkToCopy} onCopy={handleCopy}>
                <MenuItemButton >
                    <MdContentCopy style={iconSS} />
                    {isCopied ? "Copied" : "  Copy link"}
                </MenuItemButton>
            </CopyToClipboard>
           
                <MenuItemButton>
                    {isVideoSaved ? <BsBookmarksFill style={iconSS} /> : <BsBookmarks style={iconSS} />}
                    {isVideoSaved ? "Saved" : "Save"}
                </MenuItemButton>
            
           

                <MenuItemButton >
                    <MdHideSource style={iconSS} /> Hide Video
                </MenuItemButton>


              
                    <MenuItemButton >
                        <BsGraphUp style={iconSS} />
                        Video Analytics
                    </MenuItemButton>

                    <MenuItemButton
                     
                    >
                        <RiDeleteBin7Line style={iconSS} />
                        Delete video
                    </MenuItemButton>
         
          
            <MenuItemButton>
                    <RiDeleteBin7Line style={iconSS} />
                    Remove video
                </MenuItemButton>
                
        </Container>
    )
}

export default VideoMenuItems