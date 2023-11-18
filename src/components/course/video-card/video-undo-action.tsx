import React from 'react'
import { useAppDispatch } from '../../store/hooks'
import { undoActionThunk } from '../../reducers/video-reducer/video-thunks'
import { videoUpload } from '../../reusable/interfaces'
import { Box, colors, styled } from '@mui/material'
import ReusableButton from '../ui/reusable-button'
import { ThemedText, colorScheme } from '../../theme'

const Container = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '100%',
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0, zIndex: 5,
    borderRadius: 6,
    backgroundColor: colorScheme(theme).grayToSecondaryColor

}))




type Props = {
    accent_color: string
    videoIndex: number
    video: videoUpload
}

export default function VideoUndoAction({ accent_color, videoIndex, video }: Props) {
    const dispatch = useAppDispatch()
    return (
        <Container
            style={{
                borderColor: accent_color,
                top: -1,
            }}
        >
            <Box sx={{ display: 'grid', justifyContent: 'center' }}>
                <ThemedText
                    sx={(theme) => ({
                        marginBlock: '8px',
                        fontSize: '16px', color: accent_color,
                        [theme.breakpoints.up('md')]: {
                            fontSize: '16px',
                        },
                        [theme.breakpoints.up('lg')]: {
                            fontSize: '18px',
                        }
                    })}
                >
                    {video?.user_actions_type === "delete_video"
                        ? " Video was deleted"
                        : "You won't see this video again"}
                </ThemedText>
                <ReusableButton
                    onClick={() => dispatch(undoActionThunk(videoIndex))}
                    value={video?.user_actions_type === "delete_video" ? "Undo delete" : "Undo hide"}
                    sx={{ backgroundColor: colors.pink[500], color: '#fff' }}
                />
            </Box>
        </Container>
    )
}