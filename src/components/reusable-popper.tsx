
import { ClickAwayListener, IconButton, Popper } from '@mui/material'
import { Box } from '@mui/system'
import { mainActions } from '../../reducers/main-reducer'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

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
            placement: ''
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
            // placement={'bottom-end'}
            >
                <Box className='animated-popper'>
                   
                </Box>

            </Popper>
        </ClickAwayListener>


    )
}