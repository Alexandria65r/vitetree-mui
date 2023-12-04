import { Menu, colors, styled, useMediaQuery } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { ThemedText, colorScheme } from '../../../theme';
import { StyledButton } from '../../../reusable/styles';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import SendTipMenu from './send-tip-menu';
import { mainActions } from '../../../../reducers/main-reducer';
import StarsOutlinedIcon from '@mui/icons-material/StarsOutlined';
import { Tip } from '../../../models/post';


const SendTipButton = styled(StyledButton)(({ theme }) => ({
    marginLeft: 13, height: 30, fontSize: 14,
    backgroundColor: colorScheme(theme).lightToSecondaryColor,
    color: colorScheme(theme).TextColor,
    border: `1px solid ${colorScheme(theme).greyToTertiary}`,
    borderBottomWidth: 3,
    transition: '0.3s all',
    '&:hover': {
        borderColor: colors.teal[500]
    }
}))



type Props = {
    postId: string
}

function SendTipPopper({ postId }: Props) {
    const dispatch = useAppDispatch()
    const isMobile = useMediaQuery('(max-width:600px)')
    const user = useAppSelector((state) => state.AuthReducer.user)
    const posts = useAppSelector((state) => state.PostReducer.posts)
    const [currentTip, setCurrentTip] = useState<Tip>()

    const getUserTip = useCallback(() => {
        const post = posts.find((postItem) => postItem.postId === postId);
        if (post) {
            const userTip = post.tips.find((tipItem) => tipItem.owner === user._id)
            setCurrentTip(userTip)

        }
    }, [posts, dispatch])


    useEffect(() => {
        getUserTip()
    }, [posts])




    const value = (<>
        {currentTip?.owner ? (<>
            <ThemedText sx={{ fontSize: 18, }}>{currentTip?.imoji}</ThemedText>
            {currentTip?.name}
        </>)
            : (<>
                <StarsOutlinedIcon sx={{ mr: .4, fontSize: 16 }} /> Send Tip
            </>)}
    </>)



    return (
        <PopupState variant='popper'>
            {(popupState) => (

                <>
                    {isMobile ? (
                        <SendTipButton
                            onClick={() => dispatch(mainActions.setCardMenu({ component: 'send-tip-picker', title: 'Send Tip', showClose: false, postId }))}>
                            {value}
                        </SendTipButton>
                    ) : (
                        <SendTipButton {...bindTrigger(popupState)}>
                            {value}
                        </SendTipButton>
                    )}

                    <Menu {...bindMenu(popupState)} open={popupState.isOpen}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left'
                        }}
                        classes={{
                            //paper: classes.InteractionPaper
                        }}
                        slotProps={{
                            paper: {
                                style: {
                                    width: '37ch',
                                    
                                }
                            }
                        }}>

                        <SendTipMenu postId={postId} popupState={popupState} />
                    </Menu>
                </>
            )}
        </PopupState>

    )
}




export default SendTipPopper