import { Modal, Box } from '@mui/material'
import React from 'react'
import { useAppSelector } from '../../../store/hooks'
import PageMoreOptionsMenu from '../creator-page/page-more-options-menu'
import ReadOnlyMoreOptionsMenu from '../creator-page/read-only-more-options-menu'
import CompleteSendTipAction from '../post/send-tip-popper/complete-send-tip'

type Props = {}

export default function ReusableModal({ }: Props) {
    const modal = useAppSelector((state) => state.MainReducer.modal)
    const open = Boolean(modal.component)
    if (!modal.component) return null
    return (
        <Modal open={open} >
            <Box>
                {modal.component === 'page-more-options-menu' && <PageMoreOptionsMenu />}
                {modal.component === 'read-only-more-options-menu' && <ReadOnlyMoreOptionsMenu />}
                {modal.component === 'complete-send-tip-action' && <CompleteSendTipAction postId={modal?.postId ?? ''} />}
            </Box>
        </Modal>
    )
}       