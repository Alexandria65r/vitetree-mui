import React from 'react'
import MenuItem from '@mui/material/MenuItem';
import { ThemedText, colorScheme } from '../../../theme';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { Box, colors, useTheme } from '@mui/material';
import { mainActions } from '../../../../reducers/main-reducer';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { PopupState } from 'material-ui-popup-state/hooks';
import { Tip } from '../../../models/post';
import { postActions } from '../../../../reducers/post-reducer';

type Props = {
    postId?: string
    popupState?: PopupState
}

export default function SendTipMenu({ postId, popupState }: Props) {
    const _theme = useTheme()
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.AuthReducer.user)
    const posts = useAppSelector((state) => state.PostReducer.posts)

    const post = posts.find((postItem) => postItem.postId === postId)
    const clonedPosts = [...posts]

    //Note Make this a thunk action
    function selectTip(tip: Tip) {
        if (post) {
            const clonedTips = [...post.tips]
            const isExist = clonedTips.find((tipItem) => tipItem.owner === user._id)
            if (!isExist) {
                clonedPosts.splice(posts.indexOf(post), 1, { ...post, tips: [...post?.tips, { ...tip, owner: user._id }] })
            } else {
                clonedTips.splice(post.tips.indexOf(isExist), 1, { ...tip, owner: user._id })
                clonedPosts.splice(posts.indexOf(post), 1, { ...post, tips: clonedTips })
            }
            dispatch(postActions.setPosts(clonedPosts))
            dispatch(mainActions.setCardMenu({ component: '', title: '', showClose: true }))
            dispatch(mainActions.setModal({ component: 'complete-send-tip-action', postId}))
            popupState?.close()
        }
    }


    return (
        <>
            {tips.map((tip) => (
                <MenuItem key={tip.name} onClick={() => selectTip(tip)
                } sx={(theme) => ({ borderBottom: `1px solid ${colorScheme(theme).greyToTertiary}` })}>
                    <ThemedText sx={{ fontSize: 22,mr:1 }}>{tip.imoji}</ThemedText>
                    <Box sx={{ flex: 1, display: 'flex' }}>
                        <ThemedText sx={{ flex: 1, fontWeight: 600, fontSize: 15, textTransform: 'capitalize' }}>{tip.name} </ThemedText>
                        <ThemedText sx={{ mr: 2, fontWeight: 600, fontSize: 15 }}>K{tip.amount}</ThemedText>
                    </Box>
                    <RadioButtonCheckedIcon sx={{ color: colors.teal[500] }} /> 
                </MenuItem>
            ))}
        </>
    )
}



const tips: Tip[] = [
    {
        name: 'wow',
        imoji: '😲',
        amount: 5
    },
    {
        name: 'amazing',
        imoji: '😍',
        amount: 10
    },
    {
        name: 'greatiful fan',
        imoji: '🎉',
        amount: 30
    }
]