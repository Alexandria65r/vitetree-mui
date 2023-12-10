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
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import { useRouter } from 'next/router';
type Props = {
    postId?: string
    popupState?: PopupState
    parent: 'feed' | 'post-detail'
}

export default function SendTipMenu({ postId, popupState, parent }: Props) {
    const router = useRouter()
    const _theme = useTheme()
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.AuthReducer.user)
    const posts = useAppSelector((state) => state.PostReducer.posts)
    const selectedTip = useAppSelector((state) => state.PostReducer.tip)

    const post = posts.find((postItem) => postItem.postId === postId)
    const clonedPosts = [...posts]

    //Note Make this a thunk action
    function selectTip(tip: Tip) {
        dispatch(postActions.setTip(tip))
        if (post) {
            const clonedTips = [...post.tips]
            const isExist = clonedTips.find((tipItem) => tipItem?.owner === user._id)
            if (!isExist) {
                clonedPosts.splice(posts.indexOf(post), 1, { ...post, tips: [...post?.tips, tip] })
            } else {
                clonedTips.splice(post.tips.indexOf(isExist), 1, tip)
                clonedPosts.splice(posts.indexOf(post), 1, { ...post, tips: clonedTips })
            }
            const updated = clonedPosts.find((postItem) => postItem.postId === postId)
            if (!updated) return
            dispatch(postActions.setPosts([updated]))
            dispatch(mainActions.setCardMenu({ component: '', title: '', showClose: true }))
            popupState?.close()
            if (parent === 'feed') {
                router.push(`/feed/${postId}/send-tip`)
            }
        }
    }


    function handleSelectedTip(tip: Tip) {
        if (!post) return
        selectTip({ ...tip, owner: user._id, postId })
    }

    return (
        <>
            {tips.map((tip) => (
                <MenuItem key={tip.name} onClick={() => handleSelectedTip(tip)}
                    sx={(theme) => ({ borderBottom: `1px solid ${colorScheme(theme).greyToTertiary}` })}>
                    <ThemedText sx={{ fontSize: 22, mr: 1 }}>{tip.emoji}</ThemedText>
                    <Box sx={{ flex: 1, display: 'flex' }}>
                        <ThemedText sx={{ flex: 1, fontWeight: 600, fontSize: 15, textTransform: 'capitalize' }}>{tip.name} </ThemedText>
                        <ThemedText sx={{ mr: 2, fontWeight: 600, fontSize: 15 }}>K{tip.amount}</ThemedText>
                    </Box>
                    {selectedTip?.name === tip.name ? <RadioButtonCheckedIcon sx={{ color: colors.teal[500] }} />
                        : <RadioButtonUncheckedOutlinedIcon sx={{ color: colors.teal[500] }} />}
                </MenuItem>
            ))}
        </>
    )
}



const tips: Tip[] = [
    {
        name: 'wow',
        emoji: '😲',
        amount: 5,
        state: 'pending',
    },
    {
        name: 'amazing',
        emoji: '😍',
        amount: 10,
        state: 'pending',
    },
    {
        name: 'greatiful fan',
        emoji: '🎉',
        amount: 30,
        state: 'pending',
    }
]