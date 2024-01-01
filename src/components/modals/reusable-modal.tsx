import { Modal, Box } from '@mui/material'
import React from 'react'
import { useAppSelector } from '../../../store/hooks'
import ReusableAlert from '../reusable-alert'
import { useDispatch } from 'react-redux'
import { mainActions } from '../../../reducers/main-reducer'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { DeleteElementThunk } from '../../../reducers/elements-reducer/elements-thunks'
import { elementsActions } from '../../../reducers/elements-reducer'


type Props = {}

export default function ReusableModal({ }: Props) {
    const modal = useAppSelector((state) => state.MainReducer.modal)
    const open = Boolean(modal.component)

    const elementNetworkStatus = useAppSelector((state) => state.ElementsReducer.elementNetworkStatus)

    const dispatch = useDispatch()

     if (!modal.component) return null
    return (
        <Modal open={open} >
            <Box>

                {modal.component === 'delete-element-item' && (
                    <ReusableAlert
                        title='Item will be deleted'
                        type='delete'
                        loading={elementNetworkStatus === 'deleting'}
                        cancelHandler={() => {
                            dispatch(mainActions.closeModal())
                            dispatch(elementsActions.clearElementAction())
                        }}
                        proccedIcon={<DeleteOutlineIcon />}
                        procceedAction={() => dispatch(DeleteElementThunk())}
                        message='Are you sure you want to delete this task group?'
                    />
                )}
            </Box>
        </Modal>
    )
}       