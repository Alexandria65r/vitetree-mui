import { Box, Popover, styled, useMediaQuery, useTheme } from '@mui/material'
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import classes from '../../../styles/reusable.module.css'
import React, { } from 'react'
import VideoMenuItems from './video-menu-items';
import { ButtonIcon } from '../../../reusable/styles';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { useColorScheme } from '../../../theme';
import { VideoCourse } from '../../../reusable/interfaces';




const MenuButton = styled(ButtonIcon)(() => ({
    width: 30,
    height: 30,
    marginTop: -2,
    justifySelf: 'flex-end',
    backgroundColor: 'transparent'
}))


type Props = {
    videoId: string
    video:VideoCourse
   
}

function VideoPopperMenu({ videoId,video }: Props) {
    const isMobile = useMediaQuery('(max-width:600px)')
    const dispatch = useAppDispatch()
    const _theme = useTheme()



    function openVideoMenu() {
        // dispatch(mainActions.setRenderVideoParentComponent(parentComponent));
        // dispatch(mainActions.setMenuVideoId(videoId));
        // dispatch(mainActions.setCardMenu({
        //     bool: true,
        //     component: "video_menu",
        //     options: {
        //         parentComponent
        //     }
        // }));
    }
    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', position: 'unset', right: 0 }}>
            <PopupState variant='popper' popupId='test-card-options'>
                {((popupState) => (
                    <Box>
                        {isMobile ? (<MenuButton onClick={openVideoMenu}
                            sx={{

                                backgroundColor: popupState.isOpen ? useColorScheme().secondaryColor : '',
                                [_theme.breakpoints.up('md')]: {
                                    mr: -1
                                }
                            }}>
                            <MoreVertOutlinedIcon fontSize='small' />
                        </MenuButton>) : (<MenuButton {...bindTrigger(popupState)}
                            sx={{

                                backgroundColor: popupState.isOpen ? useColorScheme().secondaryColor : '',
                                [_theme.breakpoints.up('md')]: {
                                    mr: -1
                                }
                            }}>
                            <MoreVertOutlinedIcon fontSize='small' />
                        </MenuButton>)}


                        <Popover {...bindPopover(popupState)}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            classes={{
                                root: classes.PopperContainer,
                                paper: classes.CustomPaper
                            }}
                        >
                            <VideoMenuItems videoId={videoId} video={video} />
                        </Popover>

                    </Box>
                ))}
            </PopupState>

        </Box>
    )
}

export default VideoPopperMenu