import styled from '@emotion/styled'
import { ClickAwayListener, IconButton, Popper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { BsInfoCircle } from 'react-icons/bs'
import { MdClose } from 'react-icons/md'
import { mainActions } from '../../reducers'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

import * as types from '../reusable'
import FilesOptions from './chat/files-options'
import MessageMoreOptions from './chat/message-more-options/message-more-options'
import ReactToMessage from './chat/react-to-message/react-to-message'

const AlertClose = styled(IconButton)({
    position: 'absolute',
    right: 5,
    top: 2,
})


export default function ReusablePopper() {
    const dispatch = useAppDispatch()
    const popperState = useAppSelector((state) => state.MainReducer.popperState)
    let anchorEl

    if (popperState.popperId) {
        anchorEl = document.getElementById(`${popperState.popperId}`)
    }

    function handleClose() {
        if (!popperState.popperId) return

        dispatch(mainActions.setPopperState({
            component: '',
            popperId: '',
            placement:''
        }))
    }

    if (!popperState.popperId) return null

    return (
        <ClickAwayListener onClickAway={handleClose}>

            <Popper

                id={popperState.popperId}
                open={popperState.popperId !== ''}
                anchorEl={anchorEl}
                sx={{ zIndex: 1390 }}
                placement={popperState.placement}
            >
                <Box className='animated-popper'>
                    {popperState.component === types.REUSABLE_POPPER.FilesOptions.component && <FilesOptions />}
                    {popperState.component === types.REUSABLE_POPPER.ReactToMessage.component && <ReactToMessage />}
                    {popperState.component === types.REUSABLE_POPPER.MessageMoreOptions.component && <MessageMoreOptions />}

                </Box>

            </Popper>
        </ClickAwayListener>


    )
}