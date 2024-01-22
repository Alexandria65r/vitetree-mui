import { Modal, Box } from '@mui/material'
import React from 'react'
import { useAppSelector } from '../../../store/hooks'
import ReusableAlert from '../reusable-alert'
import { useDispatch } from 'react-redux'
import { mainActions } from '../../../reducers/main-reducer'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { DeleteElementThunk, deleteBulkElementsThunk } from '../../../reducers/elements-reducer/elements-thunks'
import { elementsActions } from '../../../reducers/elements-reducer'
import { deleteBulkListGroupsThunk, deleteListGroupThunk } from '../../../reducers/list-group-reducer/list-group-thunks'
import { listGroupActions } from '../../../reducers/list-group-reducer'


type Props = {}

export default function ReusableModal({ }: Props) {
    const modal = useAppSelector((state) => state.MainReducer.modal)
    const open = Boolean(modal.component)

    const elementNetworkStatus = useAppSelector((state) => state.ElementsReducer.elementNetworkStatus)
    const checkedItemsCount = useAppSelector((state) => state.ElementsReducer.checkedItems)?.length

    const dispatch = useDispatch()

    if (!modal.component) return null
    return (
        <Modal open={open} >
            <Box>

                {modal.component === 'delete-list-group' && (
                    <ReusableAlert
                        title='List Group will be deleted'
                        type='delete'
                        loading={elementNetworkStatus === 'deleting-element'}
                        cancelHandler={() => {
                            dispatch(mainActions.closeModal())
                            dispatch(elementsActions.clearElementAction())
                        }}
                        proccedIcon={<DeleteOutlineIcon />}
                        procceedAction={() => dispatch(deleteListGroupThunk(modal?.itemId??''))}
                        message='Are you sure you want to delete?'
                    />
                )}
                {modal.component === 'delete-bulk-list-groups' && (
                    <ReusableAlert
                        title='Selected List Groups will be deleted'
                        type='delete'
                        loading={elementNetworkStatus === 'deleting-element'}
                        cancelHandler={() => {
                            dispatch(mainActions.closeModal())
                            dispatch(listGroupActions.clearCheckedGroups())
                            dispatch(listGroupActions.clearGroupAction())
                        }}
                        proccedIcon={<DeleteOutlineIcon />}
                        procceedAction={() => dispatch(deleteBulkListGroupsThunk())}
                        message='Are you sure you want to delete?'
                    />
                )}
                {modal.component === 'delete-element-item' && (
                    <ReusableAlert
                        title='Item will be deleted'
                        type='delete'
                        loading={elementNetworkStatus === 'deleting-element'}
                        cancelHandler={() => {
                            dispatch(mainActions.closeModal())
                            dispatch(elementsActions.clearElementAction())
                        }}
                        proccedIcon={<DeleteOutlineIcon />}
                        procceedAction={() => dispatch(DeleteElementThunk())}
                        message='Are you sure you want to delete this task?'
                    />
                )}
                {modal.component === 'delete-bulk-elements' && (
                    <ReusableAlert
                        title={`Selected Item${checkedItemsCount > 1 ? 's':''} will be deleted`}
                        type='delete'
                        loading={elementNetworkStatus === 'deleting-element'}
                        cancelHandler={() => {
                            dispatch(mainActions.closeModal())
                            dispatch(elementsActions.clearElementAction())
                            dispatch(elementsActions.clearCheckedItems())
                        }}
                        proccedIcon={<DeleteOutlineIcon />}
                        procceedAction={() => dispatch(deleteBulkElementsThunk())}
                        message='Are you sure you want to delete?'
                    />
                )}
            </Box>
        </Modal>
    )
}       